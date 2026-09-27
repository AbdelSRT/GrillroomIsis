export const menuCategories = [
  {
    id: "schotels",
    name: "Schotels & Lavasteen Grill",
    slug: "schotels",
    description: "Geserveerd met verse frietjes of rijst, fris gemengde salade en saus naar keuze.",
    icon: "Flame"
  },
  {
    id: "broodjes",
    name: "Broodjes & Dürüm",
    slug: "broodjes",
    description: "Vers gebakken broodjes en wraps, rijkelijk belegd met verse groenten en saus.",
    icon: "Utensils"
  },
  {
    id: "seafood",
    name: "Vis & Seafood",
    slug: "seafood",
    description: "Dagverse vis- en scampigerechten, bereid met verfijnde kruiden.",
    icon: "Fish"
  },
  {
    id: "pizza-pasta",
    name: "Pizza's & Pasta's",
    slug: "pizza-pasta",
    description: "Traditionele steenoven pizza's en rijkelijk gevulde pastagerechten.",
    icon: "Pizza"
  },
  {
    id: "salades-starters",
    name: "Salades & Voorgerechten",
    slug: "salades-starters",
    description: "Verse knapperige salades en warme mediterrane hapjes.",
    icon: "Salad"
  },
  {
    id: "kindermenu",
    name: "Kindermenu's",
    slug: "kindermenu",
    description: "Speciaal samengesteld voor de kleintjes inclusief frietjes en drankje.",
    icon: "Smile"
  },
  {
    id: "sauzen-extras",
    name: "Sauzen & Extra's",
    slug: "sauzen-extras",
    description: "Huisgemaakte sauzen en extra bijgerechten.",
    icon: "PlusCircle"
  },
  {
    id: "desserts-dranken",
    name: "Desserts & Dranken",
    slug: "desserts-dranken",
    description: "Zoete afsluiters en verfrissende dranken.",
    icon: "Coffee"
  }
];

