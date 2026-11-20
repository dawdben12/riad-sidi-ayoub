export type Language = "en" | "fr" | "es";

export interface LocalizedText {
  en: string;
  fr: string;
  es: string;
}

export interface LocalizedList {
  en: string[];
  fr: string[];
  es: string[];
}

export interface DishItem {
  id: string;
  name: LocalizedText;
  originalFr: string;
  description: LocalizedText;
  image: string;
}

export interface DrinkItem {
  id: string;
  name: LocalizedText;
  originalFr: string;
  description: LocalizedText;
  priceMad: number;
  image: string;
}

export interface WellnessItem {
  id: string;
  slug: string;
  name: LocalizedText;
  tagline: LocalizedText;
  priceMad: number;
  originalPriceMad?: number;
  duration: LocalizedText;
  isCombo?: boolean;
  description: LocalizedText;
  longDescription: LocalizedText;
  highlights: LocalizedList;
  image: string;
}

export interface ExcursionItem {
  id: string;
  slug: string;
  name: LocalizedText;
  schedule: LocalizedText;
  pricingMode: "per_person" | "group_or_private" | "private_only" | "per_hour";
  groupPriceEur?: number;
  privatePriceEur?: number;
  hourlyPriceEur?: number;
  priceDisplay: LocalizedText;
  description: LocalizedText;
  longDescription: LocalizedText;
  highlights: LocalizedList;
  included: LocalizedList;
  image: string;
}

export const WHATSAPP_NUMBER = "212655614801";
export const CONTACT_PHONE_DISPLAY = "+212 655 61 48 01";
export const CONTACT_EMAIL = "riadsidiayoub2013@gmail.com";

export const FALLBACK_HERO_IMAGE = "/images/riad-patio.jpg";

export const startersList: DishItem[] = [
  {
    id: "starter-moroccan-salad",
    name: {
      en: "Moroccan Salad (Salade Marocaine)",
      fr: "Salade Marocaine",
      es: "Ensalada Marroquí (Salade Marocaine)",
    },
    originalFr: "Salade Marocaine",
    description: {
      en: "Finely chopped fresh tomatoes, cucumbers, red onions, herbs, and extra-virgin Moroccan olive oil.",
      fr: "Tomates fraîches finement coupées, concombres, oignons doux, herbes fraîches et huile d'olive du Maroc.",
      es: "Tomates frescos finamente picados, pepinos, cebolla roja, hierbas aromáticas y aceite de oliva marroquí.",
    },
    image: "/images/menu/salade-marocaine.jpg",
  },
  {
    id: "starter-mixed-salad",
    name: {
      en: "Mixed Vegetable Salad (Salade Variée)",
      fr: "Salade Variée",
      es: "Ensalada Variada (Salade Variée)",
    },
    originalFr: "Salade Variée",
    description: {
      en: "Assorted market vegetables, seasonal greens, olives, and house lemon-herb dressing.",
      fr: "Assortiment de légumes frais du marché, crudités de saison, olives et vinaigrette maison.",
      es: "Surtido de verduras frescas del mercado, hortalizas de temporada, aceitunas y aliño de la casa.",
    },
    image: "/images/menu/salade-variee.jpg",
  },
  {
    id: "starter-soup",
    name: {
      en: "Traditional Moroccan Soup (Soupe / Harira)",
      fr: "Soupe Marocaine (Harira)",
      es: "Sopa Tradicional Marroquí (Soupe / Harira)",
    },
    originalFr: "Soupe",
    description: {
      en: "Warm traditional Moroccan Harira soup simmered with tomatoes, lentils, chickpeas, and fresh herbs.",
      fr: "Soupe marocaine traditionnelle mijotée aux tomates, lentilles, pois chiches et herbes parfumées.",
      es: "Cálida sopa tradicional marroquí Harira cocinada a fuego lento con tomates, lentejas, garbanzos y hierbas frescas.",
    },
    image: "/images/menu/harira-soupe.jpg",
  },
];

export const menuSet1Mains: DishItem[] = [
  {
    id: "main-tagine-veg",
    name: {
      en: "Beef Tagine with Vegetables",
      fr: "Tajine viande aux légumes",
      es: "Tajín de Carne con Verduras",
    },
    originalFr: "Tajine viande aux légumes",
    description: {
      en: "Slow-cooked beef or lamb tagine with fresh market vegetables and traditional spices.",
      fr: "Viande tendre mijotée lentement en tajine avec légumes frais du marché et épices.",
      es: "Tajín de ternera o cordero cocinado a fuego lento con verduras frescas del mercado y especias tradicionales.",
    },
    image: "/images/menu/tajine-viande-legumes.jpg",
  },
  {
    id: "main-tagine-prunes",
    name: {
      en: "Tagine with Prunes & Almonds",
      fr: "Tajine viande pruneaux amandes",
      es: "Tajín de Carne con Ciruelas y Almendras",
    },
    originalFr: "Tajine viande pruneaux amandes",
    description: {
      en: "Traditional sweet-and-savory meat tagine topped with caramelized prunes and toasted almonds.",
      fr: "Viande fondante mijotée aux pruneaux caramélisés à la cannelle et amandes grillées.",
      es: "Tradicional tajín agridulce de carne con ciruelas pasas caramelizadas a la canela y almendras tostadas.",
    },
    image: "/images/menu/tajine-pruneaux-amandes.jpg",
  },
  {
    id: "main-tagine-apricots-walnuts",
    name: {
      en: "Tagine with Apricots & Walnuts",
      fr: "Tajine viande abricots noix",
      es: "Tajín de Carne con Albaricoques y Nueces",
    },
    originalFr: "Tajine viande abricots noix",
    description: {
      en: "Tender meat slow-cooked with sweet apricots, crunchy walnuts, and warm spices.",
      fr: "Tajine de viande sucré-salé aux abricots moelleux et cerneaux de noix.",
      es: "Carne tierna cocinada lentamente con albaricoques dulces, nueces crujientes y especias cálidas.",
    },
    image: "/images/menu/tajine-abricots-noix.jpg",
  },
  {
    id: "main-tagine-apricots-dates",
    name: {
      en: "Tagine with Apricots & Dates",
      fr: "Tajine viande abricots dattes",
      es: "Tajín de Carne con Albaricoques y Dátiles",
    },
    originalFr: "Tajine viande abricots dattes",
    description: {
      en: "Braised meat tagine prepared with Saharan dates, apricots, and aromatic saffron sauce.",
      fr: "Viande mijotée aux abricots confits et dattes douces dans une sauce parfumée.",
      es: "Tajín de carne estofada con dátiles del oasis, albaricoques y salsa aromática de azafrán.",
    },
    image: "/images/menu/tajine-abricots-noix.jpg",
  },
  {
    id: "main-tagine-figs",
    name: {
      en: "Tagine with Figs",
      fr: "Tajine viande figues",
      es: "Tajín de Carne con Higos",
    },
    originalFr: "Tajine viande figues",
    description: {
      en: "Slow-braised meat tagine garnished with caramelized dried figs and delicate spices.",
      fr: "Tajine de viande longuement mijoté aux figues caramélisées et épices douces.",
      es: "Tajín de carne cocinado a fuego lento con higos caramelizados y suaves especias marroquíes.",
    },
    image: "/images/menu/tajine-figues.jpg",
  },
  {
    id: "main-couscous-meat",
    name: {
      en: "Meat & Vegetable Couscous",
      fr: "Couscous de viande et légumes",
      es: "Cuscús de Carne y Verduras",
    },
    originalFr: "Couscous de viande et légumes",
    description: {
      en: "Steamed fine semolina couscous served with tender beef and seven seasonal vegetables.",
      fr: "Semoule fine cuite à la vapeur, accompagnée de viande fondante et légumes du marché.",
      es: "Sémola fina de cuscús al vapor servida con carne tierna y siete verduras de temporada.",
    },
    image: "/images/menu/couscous-viande.jpg",
  },
  {
    id: "main-couscous-chicken",
    name: {
      en: "Chicken & Vegetable Couscous",
      fr: "Couscous de poulet et légumes",
      es: "Cuscús de Pollo y Verduras",
    },
    originalFr: "Couscous de poulet et légumes",
    description: {
      en: "Traditional Moroccan couscous topped with saffron chicken, chickpeas, and garden vegetables.",
      fr: "Couscous traditionnel garni de poulet mijoté au safran, pois chiches et légumes frais.",
      es: "Cuscús tradicional marroquí con pollo al azafrán, garbanzos y verduras frescas de la huerta.",
    },
    image: "/images/menu/couscous-poulet.jpg",
  },
  {
    id: "main-skewers-chicken",
    name: {
      en: "Chicken Skewers",
      fr: "Brochettes de poulet",
      es: "Brochetas de Pollo",
    },
    originalFr: "Brochettes de poulet",
    description: {
      en: "Grilled marinated chicken skewers seasoned with Moroccan herbs and spices.",
      fr: "Brochettes de poulet marinées aux herbes fraîches et épices douces, grillées minute.",
      es: "Brochetas de pollo marinadas a la parrilla con hierbas frescas y especias marroquíes.",
    },
    image: "/images/menu/brochettes.jpg",
  },
  {
    id: "main-skewers-beef",
    name: {
      en: "Beef Skewers",
      fr: "Brochettes de viande",
      es: "Brochetas de Carne",
    },
    originalFr: "Brochettes de viande",
    description: {
      en: "Char-grilled tender beef skewers marinated with cumin, paprika, coriander, and olive oil.",
      fr: "Brochettes de viande tendre marinées au cumin, paprika et coriandre, grillées à point.",
      es: "Brochetas de ternera tierna a la parrilla marinadas con comino, pimentón, cilantro y aceite de oliva.",
    },
    image: "/images/menu/brochettes.jpg",
  },
  {
    id: "main-spaghetti-bolognese",
    name: {
      en: "Spaghetti Bolognese",
      fr: "Spaghetti bolognese",
      es: "Espaguetis a la Boloñesa",
    },
    originalFr: "Spaghetti bolognese",
    description: {
      en: "Classic spaghetti pasta served with homemade minced beef and fresh tomato bolognese sauce.",
      fr: "Spaghetti servis avec une sauce bolognaise maison à la viande hachée et tomates fraîches.",
      es: "Espaguetis clásicos con salsa boloñesa casera de carne picada y tomates frescos.",
    },
    image: "/images/menu/spaghetti-bolognese.jpg",
  },
];

