export type PlanSlug = "calm" | "fit" | "daily";

export interface Plan {
  slug: PlanSlug;
  name: string;
  tagline: string;
  eyebrow: string;
  number: string;
  accentColor: string;
  accentHex: string;
  bgColor: string;
  bgHex: string;
  perMealPrice: number;
  earlyBirdPerMeal: number;
  monthlyFull: number;
  monthlyEarlyBird: number;
  features: string[];
  imageAlt: string;
  imagePlaceholderDesc: string;
  sampleDishes: string[];
  forWho: string[];
  notForWho: string[];
  faqs: { q: string; a: string }[];
}

export const plans: Record<PlanSlug, Plan> = {
  calm: {
    slug: "calm",
    name: "fobox calm",
    tagline: "Meals that don't trigger your gut.",
    eyebrow: "PLAN 01 · FOR SENSITIVE STOMACHS",
    number: "01",
    accentColor: "text-mint",
    accentHex: "#2D6A4F",
    bgColor: "bg-calm-bg",
    bgHex: "#E8F0E5",
    perMealPrice: 398,
    earlyBirdPerMeal: 199,
    monthlyFull: 19900,
    monthlyEarlyBird: 9950,
    features: [
      "50 wholesome meals per month",
      "Hold any meal — no penalty",
      "No spice, no acid triggers",
      "Cancel anytime",
    ],
    imageAlt: "Khichdi with curd and sautéed vegetables",
    imagePlaceholderDesc: "khichdi · dahi · sautéed vegetables",
    sampleDishes: [
      "Moong dal khichdi",
      "Lauki sabzi",
      "Curd rice",
      "Bottle gourd soup",
      "Poha",
      "Yellow dal",
      "Idli sambar",
      "Masoor dal",
      "Vegetable upma",
      "Palak soup",
      "Soft roti",
      "Steamed rice",
    ],
    forWho: [
      "You have gastritis, IBS, or chronic acidity",
      "Spicy food regularly ruins your evenings",
      "You want real Indian food, not bland hospital food",
      "You travel often — hold meals when you're away",
    ],
    notForWho: [
      "You love spicy food and want to keep it",
      "You need precise macro tracking (see fobox fit)",
    ],
    faqs: [
      {
        q: "Will this food taste bland?",
        a: "No. We use cumin, coriander, mild ginger, and fresh herbs — flavour without the triggers. Mild is not tasteless.",
      },
      {
        q: "What if a dish doesn't agree with me?",
        a: "Let us know and we'll adjust your preferences.",
      },
      {
        q: "How does the hold facility work?",
        a: "You can hold up to 30 meals per month. No charge, no questions.",
      },
    ],
  },

  fit: {
    slug: "fit",
    name: "fobox fit",
    tagline: "Macros that make sense. Meals that deliver.",
    eyebrow: "PLAN 02 · FOR FITNESS GOALS",
    number: "02",
    accentColor: "text-saffron",
    accentHex: "#D17A22",
    bgColor: "bg-fit-bg",
    bgHex: "#F5E4D0",
    perMealPrice: 398,
    earlyBirdPerMeal: 199,
    monthlyFull: 19900,
    monthlyEarlyBird: 9950,
    features: [
      "50 wholesome meals per month",
      "Hold any meal — no penalty",
      "High-protein, macro-tracked",
      "Calorie count on every box",
      "Cancel anytime",
    ],
    imageAlt: "Paneer, quinoa and greens with macro label",
    imagePlaceholderDesc: "paneer · quinoa · greens · PROTEIN: 32g",
    sampleDishes: [
      "Paneer tikka",
      "Quinoa bowl",
      "Sautéed broccoli",
      "Sprouts salad",
      "Palak paneer",
      "Rajma",
      "Brown rice",
      "Paneer bhurji",
      "Lentil soup",
      "Tofu stir-fry",
      "Paneer keema",
      "Multigrain roti",
    ],
    forWho: [
      "You track macros and want consistent high-protein meals",
      "You're building muscle or losing fat systematically",
      "You want real Indian food — not protein bars and sad salads",
      "You travel often — hold meals when you're away",
    ],
    notForWho: [
      "You have a sensitive stomach (see fobox calm)",
      "You don't care about macros and want comfort food",
    ],
    faqs: [
      {
        q: "How are macros calculated?",
        a: "Each recipe is weighed and nutritionally analysed using standardised Indian food composition data. Variance is ±5%.",
      },
      {
        q: "How does the hold facility work?",
        a: "You can hold up to 30 meals per month. No charge, no questions.",
      },
      {
        q: "Can I switch from calm to fit later?",
        a: "Yes — plan changes are possible every quarter after launch.",
      },
    ],
  },

  daily: {
    slug: "daily",
    name: "fobox daily",
    tagline: "Real food. Every day. Like home.",
    eyebrow: "PLAN 03 · FOR EVERYDAY EATING",
    number: "03",
    accentColor: "text-turmeric",
    accentHex: "#E8A317",
    bgColor: "bg-daily-bg",
    bgHex: "#F9E8B8",
    perMealPrice: 238,
    earlyBirdPerMeal: 119,
    monthlyFull: 11900,
    monthlyEarlyBird: 5950,
    features: [
      "50 wholesome meals per month",
      "Hold any meal — no penalty",
      "Balanced home-style Indian cooking",
      "No preservatives, no concentrates",
      "Cancel anytime",
    ],
    imageAlt: "Dal, roti, sabzi and rice — classic home thali",
    imagePlaceholderDesc: "dal · roti · sabzi · rice · achar",
    sampleDishes: [
      "Rajma chawal",
      "Chole kulcha",
      "Dal tadka",
      "Palak paneer",
      "Aloo gobi",
      "Mix dal",
      "Baingan bharta",
      "Kadhi chawal",
      "Matar paneer",
      "Pav bhaji",
      "Dal makhani",
      "Laccha paratha",
    ],
    forWho: [
      "You want good home-style Indian food without cooking",
      "You're tired of Swiggy oiliness and want something clean",
      "You want variety — different meals every day",
      "You travel often — hold meals when you're away",
    ],
    notForWho: [
      "You have specific medical dietary needs (see fobox calm)",
      "You need precise macro tracking (see fobox fit)",
    ],
    faqs: [
      {
        q: "Is this completely preservative-free?",
        a: "Yes. No artificial preservatives, no concentrates, no stabilisers. Meals are prepared fresh and delivered same-day.",
      },
      {
        q: "How is this different from Eatfit or FreshMenu?",
        a: "fobox is Gurgaon-only. Smaller batches, fresher food, actual human beings handling your feedback.",
      },
      {
        q: "How does the hold facility work?",
        a: "You can hold up to 30 meals per month. No charge, no questions.",
      },
    ],
  },
};

export const gurgaonSectors = [
  "Sector 14", "Sector 15", "Sector 17", "Sector 18", "Sector 21", "Sector 22",
  "Sector 27", "Sector 28", "Sector 29", "Sector 31", "Sector 37", "Sector 38",
  "Sector 39", "Sector 40", "Sector 43", "Sector 44", "Sector 45", "Sector 46",
  "Sector 47", "Sector 48", "Sector 49", "Sector 50", "Sector 51", "Sector 52",
  "Sector 53", "Sector 54", "Sector 55", "Sector 56", "Sector 57", "Sector 58",
  "DLF Phase 1", "DLF Phase 2", "DLF Phase 3", "DLF Phase 4", "DLF Phase 5",
  "Golf Course Road", "Golf Course Extension", "Sohna Road", "MG Road",
  "Cyber City", "Udyog Vihar", "Palam Vihar", "Nirvana Country",
  "South City 1", "South City 2", "Ardee City", "Sushant Lok",
  "Vatika City", "Malibu Towne",
];
