-- ========================================================
-- Migratie 01: Beveiligd Admin-Account Systeem
-- Grill Room Isis
-- Voer dit uit in de Supabase SQL Editor
-- ========================================================

-- Zorg dat de pgcrypto extensie actief is voor bcrypt hashing en veilige random tokens
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 1. Admin Users Tabel
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  failed_attempts INT DEFAULT 0,
  locked_until TIMESTAMPTZ DEFAULT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Admin Sessions Tabel
CREATE TABLE IF NOT EXISTS admin_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  token TEXT UNIQUE NOT NULL,
  admin_id UUID NOT NULL REFERENCES admin_users(id) ON DELETE CASCADE,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexen voor snelle lookups
CREATE INDEX IF NOT EXISTS idx_admin_sessions_token ON admin_sessions(token);
CREATE INDEX IF NOT EXISTS idx_admin_users_username ON admin_users(LOWER(username));

-- 3. Row Level Security: blokkeer directe publieke toegang
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_sessions ENABLE ROW LEVEL SECURITY;

-- Verwijder standaard permissies voor anon en authenticated
REVOKE ALL ON admin_users FROM anon, authenticated;
REVOKE ALL ON admin_sessions FROM anon, authenticated;

-- ========================================================
-- STORED PROCEDURES (SECURITY DEFINER)
-- Draaien met server-rechten zodat gevoelige tabellen
-- nooit rechtstreeks aan de client worden blootgesteld.
-- ========================================================

-- Functie: Eerste admin aanmaken (eenmalige setup)
CREATE OR REPLACE FUNCTION create_first_admin(p_username TEXT, p_password TEXT)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_admin_count INT;
  v_clean_username TEXT;
  v_hashed_password TEXT;
BEGIN
  -- Controleer of er al een admin bestaat
  SELECT COUNT(*) INTO v_admin_count FROM admin_users;
  IF v_admin_count > 0 THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Er bestaat al een admin-account. De eenmalige setup is niet meer toegestaan.'
    );
  END IF;

  v_clean_username := LOWER(TRIM(p_username));

  IF length(v_clean_username) < 3 THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Gebruikersnaam moet minimaal 3 tekens lang zijn.'
    );
  END IF;

  IF length(p_password) < 12 THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Wachtwoord moet minimaal 12 tekens lang zijn.'
    );
  END IF;

  -- Wachtwoord veilig hashen met bcrypt (work factor 10)
  v_hashed_password := crypt(p_password, gen_salt('bf', 10));

  INSERT INTO admin_users (username, password_hash)
  VALUES (v_clean_username, v_hashed_password);

  RETURN jsonb_build_object(
    'success', true,
    'message', 'Eerste admin-account is succesvol aangemaakt.'
  );
END;
$$;

-- Functie: Inloggen met rate limiting / brute-force lockout
CREATE OR REPLACE FUNCTION admin_login(p_username TEXT, p_password TEXT)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_user RECORD;
  v_token TEXT;
  v_expires_at TIMESTAMPTZ;
  v_dummy TEXT;
BEGIN
  -- Zoek gebruiker op
  SELECT * INTO v_user
  FROM admin_users
  WHERE username = LOWER(TRIM(p_username));

  -- Als de gebruiker niet bestaat: doe een dummy crypt berekening (constant-time bescherming tegen timing attacks)
  IF NOT FOUND THEN
    v_dummy := crypt(p_password, '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUU012345');
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Ongeldige inloggegevens.'
    );
  END IF;

  -- Controleer lockout status
  IF v_user.locked_until IS NOT NULL AND v_user.locked_until > NOW() THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Account is tijdelijk vergrendeld wegens te veel mislukte pogingen. Probeer het na 10 minuten opnieuw.',
      'locked', true,
      'locked_until', v_user.locked_until
    );
  END IF;

  -- Controleer wachtwoord met bcrypt
  IF v_user.password_hash = crypt(p_password, v_user.password_hash) THEN
    -- Wachtwoord is juist: reset lockout en mislukte pogingen
    UPDATE admin_users
    SET failed_attempts = 0,
        locked_until = NULL,
        updated_at = NOW()
    WHERE id = v_user.id;

    -- Genereer een cryptografisch veilig sessietoken (64 hex karakters = 256 bits)
    v_token := encode(gen_random_bytes(32), 'hex');
    v_expires_at := NOW() + INTERVAL '12 hours';

    -- Verwijder verlopen sessies
    DELETE FROM admin_sessions WHERE expires_at < NOW() OR admin_id = v_user.id;

    -- Sla nieuwe sessie op
    INSERT INTO admin_sessions (token, admin_id, expires_at)
    VALUES (v_token, v_user.id, v_expires_at);

    RETURN jsonb_build_object(
      'success', true,
      'token', v_token,
      'username', v_user.username,
      'expires_at', v_expires_at
    );
  ELSE
    -- Wachtwoord is onjuist: verhoog mislukte pogingen
    IF v_user.failed_attempts + 1 >= 5 THEN
      UPDATE admin_users
      SET failed_attempts = v_user.failed_attempts + 1,
          locked_until = NOW() + INTERVAL '10 minutes',
          updated_at = NOW()
      WHERE id = v_user.id;

      RETURN jsonb_build_object(
        'success', false,
        'error', 'Account is tijdelijk vergrendeld wegens te veel mislukte pogingen. Probeer het na 10 minuten opnieuw.',
        'locked', true
      );
    ELSE
      UPDATE admin_users
      SET failed_attempts = v_user.failed_attempts + 1,
          updated_at = NOW()
      WHERE id = v_user.id;

      RETURN jsonb_build_object(
        'success', false,
        'error', 'Ongeldige inloggegevens.'
      );
    END IF;
  END IF;
