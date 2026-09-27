# Antigravity Universal Website Template

Een modulaire, universele en herbruikbare bedrijfswebsite template gebouwd met **React**, **Vite** en **CSS Variables**.

## 🚀 Kenmerken

- **Configureerbaar Bedrijf**: Wijzig alle klant- en contactgegevens op één centrale plek (`src/config/siteConfig.js`).
- **Aanpasbaar Thema**: Beheer kleuren, typografie en afgeronde hoeken via CSS variabelen en `src/config/themeConfig.js`.
- **Feature Flags**: Schakel modules in of uit (e-commerce, afspraken, offertes, portfolio, reviews, faq) via `src/config/featureConfig.js`.
- **Toegankelijk & Responsive**: Mobiel-eerst ontwerp met keyboard navigatie en ARIA ondersteuning.
- **SEO & Social Ready**: Dynamische titels, meta descriptions, OpenGraph tags, sitemap.xml en robots.txt.
- **Database Ready**: Inclusief een relationeel SQL database schema in `docs/DATABASE_SCHEMA.md` voor snelle backend koppeling (PostgreSQL/Supabase/MySQL).

## 🛠️ Installatie & Development

```bash
# 1. Installeer dependencies
npm install

# 2. Start de development server
npm run dev

# 3. Bouw voor productie
npm run build
```

## 📁 Mappenstructuur

```text
src/
  app/           # App root & dynamische routes
  components/    # Layout, Secties en UI elementen
  pages/         # Alle publieke en e-commerce pagina's
  features/      # Contact, Afspraken, Offertes, Cart & Checkout
  content/       # Alle teksten, diensten, producten, team & FAQ data
  config/        # siteConfig.js, themeConfig.js, featureConfig.js
  data/          # Voorbeelddata
  styles/        # CSS thema, globals en utilities
  lib/           # Validation, API mock, formatters en SEO helpers
docs/
  CLIENT_CUSTOMIZATION.md  # Handleiding voor een nieuwe klant
  CONTENT_CHECKLIST.md     # Checklist van aan te leveren gegevens
  DATABASE_SCHEMA.md       # SQL relatietabellen schema
```

## 📄 Documentatie
Zie de `docs/` map voor gedetailleerde instructies over klantoverdrachten, thema-aanpassingen en database koppelingen.
