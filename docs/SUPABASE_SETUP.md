# Supabase Koppeling — Grill Room Isis

Deze handleiding legt uit hoe je in 3 eenvoudige stappen Supabase verbindt met de Grill Room Isis website.

---

## Stap 1: Supabase Project Aanmaken

1. Ga naar [supabase.com](https://supabase.com) en maak een gratis account/project aan (bijvoorbeeld met de naam `isis-restaurant`).
2. Kies een regio dichtbij België (bijvoorbeeld Frankfurt `eu-central-1`).

---

## Stap 2: Database Tabellen Aanmaken

1. Ga in je Supabase Dashboard in het linkermenu naar **SQL Editor**.
2. Klik op **New Query**.
3. Kopieer en plak de volledige inhoud van het bestand [`docs/supabase_schema.sql`](file:///c:/Users/Essar/Websites/Isis_withTem/docs/supabase_schema.sql) in de editor.
4. Klik op **Run** (rechtsonder). De 5 tabellen (`categories`, `menu_items`, `orders`, `order_items`, `restaurant_settings`) en policies worden direct aangemaakt.

---

## Stap 3: Omgevingsvariabelen Toevoegen in `.env`

1. Ga in Supabase naar **Project Settings** -> **API**.
2. Kopieer de **Project URL** en de **anon / public** API Key.
3. Maak in de hoofdmap van dit project een `.env` bestand aan (of pas het bestaande aan):

```env
VITE_SUPABASE_URL=https://jouw-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=jouw-anon-public-key
```

4. Herstart de ontwikkelserver (`npm run dev`). De website detecteert automatisch de Supabase-verbinding en synchroniseert alle menu-items en bestellingen realtime met de cloud!