export const initialMenuItems = [
  // Schotels & Lavasteen Grill
  {
    id: "dish-1",
    name: "Shoarma Schotel Speciaal",
    slug: "shoarma-schotel-speciaal",
    description: "Fijn gesneden, perfect gekruide shoarma van de spies. Geserveerd met knapperige frietjes of rijst, verse salade en saus naar keuze.",
    price: 16.50,
    categoryId: "schotels",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    available: true,
    featured: true,
    spicy: false,
    vegetarian: false,
    vegan: false,
    allergens: ["[NOG IN TE VULLEN]"],
    options: [
      {
        name: "Bijgerecht",
        type: "select",
        required: true,
        choices: ["Verse Belgische frietjes", "Mediterrane gekruide rijst", "Gemengde salade"]
      },
      {
        name: "Sauskeuze",
        type: "select",
        required: true,
        choices: ["Looksaus", "Andalouse", "Cocktail", "Sambal (Pikant)", "Mayonaise", "Ketchup"]
      }
    ],
    sortOrder: 1
  },
  {
    id: "dish-2",
    name: "Kip Schotel Isis",
    slug: "kip-schotel-isis",
    description: "Malse gemarineerde stukjes kipfilet, gegrild op lavasteen met paprika en ui. Geserveerd met frietjes en salade.",
    price: 17.50,
    categoryId: "schotels",
    image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=800&q=80",
    available: true,
    featured: true,
    spicy: false,
    vegetarian: false,
    vegan: false,
    allergens: ["[NOG IN TE VULLEN]"],
    options: [
      {
        name: "Bijgerecht",
        type: "select",
        required: true,
        choices: ["Verse Belgische frietjes", "Mediterrane gekruide rijst"]
      },
      {
        name: "Sauskeuze",
        type: "select",
        required: true,
        choices: ["Looksaus", "Andalouse", "Sambal (Pikant)", "Currysaus"]
      }
    ],
    sortOrder: 2
  },
  {
    id: "dish-3",
    name: "Mix Grill Isis (Specialiteit van het Huis)",
    slug: "mix-grill-isis",
    description: "De ultieme grillbeleving: combinatie van shoarma, malse kotelet, gekruide kefta en kipfilet op hete lavasteen gegrild.",
    price: 24.50,
    categoryId: "schotels",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
    available: true,
    featured: true,
    spicy: false,
    vegetarian: false,
    vegan: false,
    allergens: ["[NOG IN TE VULLEN]"],
    options: [
      {
        name: "Bijgerecht",
        type: "select",
        required: true,
        choices: ["Verse Belgische frietjes", "Mediterrane gekruide rijst"]
      },
      {
        name: "Saus 1",
        type: "select",
        required: true,
        choices: ["Looksaus", "Andalouse", "Sambal", "Mayonaise"]
      },
      {
        name: "Saus 2 (Extra)",
        type: "select",
        required: false,
        choices: ["Geen tweede saus", "Looksaus", "Andalouse", "Sambal (Pikant)", "Cocktail"]
      }
    ],
    sortOrder: 3
  },
  {
    id: "dish-4",
    name: "Gegrilde Lamskoteletten",
    slug: "gegrilde-lamskoteletten",
    description: "Vier malse lamskoteletten gekruid met rozemarijn en knoflook, rechtstreeks van de grill. Geserveerd met salade en frietjes.",
    price: 22.00,
    categoryId: "schotels",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    available: true,
    featured: false,
    spicy: false,
    vegetarian: false,
    vegan: false,
    allergens: ["[NOG IN TE VULLEN]"],
    options: [
      {
        name: "Bijgerecht",
        type: "select",
        required: true,
        choices: ["Verse Belgische frietjes", "Mediterrane gekruide rijst"]
      }
    ],
    sortOrder: 4
  },
  {
    id: "dish-5",
    name: "Gekruide Kefta Schotel",
    slug: "gekruide-kefta-schotel",
    description: "Ambachtelijk gekruid rundergehakt op spiesen gegrild volgens traditioneel recept.",
    price: 17.00,
    categoryId: "schotels",
    image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=800&q=80",
    available: true,
    featured: false,
    spicy: true,
    vegetarian: false,
    vegan: false,
    allergens: ["[NOG IN TE VULLEN]"],
    options: [
      {
        name: "Bijgerecht",
        type: "select",
        required: true,
        choices: ["Verse Belgische frietjes", "Mediterrane gekruide rijst"]
      }
    ],
    sortOrder: 5
  },

  // Broodjes & Dürüm
  {
    id: "dish-6",
    name: "Broodje Shoarma",
    slug: "broodje-shoarma",
    description: "Vers krokant pitabroodje gevuld met malse shoarma, verse ijsbergsla, tomaat, komkommer en saus naar keuze.",
    price: 8.50,
    categoryId: "broodjes",
    image: "https://images.unsplash.com/photo-1561651823-34feb02250e4?auto=format&fit=crop&w=800&q=80",
    available: true,
    featured: true,
    spicy: false,
    vegetarian: false,
    vegan: false,
    allergens: ["[NOG IN TE VULLEN]"],
    options: [
      {
        name: "Saus",
        type: "select",
        required: true,
        choices: ["Looksaus", "Andalouse", "Sambal (Pikant)", "Cocktail", "Mayonaise"]
      },
      {
        name: "Kaas toevoegen",
        type: "select",
        required: false,
        choices: ["Zonder extra kaas", "Met gesmolten kaas (+€1,00)"]
      }
    ],
    sortOrder: 6
  },
  {
    id: "dish-7",
    name: "Dürüm Falafel (Vegetarisch)",
    slug: "durum-falafel-vegetarisch",
    description: "Warme wrap gevuld met knapperige gekruide kikkererwten-falafel, verse kruiden, salade en romige tahin/looksaus.",
    price: 8.00,
    categoryId: "broodjes",
    image: "https://images.unsplash.com/photo-1593001874117-c99c800e3eb7?auto=format&fit=crop&w=800&q=80",
    available: true,
    featured: false,
    spicy: false,
    vegetarian: true,
    vegan: true,
    allergens: ["[NOG IN TE VULLEN]"],
    options: [
      {
        name: "Saus",
        type: "select",
        required: true,
        choices: ["Looksaus", "Tahin / Hummus saus", "Sambal (Pikant)"]
      }
    ],
    sortOrder: 7
  },

  // Vis & Seafood
  {
    id: "dish-8",
    name: "Scampi van de Chef (Diabolique)",
    slug: "scampi-chef-diabolique",
    description: "8 grote scampi's in een romige, licht pikante tomaten-roomsaus met verse tuinkruiden. Geserveerd met frietjes of brood.",
    price: 19.50,
    categoryId: "seafood",
    image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=800&q=80",
    available: true,
    featured: true,
    spicy: true,
    vegetarian: false,
    vegan: false,
    allergens: ["[NOG IN TE VULLEN]"],
    options: [
      {
        name: "Geserveerd met",
        type: "select",
        required: true,
        choices: ["Verse frietjes", "Stokbrood met boter", "Rijst"]
      }
    ],
    sortOrder: 8
  },

  // Pizza's & Pasta's
  {
    id: "dish-9",
    name: "Pizza Isis Special",
    slug: "pizza-isis-special",
    description: "Tomatensaus, mozzarella, malse shoarma, paprika, champignons, ajuin en een drizzle looksaus.",
    price: 14.50,
    categoryId: "pizza-pasta",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
    available: true,
    featured: true,
    spicy: false,
    vegetarian: false,
    vegan: false,
    allergens: ["[NOG IN TE VULLEN]"],
    options: [
      {
        name: "Formaat",
        type: "select",
        required: true,
        choices: ["Medium (30 cm)", "Large (36 cm) (+€3,50)"]
      }
    ],
    sortOrder: 9
  },
  {
    id: "dish-10",
    name: "Pizza Margherita",
    slug: "pizza-margherita",
    description: "Klassieke Italiaanse pizza met rijke tomatensaus, verse mozzarella en oregano.",
    price: 10.50,
    categoryId: "pizza-pasta",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80",
    available: true,
    featured: false,
    spicy: false,
    vegetarian: true,
    vegan: false,
    allergens: ["[NOG IN TE VULLEN]"],
    options: [],
    sortOrder: 10
  },

  // Salades & Voorgerechten
  {
    id: "dish-11",
    name: "Griekse Boarensalade",
    slug: "griekse-salade",
    description: "Knapperige ijsbergsla, rijpe tomaten, komkommer, rode ui, zwarte olijven en echte fetakaas met oregano-olijfolie dressing.",
    price: 9.50,
    categoryId: "salades-starters",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    available: true,
    featured: false,
    spicy: false,
    vegetarian: true,
    vegan: false,
    allergens: ["[NOG IN TE VULLEN]"],
    options: [],
    sortOrder: 11
  },

  // Kindermenu
  {
    id: "dish-12",
    name: "Kindermenu Shoarma",
    slug: "kindermenu-shoarma",
    description: "Kleine portie malse shoarma, verse frietjes, mayonaise of ketchup en een Capri-Sun.",
    price: 9.00,
    categoryId: "kindermenu",
    image: "https://images.unsplash.com/photo-1561651823-34feb02250e4?auto=format&fit=crop&w=800&q=80",
    available: true,
    featured: false,
    spicy: false,
    vegetarian: false,
    vegan: false,
    allergens: ["[NOG IN TE VULLEN]"],
    options: [
      {
        name: "Saus",
        type: "select",
        required: true,
        choices: ["Mayonaise", "Ketchup", "Looksaus"]
      }
    ],
    sortOrder: 12
  },

  // Sauzen & Extra's
  {
    id: "dish-13",
    name: "Portie Verse Frietjes",
    slug: "portie-verse-frietjes",
    description: "Grote portie goudbruin gebakken Belgische frieten.",
    price: 3.50,
    categoryId: "sauzen-extras",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80",
    available: true,
    featured: false,
    spicy: false,
    vegetarian: true,
    vegan: true,
    allergens: ["[NOG IN TE VULLEN]"],
    options: [],
    sortOrder: 13
  },
  {
    id: "dish-14",
    name: "Potje Huisgemaakte Looksaus",
    slug: "looksaus-extra",
    description: "Onze befaamde romige looksaus volgens geheim huirecept.",
    price: 1.50,
    categoryId: "sauzen-extras",
    image: "https://images.unsplash.com/photo-1472476443507-c7a5948772fc?auto=format&fit=crop&w=800&q=80",
    available: true,
    featured: false,
    spicy: false,
    vegetarian: true,
    vegan: false,
    allergens: ["[NOG IN TE VULLEN]"],
    options: [],
    sortOrder: 14
  },

  // Desserts & Dranken
  {
    id: "dish-15",
    name: "Traditionele Baklava (4 stuks)",
    slug: "baklava-4-stuks",
    description: "Krokant filodeeg gevuld met gehakte pistache- en walnoten, overgoten met zoete honing-suikersiroop.",
    price: 5.50,
    categoryId: "desserts-dranken",
    image: "https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=800&q=80",
    available: true,
    featured: true,
    spicy: false,
    vegetarian: true,
    vegan: false,
    allergens: ["[NOG IN TE VULLEN]"],
    options: [],
    sortOrder: 15
  },
  {
    id: "dish-16",
    name: "Coca-Cola (33cl)",
    slug: "coca-cola-33cl",
    description: "Verfrissend blikje 33cl.",
    price: 2.50,
    categoryId: "desserts-dranken",
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80",
    available: true,
    featured: false,
    spicy: false,
    vegetarian: true,
    vegan: true,
    allergens: [],
    options: [],
    sortOrder: 16
  }
];