export const menuSet2SignatureMains: DishItem[] = [
  {
    id: "sig-pastilla-meat",
    name: {
      en: "Minced Meat Pastilla",
      fr: "Pastilla à la viande hachée",
      es: "Pastela de Carne Picada",
    },
    originalFr: "Pastilla à la viande hachée",
    description: {
      en: "Crisp golden warqa pastry filled with spiced minced beef, fresh herbs, and toasted almonds.",
      fr: "Feuilleté croustillant de feuilles de brick farci à la viande hachée parfumée aux épices et amandes.",
      es: "Crujiente hojaldre dorado relleno de carne picada especiada, hierbas frescas y almendras tostadas.",
    },
    image: "/images/menu/pastilla.jpg",
  },
  {
    id: "sig-pastilla-chicken",
    name: {
      en: "Chicken Pastilla",
      fr: "Pastilla au poulet",
      es: "Pastela de Pollo y Almendras",
    },
    originalFr: "Pastilla au poulet",
    description: {
      en: "Traditional flaky Moroccan pastry layered with saffron chicken and roasted almonds, dusted with powdered sugar and cinnamon.",
      fr: "Authentique pastilla marocaine au poulet effiloché et amandes grillées, saupoudrée de sucre glace et de cannelle.",
      es: "Tradicional pastel marroquí de hojaldre relleno de pollo al azafrán y almendras tostadas, espolvoreado con azúcar glas y canela.",
    },
    image: "/images/menu/pastilla.jpg",
  },
  {
    id: "sig-tanjia-marrakchia",
    name: {
      en: "Tanjia Marrakchia",
      fr: "Tanjia Marrakchia",
      es: "Tanjia Marrakchia",
    },
    originalFr: "Tanjia Marrakchia",
    description: {
      en: "Marrakech's signature specialty: tender meat slow-cooked for hours in a traditional clay amphora pot with preserved lemon, cumin, garlic, and saffron.",
      fr: "La grande spécialité de Marrakech : viande fondante confite pendant des heures en jarre de terre cuite avec citron confit, cumin, ail et safran.",
      es: "La especialidad emblemática de Marrakech: carne tierna cocinada durante horas en ánfora de barro tradicional con limón confitado, comino, ajo y azafrán.",
    },
    image: "/images/menu/tanjia.jpg",
  },
];

export const dessertsList: DishItem[] = [
  {
    id: "dessert-seasonal-fruits",
    name: {
      en: "Seasonal Fruits (Fruits de saison)",
      fr: "Fruits de saison",
      es: "Frutas de Temporada (Fruits de saison)",
    },
    originalFr: "Fruits de saison",
    description: {
      en: "Platter of fresh seasonal fruits from the Marrakech market.",
      fr: "Assiette de fruits frais de saison sélectionnés au marché.",
      es: "Plato de frutas frescas de temporada seleccionadas en el mercado de Marrakech.",
    },
    image: "/images/menu/fruits-saison.jpg",
  },
  {
    id: "dessert-orange-cinnamon",
    name: {
      en: "Orange with Cinnamon (Orange à la cannelle)",
      fr: "Orange à la cannelle",
      es: "Naranja con Canela (Orange à la cannelle)",
    },
    originalFr: "Orange à la cannelle",
    description: {
      en: "Freshly sliced Moroccan oranges lightly dusted with cinnamon and orange blossom water.",
      fr: "Tranches d'oranges fraîches du Maroc parfumées à la cannelle et fleur d'oranger.",
      es: "Rodajas de naranja fresca marroquí espolvoreadas con canela y agua de azahar.",
    },
    image: "/images/menu/orange-cannelle.jpg",
  },
  {
    id: "dessert-fruit-salad",
    name: {
      en: "Fruit Salad (Salade de fruits)",
      fr: "Salade de fruits",
      es: "Macedonia de Frutas (Salade de fruits)",
    },
    originalFr: "Salade de fruits",
    description: {
      en: "Chilled diced seasonal fruits served in fresh orange juice.",
      fr: "Salade de fruits frais de saison coupés minute.",
      es: "Ensalada fresca de frutas de temporada troceadas con zumo de naranja natural.",
    },
    image: "/images/menu/salade-fruits.jpg",
  },
  {
    id: "dessert-moroccan-pastries",
    name: {
      en: "Moroccan Pastries (Pâtisserie Marocaine)",
      fr: "Pâtisserie Marocaine",
      es: "Pastelería Marroquí (Pâtisserie Marocaine)",
    },
    originalFr: "Pâtisserie Marocaine",
    description: {
      en: "Assortment of traditional Moroccan almond and honey pastries.",
      fr: "Assortiment de pâtisseries marocaines artisanales aux amandes et au miel.",
      es: "Surtido de dulces tradicionales marroquíes artesanales con almendras, miel y azahar.",
    },
    image: "/images/menu/patisserie-marocaine.jpg",
  },
];

export const drinksList: DrinkItem[] = [
  {
    id: "drink-mint-tea-coffee",
    name: {
      en: "Mint Tea, Verbena, Black Tea, or Black Coffee",
      fr: "Thé à la menthe, thé verveine, thé noir, café noir",
      es: "Té a la Menta, Hierbaluisa, Té Negro o Café Solo",
    },
    originalFr: "Thé à la menthe, thé verveine, thé noir, café noir",
    description: {
      en: "Traditional Moroccan mint tea, soothing verbena tea, black tea, or black coffee.",
      fr: "Thé à la menthe fraîche, infusion de verveine, thé noir ou café noir.",
      es: "Tradicional té verde marroquí a la menta fresca, infusión de hierbaluisa, té negro o café negro.",
    },
    priceMad: 15,
    image: "/images/items/drink-mint-tea-coffee.jpg",
  },
  {
    id: "drink-cafe-au-lait",
    name: {
      en: "Café au lait",
      fr: "Café au lait",
      es: "Café con Leche (Café au lait)",
    },
    originalFr: "Café au lait",
    description: {
      en: "Freshly brewed coffee served with warm milk.",
      fr: "Café chaud accompagné de lait chaud.",
      es: "Café recién hecho acompañado de leche caliente.",
    },
    priceMad: 20,
    image: "/images/items/drink-cafe-au-lait.jpg",
  },
  {
    id: "drink-orange-juice",
    name: {
      en: "Fresh Orange Juice (Jus d'orange)",
      fr: "Jus d'orange",
      es: "Zumo de Naranja Natural (Jus d'orange)",
    },
    originalFr: "Jus d'orange",
    description: {
      en: "Freshly squeezed Moroccan orange juice.",
      fr: "Pur jus d'oranges du Maroc pressées à la minute.",
      es: "Zumo de naranjas marroquíes recién exprimidas al momento.",
    },
    priceMad: 25,
    image: "/images/items/drink-orange-juice.jpg",
  },
  {
    id: "drink-sodas",
    name: {
      en: "Soft Drinks / Lemonade (Coca, Fanta, Sprite, Schweppes...)",
      fr: "Limonade (Coca, Fanta, Sprite, Schweppes...)",
      es: "Refrescos (Coca-Cola, Fanta, Sprite, Schweppes...)",
    },
    originalFr: "Limonade (Coca, Fanta, Sprite, Schweppes...)",
    description: {
      en: "Chilled sodas and soft drinks of your choice.",
      fr: "Boissons gazeuses fraîches au choix.",
      es: "Refrescos fríos a su elección.",
    },
    priceMad: 20,
    image: "/images/items/drink-sodas.jpg",
  },
  {
    id: "drink-mineral-water",
    name: {
      en: "Mineral Water 1.5L / Sparkling Water",
      fr: "Eau Minérale 1.5L / Eau gazeuse",
      es: "Agua Mineral 1.5L / Agua con Gas",
    },
    originalFr: "Eau Minérale 1.5L / Eau gazeuse",
    description: {
      en: "1.5L bottle of still mineral water or sparkling water.",
      fr: "Grande bouteille d'eau minérale 1.5L ou eau gazeuse.",
      es: "Botella grande de agua mineral natural de 1.5L o agua con gas.",
    },
    priceMad: 20,
    image: "/images/items/drink-mineral-water.jpg",
  },
];

export const wellnessComboItem: WellnessItem = {
  id: "wellness-combo",
  slug: "combo",
  name: {
    en: "Signature Riad Ritual: Hammam + Massage Pack",
    fr: "Rituel Signature du Riad : Pack Hammam + Massage",
    es: "Ritual Exclusivo del Riad: Pack Hammam + Masaje",
  },
  tagline: {
    en: "Complete Post-Medina Sanctuary • Save 50 MAD",
    fr: "Sérénité Absolue Après la Médina • Économisez 50 MAD",
    es: "Santuario Completo Tras la Medina • Ahorre 50 MAD",
  },
  priceMad: 350,
  originalPriceMad: 400,
  duration: {
    en: "Approx. 1h 45m Complete Ritual",
    fr: "Rituel Complet env. 1h 45",
    es: "Ritual Completo aprox. 1h 45m",
  },
  isCombo: true,
  description: {
    en: "After hours of walking through Marrakech's vibrant souks, return to the quiet calm of Riad Sidi Ayoub for our complete restoration ritual: a traditional eucalyptus black-soap Hammam & kessa exfoliation followed seamlessly by a 60-minute full-body Moroccan argan oil massage.",
    fr: "Après l'effervescence des souks de Marrakech, retrouvez le calme absolu du Riad Sidi Ayoub avec notre rituel complet : un Hammam traditionnel au savon noir et gommage au gant kessa, suivi d'un massage relaxant du corps entier aux huiles d'argan du Maroc.",
    es: "Tras recorrer los vibrantes zocos de Marrakech, regrese a la serenidad de Riad Sidi Ayoub para disfrutar de nuestro ritual completo: un Hammam tradicional con jabón negro y exfoliación con guante kessa, seguido de un masaje relajante de cuerpo completo con aceite de argán.",
  },
  longDescription: {
    en: "Designed as the ultimate transition from the lively streets of the Medina to the peaceful sanctuary of Riad Sidi Ayoub, our 350 MAD Hammam & Massage Combo Pack pairs both of our signature wellness rituals into one unhurried experience. Begin in the gentle warmth of our steam room where organic eucalyptus black soap (savon beldi) prepares your skin for a traditional kessa glove exfoliation. Once your skin is purified and muscles warmed, drift directly into a 60-minute full-body massage with warm Moroccan argan and orange-blossom oils, followed by fresh mint tea in the courtyard.",
    fr: "Conçu comme une parenthèse de douceur après vos découvertes dans la Médina, le Pack Hammam + Massage à 350 MAD réunit nos deux soins emblématiques en une seule expérience harmonieuse au Riad Sidi Ayoub. Commencez par la chaleur apaisante du bain de vapeur avec l'application du savon beldi à l'eucalyptus et le gommage purifiant au gant kessa. Poursuivez immédiatement par une heure de massage enveloppant à l'huile d'argan tiède parfumée à la fleur d'oranger, avant de savourer un thé à la menthe dans le calme du patio.",
    es: "Concebido como el refugio perfecto tras explorar la Medina de Marrakech, nuestro Pack Hammam + Masaje por 350 MAD combina los dos rituales esenciales de Riad Sidi Ayoub en una experiencia continua y serena. Comience con el vapor cálido del Hammam, la aplicación de jabón negro de eucalipto (savon beldi) y la exfoliación tradicional con guante kessa. Con la piel renovada y los músculos relajados, disfrute de un masaje de cuerpo completo de 60 minutos con aceite de argán tibio y flor de azahar, finalizando con un té a la menta en el patio.",
  },
  highlights: {
    en: [
      "Full Traditional Moroccan Hammam with eucalyptus Savon Beldi & Kessa exfoliation",
      "60-minute soothing full-body massage with warm Moroccan Argan oil",
      "Preferential package rate of 350 MAD per guest (instead of 400 MAD)",
      "Complimentary herbal or mint tea served in the Riad patio after your ritual",
    ],
    fr: [
      "Hammam marocain complet au Savon Beldi à l'eucalyptus et gommage Kessa",
      "Massage relaxant de 60 minutes du corps entier à l'huile d'Argan tiède",
      "Tarif privilégié de 350 MAD par personne (au lieu de 400 MAD)",
      "Thé à la menthe ou infusion servie dans le patio après votre soin",
    ],
    es: [
      "Hammam marroquí completo con jabón negro (Savon Beldi) y exfoliación Kessa",
      "Masaje relajante de 60 minutos de cuerpo entero con aceite de Argán tibio",
      "Tarifa especial de 350 MAD por persona (en lugar de 400 MAD)",
      "Té a la menta o infusión relajante servida en el patio al finalizar",
    ],
  },
  image: "/images/items/wellness-massage.jpg",
};

