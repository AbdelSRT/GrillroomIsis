import { siteConfig } from '../config/siteConfig';

export const privacyPolicy = {
  title: "Privacybeleid",
  lastUpdated: "September 2026",
  content: `
    <h3>1. Verwerking van Persoonsgegevens</h3>
    <p>${siteConfig.companyName} respecteert de privacy van alle bezoekers van de website en klanten. Wij dragen er zorg voor dat de persoonlijke informatie die u ons verschaft strikt vertrouwelijk en in overeenstemming met de geldende privacywetgeving (AVG/GDPR) wordt behandeld.</p>
    
    <h3>2. Doeleinden van de Verwerking</h3>
    <p>Wanneer u bij ons een bestelling plaatst of contact opneemt, vragen wij om uw naam, telefoonnummer en e-mailadres. Deze gegevens worden uitsluitend gebruikt om uw bestelling zorgvuldig te verwerken, contact op te nemen bij vragen over uw bestelling en u te informeren over de status van uw maaltijd.</p>
    
    <h3>3. Beveiliging en Bewaartermijn</h3>
    <p>Wij nemen passende beveiligingsmaatregelen om misbruik van en ongeautoriseerde toegang tot uw persoonsgegevens te beperken. Uw gegevens worden niet langer bewaard dan noodzakelijk voor het afhandelen van de bestelling en wettelijke administratieve verplichtingen.</p>
    
    <h3>4. Uw Rechten</h3>
    <p>U heeft te allen tijde het recht om uw geregistreerde persoonsgegevens in te zien, te corrigeren of te laten verwijderen. Neem hiervoor contact met ons op via ${siteConfig.contact.phone} of op onze locatie aan de ${siteConfig.contact.address}, ${siteConfig.contact.postalCode} ${siteConfig.contact.city}.</p>
  `
};

export const termsAndConditions = {
  title: "Algemene Voorwaarden",
  lastUpdated: "September 2026",
  content: `
    <h3>1. Toepasselijkheid</h3>
    <p>Deze algemene voorwaarden zijn van toepassing op alle aanbiedingen, bestellingen en overeenkomsten van ${siteConfig.companyName}, gevestigd te ${siteConfig.contact.address}, ${siteConfig.contact.postalCode} ${siteConfig.contact.city}, België.</p>
    
    <h3>2. Bestellingen en Prijzen</h3>
    <p>Alle op de website getoonde prijzen zijn in euro's (€) inclusief btw. ${siteConfig.companyName} behoudt zich het recht voor om prijzen en menu-aanbod tussentijds aan te passen.</p>
    
    <h3>3. Annulering en Herroepingsrecht</h3>
    <p>Gezien het bederfelijke karakter van vers bereide maaltijden en voedingsmiddelen is het wettelijke herroepingsrecht niet van toepassing op geplaatste bestellingen zodra de bereiding is gestart.</p>
    
    <h3>4. Afhaling en Betaling</h3>
    <p>Bestellingen kunnen op het afgesproken tijdstip worden afgehaald. Betaling geschiedt bij afhaling (contant of via Bancontact) tenzij vooraf online voldaan.</p>
  `
};
