# Client Customization Guide

Volg dit stappenplan om deze template snel aan te passen voor een nieuwe klant.

## Stappenplan voor een Nieuwe Klant

### 1. Kopieer het Project
Kopieer de gehele map `Template/` naar een nieuwe projectmap (bijv. `Klanten/Bedrijfsnaam/`).

### 2. Vul `src/config/siteConfig.js` in
Vul de bedrijfs- en contactgegevens in:
```js
export const siteConfig = {
  companyName: "Uw Bedrijfsnaam",
  industry: "Uw Branche",
  contact: {
    phone: "+32 400 00 00 00",
    email: "info@uwbedrijf.be",
    address: "Kerkstraat 1",
    city: "Brussel"
  }
  // ...
};
```

### 3. Pas Huisstijl en Kleuren aan in `src/config/themeConfig.js`
Pas de primaire, secundaire en accentkleuren aan:
```js
export const themeConfig = {
  primaryColor: "#2563eb",
  secondaryColor: "#1e293b",
  accentColor: "#f59e0b",
  // ...
};
```

### 4. Schakel de Gewenste Features in (`src/config/featureConfig.js`)
```js
export const featureConfig = {
  ecommerce: true,      // Zet op true voor webshop
  appointments: true,   // Zet op true voor afspraken
  quoteRequests: true,  // Zet op true voor offertes
  // ...
};
```

### 5. Content & Afbeeldingen Vervangen
- Vul de bestanden in `src/content/` in (`services.js`, `products.js`, `faqs.js`, `testimonials.js`).
- Plaats het nieuwe logo in `public/` en werk het logo-pad in `siteConfig.js` bij.

### 6. Controleer SEO, Sitemap en Robots.txt
- Update `public/sitemap.xml` met de finale URL.
- Update `public/robots.txt`.

### 7. Testen & Uitrollen
```bash
npm run build
npm run preview
```
