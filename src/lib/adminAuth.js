import { supabase, isSupabaseConfigured } from './supabaseClient';

const SESSION_TOKEN_KEY = 'isis_admin_token_v2';
const SESSION_USER_KEY = 'isis_admin_user_v2';

/**
 * Inloggen als admin via veilige database RPC (bcrypt controle)
 */
export const loginAdmin = async (username, password) => {
  if (!isSupabaseConfigured() || !supabase) {
    return {
      success: false,
      error: 'Database is niet geconfigureerd. Controleer de Supabase verbinding in .env.'
    };
  }

  try {
    const { data, error } = await supabase.rpc('admin_login', {
      p_username: (username || '').trim().toLowerCase(),
      p_password: password
    });

    if (error) {
      console.error('Login RPC error:', error);
      return { success: false, error: 'Inloggen mislukt door een serverfout.' };
    }

    if (!data || !data.success) {
      return {
        success: false,
        error: data?.error || 'Ongeldige inloggegevens.',
        locked: data?.locked || false
      };
    }

    // Sla het sessietoken veilig op in sessionStorage (zodat het sluit bij browsersessie-einde)
    // en fallback naar localStorage indien gewenst
    sessionStorage.setItem(SESSION_TOKEN_KEY, data.token);
    sessionStorage.setItem(SESSION_USER_KEY, data.username);
    localStorage.setItem(SESSION_TOKEN_KEY, data.token);
    localStorage.setItem(SESSION_USER_KEY, data.username);

    // Oude onveilige boolean verwijderen
    localStorage.removeItem('isis_admin_auth');

    return {
      success: true,
      token: data.token,
      username: data.username
    };
  } catch (err) {
    console.error('Login exception:', err);
    return { success: false, error: 'Onverwachte fout bij inloggen.' };
  }
};

/**
 * Sessietoken ophalen
 */
export const getAdminToken = () => {
  return sessionStorage.getItem(SESSION_TOKEN_KEY) || localStorage.getItem(SESSION_TOKEN_KEY) || null;
};

/**
 * Gebruikersnaam van ingelogde admin ophalen
 */
export const getAdminUsername = () => {
  return sessionStorage.getItem(SESSION_USER_KEY) || localStorage.getItem(SESSION_USER_KEY) || 'Beheerder';
};

/**
 * Verifieer of de huidige sessie geldig is bij de database
 */
export const verifySession = async () => {
  const token = getAdminToken();
  if (!token) return false;

  if (!isSupabaseConfigured() || !supabase) {
    return false;
  }

  try {
    const { data, error } = await supabase.rpc('verify_admin_session', {
      p_token: token
    });

    if (error || !data || !data.valid) {
      logoutAdmin();
      return false;
    }

    return true;
  } catch (err) {
    console.warn('Session verification exception:', err);
    return false;
  }
};

/**
 * Uitloggen en sessietoken ongeldig maken
 */
export const logoutAdmin = async () => {
  const token = getAdminToken();
  sessionStorage.removeItem(SESSION_TOKEN_KEY);
  sessionStorage.removeItem(SESSION_USER_KEY);
  localStorage.removeItem(SESSION_TOKEN_KEY);
  localStorage.removeItem(SESSION_USER_KEY);
  localStorage.removeItem('isis_admin_auth');

  if (token && isSupabaseConfigured() && supabase) {
    try {
      await supabase.rpc('admin_logout', { p_token: token });
    } catch (e) {
      // Stil falen bij uitloggen
    }
  }
};

/**
 * Wachtwoord wijzigen via veilige RPC
 */
export const changeAdminPassword = async (oldPassword, newPassword) => {
  const token = getAdminToken();
  if (!token) {
    return { success: false, error: 'U bent niet ingelogd.' };
  }

  if (!newPassword || newPassword.length < 12) {
    return { success: false, error: 'Nieuw wachtwoord moet minimaal 12 tekens lang zijn.' };
  }

  try {
    const { data, error } = await supabase.rpc('admin_change_password', {
      p_token: token,
      p_old_password: oldPassword,
      p_new_password: newPassword
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return data || { success: false, error: 'Onbekende fout.' };
  } catch (err) {
    return { success: false, error: 'Fout bij wijzigen wachtwoord.' };
  }
};