export const wellnessList: WellnessItem[] = [
  {
    id: "wellness-hammam",
    slug: "hammam",
    name: {
      en: "Traditional Hammam",
      fr: "Hammam Traditionnel",
      es: "Hammam Tradicional Marroquí",
    },
    tagline: {
      en: "Authentic Steam, Savon Beldi & Kessa Ritual",
      fr: "Vapeur Douce, Savon Beldi & Gommage Kessa",
      es: "Vapor Suave, Savon Beldi y Exfoliación Kessa",
    },
    priceMad: 200,
    duration: {
      en: "45 – 60 min Ritual",
      fr: "Rituel 45 – 60 min",
      es: "Ritual 45 – 60 min",
    },
    description: {
      en: "Authentic Moroccan steam bath ritual with black soap (savon beldi) and kessa exfoliation to purify and relax the body.",
      fr: "Bain de vapeur marocain authentique avec savon noir (savon beldi) et gommage au gant kessa pour purifier et détendre le corps.",
      es: "Auténtico ritual de baño de vapor marroquí con jabón negro (savon beldi) y exfoliación con guante kessa para purificar y relajar el cuerpo.",
    },
    longDescription: {
      en: "Step into the timeless tranquility of our Riad's traditional Hammam. Enveloped in gentle steam, your skin is treated with natural olive-and-eucalyptus black soap (savon beldi), rich in vitamin E, followed by an invigorating full-body exfoliation using a traditional kessa glove. This centuries-old Moroccan purification ritual deeply cleanses pores, stimulates circulation, and leaves your body feeling weightless and renewed after a day in Marrakech.",
      fr: "Plongez dans la sérénité intemporelle du Hammam traditionnel du Riad Sidi Ayoub. Dans une vapeur douce qui délasse les muscles, votre peau reçoit une application de savon noir naturel aux olives et à l'eucalyptus (savon beldi), suivie d'un gommage tonifiant au gant kessa. Ce rituel ancestral purifie l'épiderme en profondeur, libère les tensions et procure une sensation immédiate de légèreté.",
      es: "Adéntrese en la calma atemporal del Hammam tradicional de Riad Sidi Ayoub. Envuelto en un suave vapor cálido, su piel se nutre con jabón negro natural de oliva y eucalipto (savon beldi), seguido de una exfoliación profunda con el guante tradicional kessa. Este ritual centenario marroquí purifica la piel, activa la circulación y devuelve una sensación de ligereza absoluta.",
    },
    highlights: {
      en: [
        "Private heated steam room prepared exclusively for your appointment",
        "100% natural Moroccan olive & eucalyptus black soap (Savon Beldi)",
        "Traditional Kessa glove exfoliation & warm rinsing ritual",
        "Quiet relaxation with fresh mint tea after your session",
      ],
      fr: [
        "Hammam chauffé et préparé exclusivement pour votre créneau",
        "Savon noir 100% naturel à l'olive et à l'eucalyptus (Savon Beldi)",
        "Gommage traditionnel au gant Kessa et rinçage apaisant",
        "Pause détente avec thé à la menthe dans le patio après le soin",
      ],
      es: [
        "Sala de vapor preparada exclusivamente para su horario",
        "Jabón negro 100% natural de oliva y eucalipto (Savon Beldi)",
        "Exfoliación tradicional con guante Kessa y enjuague cálido",
        "Descanso con té a la menta en el patio tras la sesión",
      ],
    },
    image: "/images/items/wellness-hammam.jpg",
  },
  {
    id: "wellness-massage",
    slug: "massage",
    name: {
      en: "Relaxing Massage",
      fr: "Massage Relaxant",
      es: "Masaje Relajante",
    },
    tagline: {
      en: "Full-Body Warm Argan & Essential Oil Therapy",
      fr: "Soin Corps Complet à l'Huile d'Argan Tiède",
      es: "Terapia Corporal Completa con Aceite de Argán Tibio",
    },
    priceMad: 200,
    duration: {
      en: "60 min Session",
      fr: "Séance 60 min",
      es: "Sesión de 60 min",
    },
    description: {
      en: "Soothing full-body massage with natural Moroccan oils to relieve tension and restore energy.",
      fr: "Massage corporel complet et apaisant aux huiles naturelles du Maroc pour dénouer les tensions et restaurer l'énergie.",
      es: "Reconfortante masaje de cuerpo completo con aceites naturales de Marruecos para aliviar la tensión y renovar la energía.",
    },
    longDescription: {
      en: "Unwind in a serene, candlelit room at Riad Sidi Ayoub with a 60-minute full-body relaxing massage. Using pure, lightly warmed Moroccan argan oil delicately scented with orange blossom, our therapist employs slow, flowing strokes to soothe tired legs from walking the Medina, release shoulder and back tension, and restore deep mental calm.",
      fr: "Accordez-vous une heure de lâcher-prise absolu au Riad Sidi Ayoub grâce à notre massage relaxant du corps entier. Réalisé avec une huile d'argan pure du Maroc légèrement tiédie et délicatement parfumée à la fleur d'oranger, ce soin aux mouvements amples et fluides défatigue les jambes après vos promenades dans la Médina, dénoue le dos et apaise profondément l'esprit.",
      es: "Disfrute de una hora de desconexión total en Riad Sidi Ayoub con nuestro masaje relajante de cuerpo completo. Realizado con aceite de argán puro de Marruecos ligeramente tibio y perfumado con flor de azahar, este tratamiento de movimientos suaves y envolventes alivia el cansancio de las piernas tras caminar por la Medina, libera la espalda yAquieta la mente.",
    },
    highlights: {
      en: [
        "60-minute full-body massage tailored to your preferred pressure",
        "Pure organic Moroccan Argan oil infused with orange blossom",
        "Focus on tired legs, feet, shoulders, and lower back after Medina walks",
        "Serene atmosphere followed by soothing herbal infusion",
      ],
      fr: [
        "Massage complet de 60 minutes adapté à la pression de votre choix",
        "Huile d'Argan biologique du Maroc parfumée à la fleur d'oranger",
        "Soin idéal pour délasser les jambes, les épaules et le dos",
        "Atmosphère calme suivie d'une infusion relaxante au patio",
      ],
      es: [
        "Masaje corporal de 60 minutos adaptado a su presión preferida",
        "Aceite de Argán orgánico de Marruecos con esencia de azahar",
        "Especial atención a piernas cansadas, hombros y espalda",
        "Ambiente sereno seguido de una infusión relajante en el patio",
      ],
    },
    image: "/images/items/wellness-massage.jpg",
  },
];

