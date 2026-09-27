# AGENTS.md - Antigravity Website Template Rules

Als Antigravity AI Coding Agent dien je bij het werken in deze repository de volgende regels strikt na te leven:

1. **Configuratie Eerst**:
   - Pas klantspecifieke gegevens aan in `src/config/siteConfig.js` en `src/content/` in plaats van componenten te herschrijven.
2. **Geen Fictieve Klantgegevens**:
   - Verzin nooit telefoonnummers, BTW-nummers, adressen, reviews of prijzen. Gebruik `[NOG IN TE VULLEN]` of lege strings wanneer gegevens ontbreken.
3. **Feature Flags Respecteren**:
   - Controleer `featureConfig.js` voordat je nieuwe pagina's of navigatielinks toevoegt. Uitgeschakelde functies mogen geen zichtbare links of kapotte routes veroorzaken.
4. **Thema & Styling**:
   - Hardcode geen specifieke kleurhex-codes in losse componenten. Gebruik CSS variabelen (zoals `var(--color-primary)`).
5. **Geen Sleutels of Production API Leaks**:
   - Bewaar nooit echte API-sleutels of private credentials in de client code.
6. **Relationale Databasetabellen**:
   - Raadpleeg `docs/DATABASE_SCHEMA.md` voor de relatietabellen en veldnamen als er om een backend/database koppeling wordt gevraagd.
7. **Verificatie**:
   - Voer altijd `npm run build` uit om te verifiëren dat je wijzigingen zonder fouten bouwen.
