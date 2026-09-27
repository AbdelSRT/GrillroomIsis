-- ==========================================
-- Grill Room Isis - VOLLEDIG DATABASE RESET
-- Kopieer en voer dit SQL uit in de Supabase SQL Editor
-- ⚠️  Dit verwijdert alle bestaande tabellen en herinstallert ze correct
-- ==========================================

-- STAP 1: Verwijder bestaande tabellen (in juiste volgorde vanwege relaties)
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS menu_items CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS restaurant_settings CASCADE;

-- STAP 2: Categorieën tabel (TEXT primaire sleutel!)
CREATE TABLE categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  icon TEXT DEFAULT 'Utensils',
  sort_order INT DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- STAP 3: Menu items tabel (TEXT primaire sleutel!)
CREATE TABLE menu_items (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  price NUMERIC(10,2) NOT NULL DEFAULT 0.00,
  category_id TEXT REFERENCES categories(id) ON DELETE SET NULL,
  image_url TEXT,
  available BOOLEAN DEFAULT TRUE,
  featured BOOLEAN DEFAULT FALSE,
  spicy BOOLEAN DEFAULT FALSE,
  vegetarian BOOLEAN DEFAULT FALSE,
  vegan BOOLEAN DEFAULT FALSE,
  allergens TEXT[] DEFAULT '{}',
  options JSONB DEFAULT '[]'::jsonb,
  sort_order INT DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- STAP 4: Bestellingen tabel
CREATE TABLE orders (
  id TEXT PRIMARY KEY,
  order_number TEXT UNIQUE NOT NULL,
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  order_type TEXT NOT NULL DEFAULT 'pickup',
  pickup_time TEXT,
  delivery_address TEXT,
  notes TEXT,
  payment_method TEXT DEFAULT 'cash',
  payment_status TEXT DEFAULT 'pending',
  payment_id TEXT,
  status TEXT DEFAULT 'nieuw',
  subtotal NUMERIC(10,2) NOT NULL DEFAULT 0.00,
  delivery_fee NUMERIC(10,2) DEFAULT 0.00,
  total NUMERIC(10,2) NOT NULL DEFAULT 0.00,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- STAP 5: Order items relatie tabel
CREATE TABLE order_items (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  order_id TEXT REFERENCES orders(id) ON DELETE CASCADE,
  dish_name TEXT NOT NULL,
  dish_id TEXT,
  price NUMERIC(10,2) NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  options JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- STAP 6: Restaurant instellingen tabel (uitgebreid)
CREATE TABLE restaurant_settings (
  id TEXT PRIMARY KEY DEFAULT 'general',
  -- Bestelopties
  pickup_enabled BOOLEAN DEFAULT TRUE,
  delivery_enabled BOOLEAN DEFAULT FALSE,
  pickup_time_estimate TEXT DEFAULT '20 - 30 min',
  delivery_time_estimate TEXT DEFAULT '45 - 60 min',
  minimum_order NUMERIC(10,2) DEFAULT 15.00,
  delivery_fee NUMERIC(10,2) DEFAULT 2.50,
  free_delivery_from NUMERIC(10,2) DEFAULT 35.00,
  -- Openingstijden
  opening_hours JSONB DEFAULT '[{"days":"Maandag - Zondag","hours":"11:00 - 22:00"}]'::jsonb,
  -- Bezorggebied
  delivery_postcodes TEXT[] DEFAULT '{3800}',
  -- Belasting
  vat_rate NUMERIC(5,2) DEFAULT 6.00,
  -- Notificaties
  sms_notifications BOOLEAN DEFAULT FALSE,
  email_notifications BOOLEAN DEFAULT FALSE,
  notification_email TEXT DEFAULT '',
  notification_phone TEXT DEFAULT '',
  -- Winkel status
  restaurant_paused BOOLEAN DEFAULT FALSE,
  pause_message TEXT DEFAULT 'Wij zijn momenteel gesloten. Probeer het later opnieuw.',
  -- Bestelbeheer
  max_orders_per_slot INT DEFAULT 0,
  order_confirmation_message TEXT DEFAULT 'Bedankt voor uw bestelling! Uw eten wordt vers bereid.',
  -- Betaling
  mollie_enabled BOOLEAN DEFAULT FALSE,
  cash_enabled BOOLEAN DEFAULT TRUE,
  bancontact_at_counter BOOLEAN DEFAULT TRUE,
  -- Metadata
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- STAP 7: RLS (Row Level Security)
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE restaurant_settings ENABLE ROW LEVEL SECURITY;

-- STAP 8: Volledige toegang policies
CREATE POLICY "Full access categories" ON categories FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Full access menu_items" ON menu_items FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Full access orders" ON orders FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Full access order_items" ON order_items FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Full access settings" ON restaurant_settings FOR ALL USING (true) WITH CHECK (true);

-- STAP 9: Supabase Storage bucket voor gerecht-afbeeldingen
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'dish-images',
  'dish-images',
  true,
  5242880, -- 5MB max
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS policies
CREATE POLICY "Public read dish images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'dish-images');

CREATE POLICY "Allow upload dish images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'dish-images');

CREATE POLICY "Allow update dish images"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'dish-images');

CREATE POLICY "Allow delete dish images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'dish-images');

-- STAP 10: Standaard instellingen invoegen
INSERT INTO restaurant_settings (id) VALUES ('general')
ON CONFLICT (id) DO NOTHING;

-- ✅ Klaar! De database is nu correct ingericht.
-- Ga nu terug naar de website en klik op "Initialiseer / Seed Database" in Admin > Instellingen.