export const excursionsList: ExcursionItem[] = [
  {
    id: "exc-merzouga",
    slug: "merzouga",
    name: {
      en: "Merzouga Desert (3 Days)",
      fr: "Désert de Merzouga (3 Jours)",
      es: "Desierto de Merzouga (3 Días)",
    },
    schedule: {
      en: "3 Days / 2 Nights • Morning Departure at 7:00 AM",
      fr: "3 Jours / 2 Nuits • Départ matinal à 07h00",
      es: "3 Días / 2 Noches • Salida matutina a las 7:00 AM",
    },
    pricingMode: "per_person",
    groupPriceEur: 120,
    priceDisplay: {
      en: "120 € / person",
      fr: "120 € / personne",
      es: "120 € / persona",
    },
    description: {
      en: "A 3-day Sahara expedition across the High Atlas Mountains and historic kasbahs to the golden dunes of Erg Chebbi, featuring camel trekking at sunset and an overnight desert camp stay.",
      fr: "Une expédition de 3 jours dans le Sahara à travers le Haut Atlas et les kasbahs historiques jusqu'aux dunes dorées de l'Erg Chebbi, avec balade à dos de chameau au coucher du soleil et nuit au campement.",
      es: "Expedición de 3 días al Sáhara cruzando el Alto Atlas y kasbahs históricas hasta las dunas doradas de Erg Chebbi, con paseo en camello al atardecer y estancia nocturna en campamento del desierto.",
    },
    longDescription: {
      en: "Experience Morocco's grand Saharan journey over three unforgettable days. Departing from Riad Sidi Ayoub, cross the dramatic Tizi n'Tichka pass of the High Atlas Mountains, visit the UNESCO-listed Ksar of Aït Benhaddou, and travel through the Valley of Roses and Dades Gorges on Day 1. On Day 2, marvel at the towering rock canyons of Todra Gorge before reaching Merzouga, where a camel caravan carries you across the golden dunes of Erg Chebbi at sunset to your Saharan desert camp for dinner, Berber drumming around the fire, and a night beneath the stars. Return to Marrakech on Day 3 across the Draa Valley.",
      fr: "Vivez la grande aventure saharienne du Maroc sur trois jours inoubliables. Au départ du Riad Sidi Ayoub, traversez le col du Tizi n'Tichka dans le Haut Atlas, visitez le Ksar d'Aït Benhaddou et parcourez la vallée des Roses jusqu'aux gorges du Dadès le premier jour. Le deuxième jour, découvrez les impressionnantes falaises des gorges du Todra avant de rejoindre Merzouga, où votre caravane de dromadaires vous mène au coucher du soleil à travers les dunes dorées de l'Erg Chebbi jusqu'à votre bivouac pour un dîner sous les étoiles. Retour à Marrakech le troisième jour.",
      es: "Viva la gran travesía por el Sáhara marroquí durante tres días inolvidables. Saliendo desde Riad Sidi Ayoub, cruce el puerto de Tizi n'Tichka en el Alto Atlas, visite el Ksar de Aït Benhaddou y recorra el Valle de las Rosas hasta las Gargantas del Dadès el primer día. El segundo día, explore los cañones del Todra antes de llegar a Merzouga, donde una caravana de camellos le llevará al atardecer por las dunas doradas de Erg Chebbi hasta su campamento en el desierto para cenar bajo las estrellas. Regreso a Marrakech el tercer día.",
    },
    highlights: {
      en: [
        "Day 1: High Atlas Mountains, Aït Benhaddou Kasbah, Ouarzazate & Dades Gorges overnight",
        "Day 2: Todra Gorges, Erfoud oasis & sunset camel trek into the Erg Chebbi Sahara dunes",
        "Day 3: Sunrise over the golden dunes, camel ride back & scenic return to Marrakech",
      ],
      fr: [
        "Jour 1 : Haut Atlas, Ksar d'Aït Benhaddou, Ouarzazate & nuit dans les Gorges du Dadès",
        "Jour 2 : Gorges du Todra & méharée à dos de dromadaire au coucher du soleil à Merzouga",
        "Jour 3 : Lever du soleil sur les dunes de l'Erg Chebbi & retour panoramique vers Marrakech",
      ],
      es: [
        "Día 1: Alto Atlas, Ksar de Aït Benhaddou, Ouarzazate y noche en las Gargantas del Dadès",
        "Día 2: Gargantas del Todra y paseo en camello al atardecer por las dunas de Merzouga",
        "Día 3: Amanecer sobre las dunas de Erg Chebbi y regreso panorámico a Marrakech",
      ],
    },
    included: {
      en: [
        "Air-conditioned minibus / 4x4 transport from the Riad",
        "2 nights accommodation (1 night Dades Hotel + 1 night Merzouga Desert Camp)",
        "2 dinners & 2 breakfasts + sunset & sunrise camel trek",
      ],
      fr: [
        "Transport climatisé aller-retour depuis le Riad",
        "2 nuits d'hébergement (1 nuit hôtel au Dadès + 1 nuit bivouac à Merzouga)",
        "Demi-pension (2 dîners et 2 petits-déjeuners) + balade à dromadaire",
      ],
      es: [
        "Transporte climatizado de ida y vuelta desde el Riad",
        "2 noches de alojamiento (1 noche hotel en Dadès + 1 noche campamento en Merzouga)",
        "Media pensión (2 cenas y 2 desayunos) + paseo en camello al atardecer y amanecer",
      ],
    },
    image: "/images/excursion/merzouga.jpg",
  },
  {
    id: "exc-ouarzazate",
    slug: "ouarzazate",
    name: {
      en: "Ouarzazate",
      fr: "Ouarzazate",
      es: "Ouarzazate y Kasbahs",
    },
    schedule: {
      en: "Departure at 7:00 AM | Return at 7:00 PM (Takeaway breakfast provided at 7:00 AM)",
      fr: "Départ à 07h00 | Retour à 19h00 (Petit-déjeuner à emporter fourni à 07h00)",
      es: "Salida a las 7:00 AM | Regreso a las 7:00 PM (Desayuno para llevar incluido a las 7:00 AM)",
    },
    pricingMode: "group_or_private",
    groupPriceEur: 30,
    privatePriceEur: 150,
    priceDisplay: {
      en: "30 € / person (Group) | 150 € (Private)",
      fr: "30 € / pers. (Groupe) | 150 € (Privé)",
      es: "30 € / persona (Grupo) | 150 € (Privado)",
    },
    description: {
      en: "Full-day scenic drive over the Tizi n'Tichka mountain pass to Ouarzazate and its iconic kasbahs.",
      fr: "Excursion d'une journée complète à travers le col de Tizi n'Tichka vers Ouarzazate et ses célèbres kasbahs.",
      es: "Excursión panorámica de día completo cruzando el puerto de montaña Tizi n'Tichka hacia Ouarzazate y sus emblemáticas kasbahs.",
    },
    longDescription: {
      en: "Journey across the High Atlas Mountains via the winding Tizi n'Tichka pass (2,260m) to the gateway of the Sahara. Explore the world-famous fortified earthen village (ksar) of Aït Benhaddou—a UNESCO World Heritage site and backdrop to legendary films—before continuing to Ouarzazate to discover the historic Taourirt Kasbah and cinema studio heritage. Because departure is at 7:00 AM, Riad Sidi Ayoub prepares a fresh takeaway breakfast for you to enjoy on your journey.",
      fr: "Traversez les sommets du Haut Atlas par le célèbre col du Tizi n'Tichka (2 260 m) jusqu'aux portes du désert. Visitez le Ksar d'Aït Benhaddou, joyau d'architecture de terre classé au patrimoine mondial de l'UNESCO, puis découvrez Ouarzazate, la Kasbah de Taourirt et ses célèbres studios de cinéma. Pour votre départ matinal à 07h00, le Riad Sidi Ayoub prépare un petit-déjeuner à emporter.",
      es: "Cruze la cordillera del Alto Atlas por el espectacular puerto de Tizi n'Tichka (2.260 m) hasta la puerta del desierto. Explore la ciudadela fortificada de Aït Benhaddou, declarada Patrimonio de la Humanidad por la UNESCO, antes de continuar hacia Ouarzazate y la histórica Kasbah de Taourirt. Para su salida temprana a las 7:00 AM, Riad Sidi Ayoub le prepara un desayuno para llevar.",
    },
    highlights: {
      en: [
        "Panoramic drive across the High Atlas Tizi n'Tichka mountain pass (2,260m)",
        "Guided exploration of the UNESCO World Heritage Ksar of Aït Benhaddou",
        "Visit to Ouarzazate, Taourirt Kasbah & optional Atlas Film Studios stop",
      ],
      fr: [
        "Traversée panoramique du Haut Atlas par le col de Tizi n'Tichka (2 260 m)",
        "Découverte du Ksar d'Aït Benhaddou classé au patrimoine mondial de l'UNESCO",
        "Visite de Ouarzazate, de la Kasbah de Taourirt et des studios de cinéma",
      ],
      es: [
        "Recorrido panorámico por el Alto Atlas y el puerto de Tizi n'Tichka (2.260 m)",
        "Exploración del Ksar de Aït Benhaddou, Patrimonio de la Humanidad por la UNESCO",
        "Visita a Ouarzazate, la Kasbah de Taourirt y los estudios de cine",
      ],
    },
    included: {
      en: [
        "Takeaway breakfast prepared by Riad Sidi Ayoub at 7:00 AM",
        "Round-trip air-conditioned transport (Group or Private option)",
        "Scenic photo stops along the High Atlas valleys",
      ],
      fr: [
        "Petit-déjeuner à emporter préparé par le Riad Sidi Ayoub à 07h00",
        "Transport climatisé aller-retour (Formule Groupe ou Privée)",
        "Arrêts photos panoramiques dans le Haut Atlas",
      ],
      es: [
        "Desayuno para llevar preparado por Riad Sidi Ayoub a las 7:00 AM",
        "Transporte climatizado de ida y vuelta (Opción Grupo o Privado)",
        "Paradas fotográficas panorámicas en el Alto Atlas",
      ],
    },
    image: "/images/excursion/ouarzazate.jpg",
  },
  {
    id: "exc-chez-ali",
    slug: "chez-ali",
    name: {
      en: "Chez Ali (Moroccan Dinner & Show)",
      fr: "Chez Ali (Dîner & Spectacle Marocain)",
      es: "Chez Ali (Cena Marroquí y Espectáculo)",
    },
    schedule: {
      en: "7:00 PM to 11:00 PM",
      fr: "19h00 à 23h00",
      es: "7:00 PM a 11:00 PM",
    },
    pricingMode: "per_person",
    groupPriceEur: 50,
    priceDisplay: {
      en: "50 € / person",
      fr: "50 € / personne",
      es: "50 € / persona",
    },
    description: {
      en: "Traditional Moroccan dinner evening in Marrakech featuring folklore music, dancers, and the famous Fantasia horse show.",
      fr: "Soirée dîner marocain traditionnel à Marrakech avec musique folklorique, danseurs et le célèbre spectacle équestre de Fantasia.",
      es: "Velada con cena tradicional marroquí en Marrakech acompañada de música folclórica, bailarines y el famoso espectáculo ecuestre de Fantasía.",
    },
    longDescription: {
      en: "Spend an enchanting Arabian Nights evening at the legendary Chez Ali complex in Marrakech's palm grove. Welcomed by traditional Berber tribes and musicians, dine beneath royal caïdal tents on a multi-course Moroccan feast (Harira soup, slow-roasted Mechoui lamb or tagine, seven-vegetable couscous, seasonal fruits, and mint tea with pastries) while folklore troupes parade from table to table, culminating in a thrilling outdoor Fantasia (Tbourida) horsemanship and fireworks show.",
      fr: "Vivez une soirée des Mille et Une Nuits au célèbre complexe Chez Ali dans la palmeraie de Marrakech. Accueilli par les troupes folkloriques et cavaliers berbères, savourez un festin marocain traditionnel sous de somptueuses tentes caïdales (soupe Harira, méchoui ou tajine, couscous aux légumes, fruits, thé à la menthe et pâtisseries) avant d'assister dans la grande arène extérieure au spectaculaire show équestre de Fantasia.",
      es: "Disfrute de una mágica noche de las Mil y Una Noches en el legendario complejo Chez Ali en el palmeral de Marrakech. Recibido por músicos y jinetes bereberes, deguste un banquete tradicional marroquí bajo carpas imperiales (sopa Harira, cordero asado Mechoui o tajín, cuscús, frutas, té a la menta y dulces) mientras las agrupaciones folclóricas actúan, culminando con el impresionante espectáculo ecuestre de Fantasía al aire libre.",
    },
    highlights: {
      en: [
        "Full traditional Moroccan feast served beneath royal Caïdal tents",
        "Live regional Moroccan folklore musicians, Gnaoua & Berber dancers",
        "Grand outdoor Fantasia (Tbourida) horsemanship & acrobatics show",
      ],
      fr: [
        "Dîner gastronomique marocain complet servi sous tentes caïdales",
        "Défilé de troupes folkloriques, chants berbères et musiciens Gnaoua",
        "Grand spectacle équestre de Fantasia (Tbourida) en plein air",
      ],
      es: [
        "Cena tradicional marroquí completa servida bajo carpas imperiales",
        "Actuaciones en vivo de grupos folclóricos bereberes y músicos Gnaoua",
        "Gran espectáculo ecuestre de Fantasía (Tbourida) al aire libre",
      ],
    },
    included: {
      en: [
        "Evening round-trip transfer from the Riad (7:00 PM – 11:00 PM)",
        "Complete Moroccan dinner menu & mint tea with pastries",
        "Admission to the folklore parade & Fantasia arena show",
      ],
      fr: [
        "Transfert aller-retour en soirée depuis le Riad (19h00 – 23h00)",
        "Menu dîner marocain complet avec thé à la menthe et pâtisseries",
        "Accès au spectacle folklorique et à la Fantasia",
      ],
      es: [
        "Traslado nocturno de ida y vuelta desde el Riad (7:00 PM – 11:00 PM)",
        "Cena marroquí completa con té a la menta y pastelería",
        "Entrada al desfile folclórico y al espectáculo de Fantasía",
      ],
    },
    image: "/images/excursion/chez-ali.jpg",
  },
  {
    id: "exc-hot-air-balloon",
    slug: "hot-air-balloon",
    name: {
      en: "Hot Air Balloon",
      fr: "Vol en Montgolfière",
      es: "Vuelo en Globo Aerostático",
    },
    schedule: {
      en: "5:00 AM to 8:30 AM",
      fr: "05h00 à 08h30",
      es: "5:00 AM a 8:30 AM",
    },
    pricingMode: "per_person",
    groupPriceEur: 150,
    priceDisplay: {
      en: "150 € / person",
      fr: "150 € / personne",
      es: "150 € / persona",
    },
    description: {
      en: "Sunrise hot air balloon flight high above the Marrakech palm groves with panoramic views of the Atlas Mountains.",
      fr: "Vol en montgolfière au lever du soleil au-dessus de la palmeraie de Marrakech avec vue panoramique sur les montagnes de l'Atlas.",
      es: "Vuelo en globo al amanecer sobre el palmeral de Marrakech con vistas panorámicas de la cordillera del Atlas.",
    },
    longDescription: {
      en: "Drift silently into the morning sky as the sun rises over the snow-dusted peaks of the High Atlas Mountains and illuminates the terracotta villages, desert hills, and palm groves surrounding Marrakech. Picked up by 4x4 before dawn, watch the balloons inflate over welcome coffee and tea, enjoy a serene one-hour flight in the golden morning light, and celebrate upon landing with a freshly prepared traditional Berber breakfast and your official flight certificate.",
      fr: "Élevez-vous en douceur dans le ciel de Marrakech tandis que le soleil se lève derrière les sommets du Haut Atlas. Après votre transfert matinal en 4x4 et un café d'accueil face au gonflage des ballons, profitez d'environ une heure de vol panoramique dans la lumière dorée de l'aube au-dessus des villages berbères et de la palmeraie, suivi d'un petit-déjeuner berbère traditionnel sous tente et de la remise de votre certificat de vol.",
      es: "Elévese suavemente en el cielo de Marrakech mientras el sol amanece sobre las cumbres del Alto Atlas. Tras la recogida en 4x4 antes del alba y un té de bienvenida durante el inflado de los globos, disfrute de una hora de vuelo panorámico bajo la luz dorada de la mañana sobre aldeas bereberes y palmerales, seguido de un desayuno tradicional bereber al aterrizar y la entrega de su certificado de vuelo.",
    },
    highlights: {
      en: [
        "1-hour sunrise hot air balloon flight facing the High Atlas Mountains",
        "Pre-flight coffee & tea while watching the balloon inflation",
        "Fresh traditional Berber breakfast & commemorative flight certificate",
      ],
      fr: [
        "Vol d'environ 1 heure au lever du soleil face aux sommets de l'Atlas",
        "Thé et café d'accueil pendant la préparation des montgolfières",
        "Petit-déjeuner berbère traditionnel et certificat de vol",
      ],
      es: [
        "Vuelo de 1 hora al amanecer frente a la cordillera del Alto Atlas",
        "Café y té de bienvenida durante el inflado de los globos",
        "Desayuno tradicional bereber y certificado conmemorativo de vuelo",
      ],
    },
    included: {
      en: [
        "Early-morning 4x4 round-trip transfer (5:00 AM – 8:30 AM)",
        "Sunrise balloon flight with certified pilot",
        "Full Berber breakfast after landing",
      ],
      fr: [
        "Transfert aller-retour en 4x4 tôt le matin (05h00 – 08h30)",
        "Vol en montgolfière au lever du soleil avec pilote certifié",
        "Petit-déjeuner berbère complet après l'atterrissage",
      ],
      es: [
        "Traslado de ida y vuelta en 4x4 al amanecer (5:00 AM – 8:30 AM)",
        "Vuelo en globo al amanecer con piloto certificado",
        "Desayuno bereber completo tras el aterrizaje",
      ],
    },
    image: "/images/excursion/hot-air-balloon.jpg",
  },
  {
    id: "exc-ouzoud",
    slug: "ouzoud",
    name: {
      en: "Ouzoud Waterfalls (Cascades d'Ouzoud)",
      fr: "Cascades d'Ouzoud",
      es: "Cascadas de Ouzoud (Cascades d'Ouzoud)",
    },
    schedule: {
      en: "Breakfast at 7:30 AM | Departure at 8:00 AM | Return at 6:00 PM",
      fr: "Petit-déjeuner à 07h30 | Départ à 08h00 | Retour à 18h00",
      es: "Desayuno 7:30 AM | Salida 8:00 AM | Regreso 6:00 PM",
    },
    pricingMode: "group_or_private",
    groupPriceEur: 25,
    privatePriceEur: 130,
    priceDisplay: {
      en: "25 € / person (Group) | 130 € (Private)",
      fr: "25 € / pers. (Groupe) | 130 € (Privé)",
      es: "25 € / persona (Grupo) | 130 € (Privado)",
    },
    description: {
      en: "Day trip to the 110m Ouzoud waterfalls, featuring scenic hiking paths, boat rides near the falls, riverside restaurants, and wild Barbary macaques.",
      fr: "Excursion aux cascades d'Ouzoud (110 m), avec sentiers de randonnée, barques au pied des chutes, restaurants au bord de l'eau et singes magots en liberté.",
      es: "Excursión de un día a las cascadas de Ouzoud de 110 m de altura, con senderos naturales, paseos en barca, restaurantes junto al río y monos de Berbería en libertad.",
    },
    longDescription: {
      en: "After an early 7:30 AM breakfast served at Riad Sidi Ayoub, depart at 8:00 AM for one of North Africa's most breathtaking natural wonders: the 110-meter tiered Ouzoud Waterfalls. Surrounded by ancient olive groves and red cliffs, follow shaded footpaths down to the natural pools at the base of the falls, cross the spray on a painted wooden raft, spot wild Barbary macaques in the trees, and enjoy a leisurely tagine lunch on a terrace overlooking the cascading water.",
      fr: "Après un petit-déjeuner anticipé servi à 07h30 au Riad Sidi Ayoub, partez à 08h00 vers l'un des sites naturels les plus spectaculaires du Maroc : les cascades d'Ouzoud et leurs chutes d'eau de 110 mètres. Promenez-vous à l'ombre des oliviers centenaires jusqu'aux bassins naturels, observez les singes magots sauvages dans leur habitat naturel et déjeunez au bord de l'eau face aux cascades avant le retour à 18h00.",
      es: "Tras disfrutar de un desayuno temprano a las 7:30 AM en Riad Sidi Ayoub, salga a las 8:00 AM hacia una de las maravillas naturales más espectaculares de Marruecos: las Cascadas de Ouzoud, con 110 metros de caída entre olivos centenarios. Recorra los senderos panorámicos hasta las pozas naturales, observe a los simpáticos monos de Berbería en libertad y almuerce en una terraza frente a las cataratas antes de regresar a las 6:00 PM.",
    },
    highlights: {
      en: [
        "Spectacular 110-meter multi-tiered waterfalls & permanent rainbow mist",
        "Wild Barbary macaque monkeys roaming the shaded olive-tree trails",
        "Scenic riverside terraces for lunch & optional boat ride at the falls' base",
      ],
      fr: [
        "Chutes d'eau spectaculaires de 110 mètres au cœur d'une vallée d'oliviers",
        "Rencontre avec les singes magots en liberté le long des sentiers",
        "Restaurants panoramiques au bord de l'eau et barques au pied des cascades",
      ],
      es: [
        "Espectaculares cataratas de 110 metros rodeadas de olivos y naturaleza",
        "Avistamiento de monos macacos de Berbería en libertad",
        "Terrazas junto al agua para almorzar y paseo opcional en barca",
      ],
    },
    included: {
      en: [
        "Early 7:30 AM breakfast served at Riad Sidi Ayoub before departure",
        "Round-trip air-conditioned transport (8:00 AM – 6:00 PM)",
        "Group (25 € / person) or Private vehicle (130 €) options",
      ],
      fr: [
        "Petit-déjeuner anticipé servi à 07h30 au Riad Sidi Ayoub",
        "Transport climatisé aller-retour (08h00 – 18h00)",
        "Choix entre formule Groupe (25 € / pers.) ou Privée (130 €)",
      ],
      es: [
        "Desayuno temprano servido a las 7:30 AM en Riad Sidi Ayoub",
        "Transporte climatizado de ida y vuelta (8:00 AM – 6:00 PM)",
        "Disponible en modalidad Grupo (25 € / pers.) o Privado (130 €)",
      ],
    },
    image: "/images/excursion/ouzoud.jpg",
  },
  {
    id: "exc-essaouira",
    slug: "essaouira",
    name: {
      en: "Essaouira",
      fr: "Essaouira",
      es: "Essaouira (Costa Atlántica)",
    },
    schedule: {
      en: "Breakfast at 7:30 AM | Departure at 8:00 AM | Return at 6:00 PM",
      fr: "Petit-déjeuner à 07h30 | Départ à 08h00 | Retour à 18h00",
      es: "Desayuno 7:30 AM | Salida 8:00 AM | Regreso 6:00 PM",
    },
    pricingMode: "group_or_private",
    groupPriceEur: 25,
    privatePriceEur: 150,
    priceDisplay: {
      en: "25 € / person (Group) | 150 € (Private)",
      fr: "25 € / pers. (Groupe) | 150 € (Privé)",
      es: "25 € / persona (Grupo) | 150 € (Privado)",
    },
    description: {
      en: "Coastal escape to the historic Atlantic port city of Essaouira, known for its historic medina ramparts, blue fishing harbor, and fresh ocean breeze.",
      fr: "Escapade côtière vers la cité portuaire d'Essaouira sur l'Atlantique, réputée pour les remparts de sa médina, son port aux barques bleues et sa brise océane.",
      es: "Escapada costera a la histórica ciudad portuaria atlántica de Essaouira, famosa por las murallas de su medina, su puerto de barcas azules y su brisa marina.",
    },
    longDescription: {
      en: "Trade the warmth of Marrakech for the refreshing Atlantic breeze of Essaouira, Morocco's beloved coastal jewel. After an early 7:30 AM Riad breakfast and 8:00 AM departure, travel west through argan tree forests—pausing at a traditional women's argan oil cooperative—before arriving at Essaouira's 18th-century sea ramparts (Sqala). Stroll at your own pace through the blue-and-white UNESCO Medina, watch fishermen bring in the day's catch at the blue-boat harbor, savor freshly grilled seafood by the port, and walk along the wide sandy beach.",
      fr: "Offrez-vous une bouffée d'air marin sur la côte atlantique à Essaouira, l'ancienne Mogador. Après votre petit-déjeuner à 07h30 au Riad et un départ à 08h00, traversez la région des arganiers avec un arrêt dans une coopérative féminine d'huile d'argan. Flânez librement sur les remparts historiques de la Sqala face à l'océan, admirez le port de pêche et ses célèbres barques bleues, dégustez des poissons grillés frais et explorez les ruelles blanches et bleues de la médina classée à l'UNESCO.",
      es: "Cambie el calor de Marrakech por la brisa atlántica de Essaouira, la joya costera de Marruecos. Tras desayunar a las 7:30 AM en el Riad y salir a las 8:00 AM, recorra los bosques de argán con parada en una cooperativa femenina tradicional. Pasee a su ritmo por las murallas marinas de la Sqala, contemple las icónicas barcas azules del puerto pesquero, saboree pescado fresco a la parrilla junto al mar y explore la luminosa medina blanca y azul declarada Patrimonio de la Humanidad.",
    },
    highlights: {
      en: [
        "18th-century Sqala sea ramparts, bronze cannons & iconic blue fishing port",
        "UNESCO-listed white-and-blue Medina, art galleries & thuya wood workshops",
        "Stop at a traditional women's Argan oil cooperative en route",
      ],
      fr: [
        "Remparts historiques de la Sqala, canons face à l'océan et port aux barques bleues",
        "Médina UNESCO blanche et bleue, ateliers de bois de thuya et plage océane",
        "Visite d'une coopérative féminine d'huile d'argan sur la route",
      ],
      es: [
        "Murallas históricas de la Sqala frente al Atlántico y puerto de barcas azules",
        "Medina blanca y azul Patrimonio de la UNESCO, artesanía en madera de tuya y playa",
        "Parada en el camino en una cooperativa femenina de aceite de argán",
      ],
    },
    included: {
      en: [
        "Early 7:30 AM breakfast at Riad Sidi Ayoub prior to 8:00 AM departure",
        "Round-trip air-conditioned transport returning at 6:00 PM",
        "Free time to explore Essaouira's port, Medina & beach at your own pace",
      ],
      fr: [
        "Petit-déjeuner anticipé à 07h30 au Riad Sidi Ayoub avant le départ à 08h00",
        "Transport climatisé aller-retour avec retour à 18h00",
        "Temps libre pour explorer le port, la médina et la plage à votre rythme",
      ],
      es: [
        "Desayuno temprano a las 7:30 AM en Riad Sidi Ayoub antes de salir a las 8:00 AM",
        "Transporte climatizado de ida y vuelta con regreso a las 6:00 PM",
        "Tiempo libre para disfrutar del puerto, la medina y la playa a su ritmo",
      ],
    },
    image: "/images/excursion/essaouira.jpg",
  },
  {
    id: "exc-three-valleys",
    slug: "three-valleys",
    name: {
      en: "Three Valleys (Les Trois Vallées)",
      fr: "Les Trois Vallées",
      es: "Los Tres Valles (Les Trois Vallées)",
    },
    schedule: {
      en: "Full-Day Private Tour • Flexible Morning Departure",
      fr: "Excursion Privée à la Journée • Départ matinal flexible",
      es: "Tour Privado de Día Completo • Salida matutina flexible",
    },
    pricingMode: "private_only",
    privatePriceEur: 120,
    priceDisplay: {
      en: "120 € (Private Only)",
      fr: "120 € (Privé Uniquement)",
      es: "120 € (Solo Privado)",
    },
    description: {
      en: "Bespoke private tour through the Atlas foothills and valleys, showcasing traditional Berber villages and mountain scenery.",
      fr: "Excursion privée sur mesure à travers les contreforts et vallées de l'Atlas, à la découverte des villages berbères traditionnels et paysages de montagne.",
      es: "Recorrido privado a medida por las colinas y valles del Atlas, descubriendo pueblos bereberes tradicionales y paisajes de montaña.",
    },
    longDescription: {
      en: "Reserved exclusively for your party, our Private Three Valleys Tour takes you off the beaten path into the heart of the High Atlas Mountains. Travel in your own private vehicle across three contrasting landscapes—the lush terraced orchards of the Ourika & Oukaimeden foothills, the mountain passes of Asni & Moulay Brahim looking toward Mount Toubkal, and the dramatic high-altitude Kik Plateau overlooking Lake Lalla Takerkoust—stopping whenever you wish for photographs, village walks, or mint tea.",
      fr: "Réservée exclusivement à votre groupe, l'excursion privée des Trois Vallées vous emmène hors des sentiers battus au cœur des montagnes du Haut Atlas. À bord de votre véhicule privé avec chauffeur dédié, traversez trois paysages contrastés — les vergers en terrasses, les vallées d'Asni face au mont Toubkal et le spectaculaire plateau du Kik surplombant le lac Lalla Takerkoust — en vous arrêtant à votre guise dans les villages berbères.",
      es: "Reservado exclusivamente para usted y sus acompañantes, el Tour Privado de los Tres Valles le lleva fuera de las rutas habituales hacia el corazón del Alto Atlas. En su vehículo privado con conductor dedicado, recorra tres paisajes fascinantes —los valles verdes en terrazas, las montañas de Asni frente al monte Toubkal y la meseta del Kik con vistas al lago Lalla Takerkoust—, deteniéndose cuando desee para fotografiar o pasear por aldeas bereberes.",
    },
    highlights: {
      en: [
        "100% private vehicle & dedicated driver tailored to your pace",
        "Panoramic High Atlas routes: Ourika foothills, Asni valley & Kik Plateau",
        "Authentic Adobe Berber villages, terraced orchards & Lake Lalla Takerkoust views",
      ],
      fr: [
        "Véhicule 100% privé avec chauffeur dédié à votre rythme",
        "Routes panoramiques du Haut Atlas : vallées verdoyantes, Asni et plateau du Kik",
        "Villages berbères authentiques en pisé et vue sur le lac Lalla Takerkoust",
      ],
      es: [
        "Vehículo 100% privado con conductor dedicado a su propio ritmo",
        "Rutas panorámicas del Alto Atlas: valles verdes, Asni y meseta del Kik",
        "Auténticos pueblos bereberes y vistas sobre el lago Lalla Takerkoust",
      ],
    },
    included: {
      en: [
        "Private air-conditioned vehicle & driver for the entire day (120 € total)",
        "Door-to-door pickup and return at Riad Sidi Ayoub",
        "Flexible itinerary & photo stops throughout the Atlas valleys",
      ],
      fr: [
        "Véhicule privé climatisé avec chauffeur pour toute la journée (120 € au total)",
        "Prise en charge aller-retour au Riad Sidi Ayoub",
        "Itinéraire flexible et arrêts photos à la demande",
      ],
      es: [
        "Vehículo privado climatizado con conductor todo el día (120 € en total)",
        "Recogida y regreso directamente en Riad Sidi Ayoub",
        "Itinerario flexible y paradas fotográficas a petición",
      ],
    },
    image: "/images/excursion/three-valleys.jpg",
  },
  {
    id: "exc-agafay",
    slug: "agafay",
    name: {
      en: "Agafay Desert",
      fr: "Désert d'Agafay",
      es: "Desierto de Agafay",
    },
    schedule: {
      en: "2:00 PM to 9:00 PM",
      fr: "14h00 à 21h00",
      es: "2:00 PM a 9:00 PM",
    },
    pricingMode: "per_person",
    groupPriceEur: 50,
    priceDisplay: {
      en: "50 € / person",
      fr: "50 € / personne",
      es: "50 € / persona",
    },
    description: {
      en: "Afternoon and evening desert experience in Agafay featuring quads, camels, Gnaoua music, dinner under the stars, and an evening show.",
      fr: "Expérience d'après-midi et soirée dans le désert d'Agafay incluant quads, chameaux, musique Gnaoua, dîner sous les étoiles et spectacle nocturne.",
      es: "Experiencia de tarde y noche en el desierto rocoso de Agafay con quads, paseo en camello, música Gnaoua, cena bajo las estrellas y espectáculo nocturno.",
    },
    longDescription: {
      en: "Just 45 minutes from Marrakech lies the moon-like rocky expanse of the Agafay Desert, framed by the High Atlas peaks. Departing at 2:00 PM, enjoy an all-in-one afternoon and evening adventure: ride quads across the desert trails, take a golden-hour camel trek dressed in traditional Saharan attire, sip welcome mint tea to the rhythms of live Gnaoua musicians, and gather at a lantern-lit desert camp for a freshly prepared Moroccan dinner and fire show under the stars.",
      fr: "À seulement 45 minutes de Marrakech s'étend le désert minéral d'Agafay et ses collines blondes face aux sommets de l'Atlas. Au départ à 14h00, vivez une expérience complète jusqu'à la nuit tombée : randonnée en quad sur les pistes du désert, balade à dos de dromadaire au coucher du soleil, thé à la menthe au son de la musique Gnaoua, puis dîner marocain aux lanternes suivi d'un spectacle de feu sous les étoiles.",
      es: "A solo 45 minutos de Marrakech se extiende el paisaje lunar del desierto rocoso de Agafay frente a las cumbres del Atlas. Saliendo a las 2:00 PM, viva una experiencia completa de tarde y noche: ruta en quad por las pistas del desierto, paseo en camello al atardecer, té de bienvenida con música Gnaoua en vivo, y una cena tradicional marroquí iluminada por faroles seguida de un espectáculo de fuego bajo las estrellas.",
    },
    highlights: {
      en: [
        "Quad biking adventure & sunset camel trek across the Agafay hills",
        "Authentic Gnaoua live music & desert camp sunset hospitality",
        "Starlit traditional Moroccan dinner & evening fire show",
      ],
      fr: [
        "Session de Quad et balade à dos de dromadaire au coucher du soleil",
        "Musique Gnaoua en direct et accueil au campement du désert",
        "Dîner marocain sous les étoiles et spectacle nocturne de feu",
      ],
      es: [
        "Ruta en Quad y paseo en camello al atardecer por las colinas de Agafay",
        "Música tradicional Gnaoua en vivo y bienvenida en el campamento",
        "Cena marroquí bajo las estrellas y espectáculo nocturno con fuego",
      ],
    },
    included: {
      en: [
        "Round-trip transport from Riad Sidi Ayoub (2:00 PM – 9:00 PM)",
        "Quad session, sunset camel ride & all equipment",
        "Full Moroccan dinner, mint tea, Gnaoua music & evening show",
      ],
      fr: [
        "Transport aller-retour depuis le Riad Sidi Ayoub (14h00 – 21h00)",
        "Balade en quad, tour à dos de chameau et équipement complet",
        "Dîner marocain complet, thé, musique Gnaoua et spectacle du soir",
      ],
      es: [
        "Transporte de ida y vuelta desde Riad Sidi Ayoub (2:00 PM – 9:00 PM)",
        "Excursión en quad, paseo en camello y equipamiento incluido",
        "Cena marroquí completa, té, música Gnaoua y espectáculo nocturno",
      ],
    },
    image: "/images/excursion/agafay.jpg",
  },
  {
    id: "exc-ourika",
    slug: "ourika",
    name: {
      en: "Ourika Valley",
      fr: "Vallée de l'Ourika",
      es: "Valle del Ourika",
    },
    schedule: {
      en: "9:00 AM to 4:00 PM",
      fr: "09h00 à 16h00",
      es: "9:00 AM a 4:00 PM",
    },
    pricingMode: "group_or_private",
    groupPriceEur: 20,
    privatePriceEur: 100,
    priceDisplay: {
      en: "20 € / person (Group) | 100 € (Private)",
      fr: "20 € / pers. (Groupe) | 100 € (Privé)",
      es: "20 € / persona (Grupo) | 100 € (Privado)",
    },
    description: {
      en: "Relaxing day trip along the Ourika River in the Atlas foothills with traditional Berber villages and mountain views.",
      fr: "Excursion relaxante le long de la rivière de l'Ourika au pied de l'Atlas, avec villages berbères traditionnels et vues sur les montagnes.",
      es: "Relajante excursión de un día junto al río Ourika en las faldas del Atlas, visitando pueblos bereberes tradicionales y paisajes de montaña.",
    },
    longDescription: {
      en: "Enjoy a leisurely 8:00 AM breakfast at Riad Sidi Ayoub before departing at 9:00 AM for the lush green oasis of the Ourika Valley, nestled in the foothills of the High Atlas Mountains. Follow the crystal-clear Ourika River past terraced fruit orchards and hillside adobe Berber villages to Setti Fatma, where you can walk to the refreshing mountain cascades and relax on colorful Berber carpets and cushions right beside the rushing river stream.",
      fr: "Prenez tranquillement votre petit-déjeuner à 08h00 au Riad Sidi Ayoub avant de partir à 09h00 vers la fraîcheur verdoyante de la vallée de l'Ourika, au pied du Haut Atlas. Longez les eaux vives de la rivière Ourika à travers les vergers en terrasses et les villages berbères perchés jusqu'à Setti Fatma, où vous pourrez marcher jusqu'aux cascades et vous détendre sur les salons berbères installés directement au bord de l'eau avant le retour à 16h00.",
      es: "Disfrute sin prisas de su desayuno a las 8:00 AM en Riad Sidi Ayoub antes de partir a las 9:00 AM hacia el verde oasis del Valle del Ourika, a los pies del Alto Atlas. Siga el curso cristalino del río Ourika entre huertos en terrazas y aldeas bereberes de adobe hasta Setti Fatma, donde podrá caminar hacia las cascadas de montaña y relajarse sobre alfombras y cojines bereberes junto al río antes de regresar a las 4:00 PM.",
    },
    highlights: {
      en: [
        "Crystal-clear Ourika River lined with traditional Berber carpet lounges",
        "Hillside red-earth Berber villages & terraced High Atlas orchards",
        "Guided walk to the Setti Fatma mountain waterfalls & riverside lunch options",
      ],
      fr: [
        "Rivière fraîche de l'Ourika bordée de salons berbères traditionnels au fil de l'eau",
        "Villages berbères authentiques à flanc de montagne et vergers en terrasses",
        "Promenade vers les cascades de Setti Fatma et déjeuner possible au bord de l'eau",
      ],
      es: [
        "Río cristalino del Ourika con tradicionales zonas de descanso bereberes junto al agua",
        "Pueblos bereberes tradicionales en las laderas del Alto Atlas",
        "Paseo hasta las cascadas de Setti Fatma y restaurantes junto al río",
      ],
    },
    included: {
      en: [
        "Comfortable 9:00 AM departure after your regular Riad breakfast",
        "Round-trip air-conditioned transport returning around 4:00 PM",
        "Choice of Group tour (20 € / person) or Private vehicle (100 €)",
      ],
      fr: [
        "Départ confortable à 09h00 après votre petit-déjeuner habituel au Riad",
        "Transport climatisé aller-retour avec retour vers 16h00",
        "Disponible en formule Groupe (20 € / pers.) ou Privée (100 €)",
      ],
      es: [
        "Salida cómoda a las 9:00 AM tras su desayuno habitual en el Riad",
        "Transporte climatizado de ida y vuelta con regreso a las 4:00 PM",
        "Disponible en modalidad Grupo (20 € / pers.) o Privado (100 €)",
      ],
    },
    image: "/images/excursion/ourika.jpg",
  },
  {
    id: "exc-palmeraie-camel",
    slug: "palmeraie-camel",
    name: {
      en: "Palmeraie Camel Ride",
      fr: "Balade à Chameau dans la Palmeraie",
      es: "Paseo en Camello por el Palmeral",
    },
    schedule: {
      en: "Flexible Daily Departures (1 Hour)",
      fr: "Départs quotidiens flexibles (1 Heure)",
      es: "Salidas diarias flexibles (1 Hora)",
    },
    pricingMode: "per_hour",
    hourlyPriceEur: 30,
    priceDisplay: {
      en: "30 € / hour",
      fr: "30 € / heure",
      es: "30 € / hora",
    },
    description: {
      en: "Peaceful camel ride through the historic palm groves of Marrakech.",
      fr: "Balade paisible à dos de chameau à travers l'historique palmeraie de Marrakech.",
      es: "Tranquilo paseo en camello por el histórico palmeral de Marrakech.",
    },
    longDescription: {
      en: "Enjoy a peaceful escape just outside the Medina walls in Marrakech's historic Palmeraie oasis, home to tens of thousands of palm trees planted during the Almoravid dynasty. Wearing a traditional Saharan headscarf (cheich), ride along quiet sandy paths shaded by date palms with views toward the Atlas peaks, and pause for a welcoming glass of Moroccan mint tea.",
      fr: "Évadez-vous à quelques minutes de la Médina au cœur de l'historique Palmeraie de Marrakech et ses milliers de palmiers centenaires. Coiffé du chèche saharien traditionnel, cheminez paisiblement à dos de dromadaire sur les sentiers sablonneux à l'ombre des palmiers, avec une pause conviviale autour d'un verre de thé à la menthe.",
      es: "Disfrute de un paseo tranquilo a pocos minutos de la Medina en el histórico Palmeral de Marrakech, rodeado de miles de palmeras centenarias. Ataviado con el tradicional pañuelo sahariano (cheich), recorra los senderos de arena a la sombra de las palmeras y disfrute de una pausa con té a la menta tradicional.",
    },
    highlights: {
      en: [
        "1-hour guided camel ride through Marrakech's historic palm oasis",
        "Traditional Saharan headscarf (cheich) & Moroccan mint tea break",
        "Flexible morning or golden-hour afternoon departure times",
      ],
      fr: [
        "Balade guidée d'une heure au cœur de la Palmeraie de Marrakech",
        "Chèche traditionnel fourni et pause thé à la menthe",
        "Horaires flexibles le matin ou en fin d'après-midi",
      ],
      es: [
        "Paseo guiado de 1 hora en camello por el Palmeral de Marrakech",
        "Pañuelo tradicional sahariano (cheich) y pausa para té a la menta",
        "Horarios flexibles por la mañana o al atardecer",
      ],
    },
    included: {
      en: [
        "Round-trip transfer between Riad Sidi Ayoub and the Palmeraie",
        "1-hour camel ride with experienced handler (30 € / hour)",
        "Mint tea hospitality stop",
      ],
      fr: [
        "Transfert aller-retour entre le Riad Sidi Ayoub et la Palmeraie",
        "Balade d'une heure à dos de dromadaire avec guide (30 € / heure)",
        "Pause thé à la menthe incluse",
      ],
      es: [
        "Traslado de ida y vuelta entre Riad Sidi Ayoub y el Palmeral",
        "Paseo de 1 hora en camello con guía (30 € / hora)",
        "Pausa con té a la menta incluida",
      ],
    },
    image: "/images/excursion/palmeraie-camel.jpg",
  },
];

