export const mainNavigation = [
  { name: "Home", path: "/", featureFlag: null },
  { name: "Menukaart", path: "/menu", featureFlag: null },
  { name: "Over Isis", path: "/about", featureFlag: null },
  { name: "Contact & Locatie", path: "/contact", featureFlag: null }
];

export const footerNavigation = {
  restaurant: [
    { name: "Volledig Menu", path: "/menu" },
    { name: "Grill Schotels", path: "/menu/schotels" },
    { name: "Broodjes & Dürüm", path: "/menu/broodjes" },
    { name: "Pizza's & Pasta's", path: "/menu/pizza-pasta" },
    { name: "Over Ons", path: "/about" },
    { name: "Contact & Openingsuren", path: "/contact" }
  ],
  ordering: [
    { name: "Online Bestellen", path: "/menu" },
    { name: "Winkelwagen", path: "/cart" },
    { name: "Veelgestelde Vragen", path: "/faq" }
  ],
  legal: [
    { name: "Privacybeleid", path: "/privacy" },
    { name: "Algemene Voorwaarden", path: "/terms" }
  ]
};
