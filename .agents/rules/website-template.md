# Workspace Rules: Antigravity Website Template

- **Separatie van Zorgen**: Houd UI-componenten strictly gescheiden van content en configuratie.
- **Formuliervalidatie**: Elk formulier moet een laadstatus, client-side validatie en duidelijke toegankelijke foutmeldingen bevatten.
- **SEO Standaarden**: Elke publieke pagina moet unieke meta tags genereren via `src/lib/seo.js`.
- **Modulaire E-commerce & Admin**: Behalve de publieke pagina's zijn winkelwagen, bestellingen en beheer strictly afhankelijk van `featureConfig.js`.