export const uiTranslations = {
  en: {
    riadName: "Riad Sidi Ayoub",
    citySubtitle: "Marrakech • Digital Concierge",
    heroTitle: "Quiet Hospitality in the Heart of Marrakech",
    heroSubtitle:
      "Explore our homemade Moroccan menus, traditional Hammam & massage treatments, and private or shared excursions. Reserve effortlessly via WhatsApp.",
    tabMenu: "Dining & Menu",
    tabWellness: "Hammam & Massage",
    tabExcursions: "Excursions",
    backToConcierge: "Back to Concierge Overview",
    viewDetailsBtn: "View Details",
    rulesBoxTitle: "Dining Schedule & Advance Booking Rules",
    breakfastLabel: "Breakfast",
    breakfastTime: "8:00 AM – 10:00 AM",
    breakfastText:
      "Served daily between 8:00 AM and 10:00 AM (Early breakfast available at 7:30 AM for guests departing on morning excursions).",
    dinnerLabel: "Dinner",
    dinnerTime: "6:00 PM – 8:00 PM",
    dinnerText: "Served daily between 6:00 PM and 8:00 PM.",
    advanceOrderLabel: "Advance Booking Rule",
    advanceOrderBadge: "Before 12:00 PM (Noon)",
    advanceOrderText:
      "Dinner must be booked before 12:00 PM (noon) so our kitchen can prepare fresh ingredients for the evening.",
    menuSectionTitle: "Dining & Menu",
    menuSectionSubtitle:
      "Prepared fresh daily in our Riad kitchen. Select a 3-course menu formula or individual refreshments below.",
    menu1Title: "Menu 1 — 190 MAD",
    menu1Subtitle: "Starter + Main Course + Dessert",
    menu1Desc:
      "Includes your choice of 1 Starter, 1 Main Course from our 10 traditional recipes, and 1 Dessert.",
    menu2Title: "Menu 2 — 320 MAD",
    menu2Subtitle: "Starter + Signature Main + Dessert",
    menu2Desc:
      "Includes your choice of 1 Starter, 1 Signature Main Course (Pastilla or Tanjia Marrakchia), and 1 Dessert.",
    startersTitle: "Starters (Entrées)",
    startersNote: "Included in Menu 1 (190 MAD) & Menu 2 (320 MAD)",
    mains1Title: "Main Courses — Menu 1 (190 MAD)",
    mains1Note: "Includes choice of Starter and Dessert",
    mains2Title: "Signature Main Courses — Menu 2 (320 MAD)",
    mains2Note: "Includes choice of Starter and Dessert",
    dessertsTitle: "Desserts",
    dessertsNote: "Included in Menu 1 (190 MAD) & Menu 2 (320 MAD)",
    drinksTitle: "Drinks (Boissons)",
    drinksNote: "Served throughout the day in the courtyard patio or terrace",
    bookBtn: "Book",
    wellnessSectionTitle: "Hammam & Massage",
    wellnessSectionSubtitle:
      "Return from the bustle of the Medina souks to the calm sanctuary of Riad Sidi Ayoub.",
    wellnessRuleText:
      "Advance Booking Rule: Must be booked at least 1 day in advance.",
    comboBadge: "Signature Wellness Offer • Save 50 MAD",
    comboBookCta: "Book Hammam + Massage Pack — 350 MAD",
    excursionsSectionTitle: "Excursions & Experiences",
    excursionsSectionSubtitle:
      "Curated day trips, desert expeditions, and evening experiences departing from the Riad.",
    timeLabel: "Schedule",
    highlightsTitle: "Experience Highlights",
    includedTitle: "What Is Included",
    otherExcursionsTitle: "Explore All Excursions",
    otherWellnessTitle: "Explore All Wellness Rituals",
    modalTitle: "Direct WhatsApp Reservation",
    modalItemLabel: "Selected Item",
    modalChooseStarter: "Starter (Entrée)",
    modalChooseMain: "Main Course (Plat)",
    modalChooseDessert: "Dessert",
    modalTourFormat: "Experience Option",
    modalGroup: "Group",
    modalPrivate: "Private",
    modalHours: "Duration (Hours)",
    modalName: "Guest Name",
    modalNamePlaceholder: "Your full name",
    modalRoom: "Room Number",
    modalRoomPlaceholder: "e.g. Room 3",
    modalDate: "Preferred Date",
    modalTime: "Preferred Time",
    modalGuests: "Number of Guests",
    modalNotes: "Special Requests (Optional)",
    modalNotesPlaceholder: "Dietary preferences, notes...",
    modalTotal: "Total",
    modalDinnerReminder:
      "Reminder: Dinner must be booked before 12:00 PM (noon). Served daily from 6:00 PM to 8:00 PM.",
    modalWellnessReminder:
      "Reminder: Hammam and Massage treatments must be booked at least 1 day in advance.",
    modalExcursionReminder:
      "Early breakfast is available at 7:30 AM for morning excursions (takeaway breakfast at 7:00 AM for Ouarzazate).",
    modalSubmit: "Confirm & Book via WhatsApp",
    modalCancel: "Cancel",
  },
  fr: {
    riadName: "Riad Sidi Ayoub",
    citySubtitle: "Marrakech • Conciergerie Digitale",
    heroTitle: "L'Élégance Discrète au Cœur de Marrakech",
    heroSubtitle:
      "Découvrez nos menus marocains faits maison, nos soins traditionnels Hammam & massage, ainsi que nos excursions. Réservez simplement via WhatsApp.",
    tabMenu: "Restauration & Menu",
    tabWellness: "Hammam & Massage",
    tabExcursions: "Excursions",
    backToConcierge: "Retour à l'Accueil Conciergerie",
    viewDetailsBtn: "Voir les détails",
    rulesBoxTitle: "Horaires des Repas & Règles de Réservation",
    breakfastLabel: "Petit-déjeuner",
    breakfastTime: "08h00 – 10h00",
    breakfastText:
      "Servi tous les jours entre 08h00 et 10h00 (Petit-déjeuner anticipé disponible à 07h30 pour les départs en excursion matinale).",
    dinnerLabel: "Dîner",
    dinnerTime: "18h00 – 20h00",
    dinnerText: "Servi tous les jours entre 18h00 et 20h00.",
    advanceOrderLabel: "Règle de réservation",
    advanceOrderBadge: "Avant 12h00 (Midi)",
    advanceOrderText:
      "Le dîner doit être réservé avant 12h00 (midi) afin que notre cuisine puisse préparer des ingrédients frais pour le soir.",
    menuSectionTitle: "Restauration & Menu",
    menuSectionSubtitle:
      "Cuisine familiale préparée fraîchement chaque jour. Choisissez votre formule 3 plats ou vos boissons ci-dessous.",
    menu1Title: "Menu 1 — 190 MAD",
    menu1Subtitle: "Entrée + Plat + Dessert",
    menu1Desc:
      "Comprend 1 Entrée au choix, 1 Plat parmi nos 10 recettes traditionnelles et 1 Dessert au choix.",
    menu2Title: "Menu 2 — 320 MAD",
    menu2Subtitle: "Entrée + Plat Signature + Dessert",
    menu2Desc:
      "Comprend 1 Entrée au choix, 1 Plat Signature (Pastilla ou Tanjia Marrakchia) et 1 Dessert au choix.",
    startersTitle: "Entrées",
    startersNote: "Incluses dans le Menu 1 (190 MAD) et le Menu 2 (320 MAD)",
    mains1Title: "Plats — Menu 1 (190 MAD)",
    mains1Note: "Inclut une Entrée et un Dessert au choix",
    mains2Title: "Plats Signatures — Menu 2 (320 MAD)",
    mains2Note: "Inclut une Entrée et un Dessert au choix",
    dessertsTitle: "Desserts",
    dessertsNote: "Inclus dans le Menu 1 (190 MAD) et le Menu 2 (320 MAD)",
    drinksTitle: "Boissons",
    drinksNote: "Servies toute la journée dans le patio ou sur la terrasse",
    bookBtn: "Réserver",
    wellnessSectionTitle: "Hammam & Massage",
    wellnessSectionSubtitle:
      "Après l'effervescence des souks de la Médina, retrouvez la sérénité absolue du Riad Sidi Ayoub.",
    wellnessRuleText:
      "Règle de réservation : Doit être réservé au moins 1 jour à l'avance.",
    comboBadge: "Offre Signature Bien-Être • Économisez 50 MAD",
    comboBookCta: "Réserver le Pack Hammam + Massage — 350 MAD",
    excursionsSectionTitle: "Excursions & Expériences",
    excursionsSectionSubtitle:
      "Excursions à la journée, expéditions dans le désert et soirées au départ du Riad.",
    timeLabel: "Horaire",
    highlightsTitle: "Points Forts de l'Expérience",
    includedTitle: "Ce Qui Est Inclus",
    otherExcursionsTitle: "Découvrir Toutes Nos Excursions",
    otherWellnessTitle: "Découvrir Tous Nos Soins",
    modalTitle: "Réservation Directe via WhatsApp",
    modalItemLabel: "Sélection",
    modalChooseStarter: "Entrée",
    modalChooseMain: "Plat Principal",
    modalChooseDessert: "Dessert",
    modalTourFormat: "Formule",
    modalGroup: "Groupe",
    modalPrivate: "Privé",
    modalHours: "Durée (Heures)",
    modalName: "Nom du client",
    modalNamePlaceholder: "Votre nom complet",
    modalRoom: "Numéro de chambre",
    modalRoomPlaceholder: "ex. Chambre 3",
    modalDate: "Date souhaitée",
    modalTime: "Heure souhaitée",
    modalGuests: "Nombre de personnes",
    modalNotes: "Demandes particulières (Optionnel)",
    modalNotesPlaceholder: "Préférences alimentaires, notes...",
    modalTotal: "Total",
    modalDinnerReminder:
      "Rappel : Le dîner doit être réservé avant 12h00 (midi). Servi tous les jours de 18h00 à 20h00.",
    modalWellnessReminder:
      "Rappel : Le Hammam et le massage doivent être réservés au moins 1 jour à l'avance.",
    modalExcursionReminder:
      "Un petit-déjeuner anticipé est disponible à 07h30 pour les excursions matinales (à emporter à 07h00 pour Ouarzazate).",
    modalSubmit: "Confirmer & Réserver sur WhatsApp",
    modalCancel: "Annuler",
  },
  es: {
    riadName: "Riad Sidi Ayoub",
    citySubtitle: "Marrakech • Conserjería Digital",
    heroTitle: "Hospitalidad Serena en el Corazón de Marrakech",
    heroSubtitle:
      "Explore nuestros menús marroquíes caseros, tratamientos tradicionales de Hammam y masaje, y excursiones seleccionadas. Reserve directamente por WhatsApp.",
    tabMenu: "Restaurante y Menú",
    tabWellness: "Hammam y Masaje",
    tabExcursions: "Excursiones",
    backToConcierge: "Volver al Inicio de Conserjería",
    viewDetailsBtn: "Ver detalles",
    rulesBoxTitle: "Horarios de Comidas y Normas de Reserva",
    breakfastLabel: "Desayuno",
    breakfastTime: "8:00 AM – 10:00 AM",
    breakfastText:
      "Servido todos los días entre las 8:00 AM y las 10:00 AM (Desayuno temprano disponible a las 7:30 AM para excursiones matutinas).",
    dinnerLabel: "Cena",
    dinnerTime: "6:00 PM – 8:00 PM",
    dinnerText: "Servida todos los días entre las 6:00 PM y las 8:00 PM.",
    advanceOrderLabel: "Norma de Reserva Anticipada",
    advanceOrderBadge: "Antes de las 12:00 PM (Mediodía)",
    advanceOrderText:
      "La cena debe reservarse antes de las 12:00 PM (mediodía) para que nuestra cocina pueda preparar ingredientes frescos para la noche.",
    menuSectionTitle: "Restaurante y Menú",
    menuSectionSubtitle:
      "Preparado fresco cada día en la cocina del Riad. Elija un menú de 3 platos o bebidas individuales a continuación.",
    menu1Title: "Menú 1 — 190 MAD",
    menu1Subtitle: "Entrante + Plato Principal + Postre",
    menu1Desc:
      "Incluye 1 Entrante a elegir, 1 Plato Principal entre nuestras 10 recetas tradicionales y 1 Postre.",
    menu2Title: "Menú 2 — 320 MAD",
    menu2Subtitle: "Entrante + Plato Especial + Postre",
    menu2Desc:
      "Incluye 1 Entrante a elegir, 1 Plato Especial de Autor (Pastela o Tanjia Marrakchia) y 1 Postre.",
    startersTitle: "Entrantes (Entrées)",
    startersNote: "Incluidos en el Menú 1 (190 MAD) y el Menú 2 (320 MAD)",
    mains1Title: "Platos Principales — Menú 1 (190 MAD)",
    mains1Note: "Incluye Entrante y Postre a elegir",
    mains2Title: "Platos Especiales — Menú 2 (320 MAD)",
    mains2Note: "Incluye Entrante y Postre a elegir",
    dessertsTitle: "Postres",
    dessertsNote: "Incluidos en el Menú 1 (190 MAD) y el Menú 2 (320 MAD)",
    drinksTitle: "Bebidas (Boissons)",
    drinksNote: "Servidas durante todo el día en el patio o en la terraza",
    bookBtn: "Reservar",
    wellnessSectionTitle: "Hammam y Masaje",
    wellnessSectionSubtitle:
      "Tras recorrer los zocos de la Medina, regrese a la calma absoluta de Riad Sidi Ayoub.",
    wellnessRuleText:
      "Norma de reserva: Debe reservarse con al menos 1 día de antelación.",
    comboBadge: "Oferta Especial Bienestar • Ahorre 50 MAD",
    comboBookCta: "Reservar Pack Hammam + Masaje — 350 MAD",
    excursionsSectionTitle: "Excursiones y Experiencias",
    excursionsSectionSubtitle:
      "Excursiones de un día, expediciones al desierto y veladas con salida desde el Riad.",
    timeLabel: "Horario",
    highlightsTitle: "Puntos Destacados",
    includedTitle: "Qué Está Incluido",
    otherExcursionsTitle: "Explorar Todas las Excursiones",
    otherWellnessTitle: "Explorar Todos los Rituales de Bienestar",
    modalTitle: "Reserva Directa por WhatsApp",
    modalItemLabel: "Selección",
    modalChooseStarter: "Entrante (Entrée)",
    modalChooseMain: "Plato Principal (Plat)",
    modalChooseDessert: "Postre (Dessert)",
    modalTourFormat: "Modalidad",
    modalGroup: "Grupo",
    modalPrivate: "Privado",
    modalHours: "Duración (Horas)",
    modalName: "Nombre del Huésped",
    modalNamePlaceholder: "Su nombre completo",
    modalRoom: "Número de Habitación",
    modalRoomPlaceholder: "ej. Habitación 3",
    modalDate: "Fecha Preferida",
    modalTime: "Hora Preferida",
    modalGuests: "Número de Personas",
    modalNotes: "Notas o Peticiones (Opcional)",
    modalNotesPlaceholder: "Alergias, preferencias...",
    modalTotal: "Total",
    modalDinnerReminder:
      "Recordatorio: La cena debe reservarse antes de las 12:00 PM (mediodía). Servida de 6:00 PM a 8:00 PM.",
    modalWellnessReminder:
      "Recordatorio: El Hammam y el masaje deben reservarse con al menos 1 día de antelación.",
    modalExcursionReminder:
      "Desayuno temprano disponible a las 7:30 AM para excursiones matutinas (para llevar a las 7:00 AM hacia Ouarzazate).",
    modalSubmit: "Confirmar y Reservar por WhatsApp",
    modalCancel: "Cancelar",
  },
};
