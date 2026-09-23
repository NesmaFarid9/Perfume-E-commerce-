import type {
  Product,
  ProductOption,
} from "@/features/products/types/product.types";

function volumeOption(price: number): ProductOption {
  return {
    id: "volume",
    name: "Select Volume",
    values: ["30 ml", "50 ml", "100 ml"],
    defaultValue: "100 ml",
    prices: {
      "30 ml": Math.round((price * 140) / 220),
      "50 ml": Math.round((price * 180) / 220),
      "100 ml": price,
    },
  };
}

export const mockProducts: Product[] = [
  {
    id: "fleur-de-lune",
    name: "Fleur de Lune",
    description: "A luminous floral composition of jasmine and white musk.",
    notes: "Floral / Jasmine & White Musk",
    price: 195,
    images: [
      "/images/products/fleur-de-lune.png",
      "/images/products/rose-absolute.png",
      "/images/products/santal-parchment-lifestyle.png",
      "/images/products/santal-parchment-box.png",
    ],
    category: "pure-extractions",
    scentFamily: "floral",
    occasion: "personal-use",
    options: [volumeOption(195)],
    scentAnatomy: {
      topNotes: "White Jasmine, Bergamot",
      heartNotes: "Orange Blossom, Peony",
      baseNotes: "White Musk, Soft Woods",
    },
  },
  {
    id: "santal-parchment",
    name: "Santal Parchment",
    description:
      "Santal Parchment wraps around the skin like vintage vellum paper. It opens with bright top notes, shifting to clean papyrus and warm, rich sandalwood that dry down into dry cardamom and amber.",
    notes: "Woody / Sandalwood & Cardamom",
    price: 220,
    images: [
      "/images/products/santal-parchment.png",
      "/images/products/santal-parchment-box.png",
      "/images/products/santal-parchment-lifestyle.png",
      "/images/products/santal-parchment-set.png",
    ],
    category: "pure-extractions",
    scentFamily: "woody",
    occasion: "evening",
    options: [
      {
        id: "volume",
        name: "Select Volume",
        values: ["30 ml", "50 ml", "100 ml"],
        defaultValue: "100 ml",
        prices: {
          "30 ml": 140,
          "50 ml": 180,
          "100 ml": 220,
        },
      },
    ],
    scentAnatomy: {
      topNotes: "Sicilian Bergamot, Pink Pepper",
      heartNotes: "Egyptian Jasmine Sambac, Papyrus",
      baseNotes: "West Indian Sandalwood, Cardamom, Amber",
    },
  },
  {
    id: "noir-cocoon",
    name: "Noir Cocoon",
    description: "An oriental blend of tobacco and amber.",
    notes: "Oriental / Tobacco & Amber",
    price: 240,
    images: ["/images/products/noir-cocoon.png",
      "/images/products/noir-cocoon.png",
      "/images/products/noir-cocoon.png",
      "/images/products/noir-cocoon.png",
    ],
    category: "private-reserve",
    scentFamily: "oriental",
    occasion: "wedding",
    options: [volumeOption(240)],
    scentAnatomy: {
      topNotes: "Tobacco Leaf, Spice",
      heartNotes: "Labdanum, Incense",
      baseNotes: "Amber, Dark Woods",
    },
  },
  {
    id: "sol-dor",
    name: "Sol d'Or",
    description: "A fresh coastal blend of bergamot and sea salt.",
    notes: "Fresh / Bergamot & Sea Salt",
    price: 185,
    images: ["/images/products/sol-dor.png",
      "/images/products/sol-dor.png",
      "/images/products/sol-dor.png",
      "/images/products/sol-dor.png"
    ],
    category: "pure-extractions",
    scentFamily: "fresh",
    occasion: "personal-use",
    options: [volumeOption(185)],
    scentAnatomy: {
      topNotes: "Bergamot, Sea Spray",
      heartNotes: "Neroli, Driftwood",
      baseNotes: "White Amber, Musk",
    },
  },
  {
    id: "atelier-oud",
    name: "Atelier Oud",
    description: "Rich oud deepened with saffron.",
    notes: "Woody / Rich Oud & Saffron",
    price: 310,
    images: ["/images/products/atelier-oud.png",
      "/images/products/atelier-oud.png",
      "/images/products/atelier-oud.png",
      "/images/products/atelier-oud.png"
    ],
    category: "atelier-oils",
    scentFamily: "woody",
    occasion: "gift-sets",
    options: [volumeOption(310)],
    scentAnatomy: {
      topNotes: "Saffron, Rose",
      heartNotes: "Oud, Patchouli",
      baseNotes: "Resin, Smoked Woods",
    },
  },
  {
    id: "rose-absolute",
    name: "Rose Absolute",
    description: "Damask rose balanced with cedar.",
    notes: "Floral / Damask Rose & Cedar",
    price: 205,
    images: ["/images/products/rose-absolute.png",
      "/images/products/rose-absolute.png",
      "/images/products/rose-absolute.png",
      "/images/products/rose-absolute.png"
    ],
    category: "private-reserve",
    scentFamily: "floral",
    occasion: "birthday",
    options: [volumeOption(205)],
    scentAnatomy: {
      topNotes: "Damask Rose, Pink Pepper",
      heartNotes: "Rose Absolute, Geranium",
      baseNotes: "Cedar, Soft Musk",
    },
  },
];