END;
$$;

-- Functie: Sessie verifiëren
CREATE OR REPLACE FUNCTION verify_admin_session(p_token TEXT)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_session RECORD;
BEGIN
  IF p_token IS NULL OR length(p_token) < 10 THEN
    RETURN jsonb_build_object('valid', false);
  END IF;

  SELECT s.id, s.expires_at, u.username, u.id AS admin_id
  INTO v_session
  FROM admin_sessions s
  JOIN admin_users u ON s.admin_id = u.id
  WHERE s.token = p_token AND s.expires_at > NOW();

  IF NOT FOUND THEN
    RETURN jsonb_build_object('valid', false);
  END IF;

  RETURN jsonb_build_object(
    'valid', true,
    'username', v_session.username,
    'expires_at', v_session.expires_at
  );
END;
$$;

-- Functie: Uitloggen (sessie intrekken)
CREATE OR REPLACE FUNCTION admin_logout(p_token TEXT)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  DELETE FROM admin_sessions WHERE token = p_token;
  RETURN jsonb_build_object('success', true);
END;
$$;

-- Functie: Wachtwoord wijzigen
CREATE OR REPLACE FUNCTION admin_change_password(p_token TEXT, p_old_password TEXT, p_new_password TEXT)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_session RECORD;
  v_user RECORD;
  v_new_hash TEXT;
BEGIN
  -- Controleer actieve sessie
  SELECT s.admin_id INTO v_session
  FROM admin_sessions s
  WHERE s.token = p_token AND s.expires_at > NOW();

  IF NOT FOUND THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Niet geautoriseerd of sessie verlopen. Log opnieuw in.'
    );
  END IF;

  -- Haal gebruiker op
  SELECT * INTO v_user FROM admin_users WHERE id = v_session.admin_id;

  -- Controleer huidig wachtwoord
  IF v_user.password_hash <> crypt(p_old_password, v_user.password_hash) THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Huidig wachtwoord is onjuist.'
    );
  END IF;

  -- Controleer minimumlengte van 12 tekens
  IF length(p_new_password) < 12 THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Het nieuwe wachtwoord moet minimaal 12 tekens lang zijn.'
    );
  END IF;

  -- Hash nieuw wachtwoord
  v_new_hash := crypt(p_new_password, gen_salt('bf', 10));

  UPDATE admin_users
  SET password_hash = v_new_hash,
      failed_attempts = 0,
      locked_until = NULL,
      updated_at = NOW()
  WHERE id = v_user.id;

  -- Maak alle sessies behalve de huidige ongeldig (sessie-beveiliging)
  DELETE FROM admin_sessions WHERE admin_id = v_user.id AND token <> p_token;

  RETURN jsonb_build_object(
    'success', true,
    'message', 'Wachtwoord succesvol gewijzigd.'
  );
END;
$$;

-- Geef anon en authenticated rechten om de RPC functies aan te roepen
GRANT EXECUTE ON FUNCTION create_first_admin(TEXT, TEXT) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION admin_login(TEXT, TEXT) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION verify_admin_session(TEXT) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION admin_logout(TEXT) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION admin_change_password(TEXT, TEXT, TEXT) TO anon, authenticated;
