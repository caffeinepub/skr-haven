import { Category } from "../backend.d";

export const keywordToEmoji: Record<string, string> = {
  // Groceries
  apple: "🍎",
  milk: "🥛",
  bread: "🍞",
  broccoli: "🥦",
  cheese: "🧀",
  egg: "🥚",
  eggs: "🥚",
  banana: "🍌",
  tomato: "🍅",
  carrot: "🥕",
  orange: "🍊",
  rice: "🍚",
  pasta: "🍝",
  butter: "🧈",
  yogurt: "🥛",
  juice: "🧃",
  cereal: "🥣",
  coffee: "☕",
  tea: "🍵",
  water: "💧",
  // Household
  broom: "🧹",
  laundry: "🧺",
  detergent: "🧺",
  bucket: "🪣",
  toilet: "🧻",
  tissue: "🧻",
  candle: "🕯️",
  mop: "🧹",
  spray: "🫧",
  sponge: "🫧",
  trash: "🗑️",
  bag: "🛍️",
  // Personal Care
  shampoo: "🧴",
  lotion: "🧴",
  toothbrush: "🪥",
  soap: "🧼",
  medicine: "💊",
  razor: "🪒",
  perfume: "🌸",
  sunscreen: "🧴",
  deodorant: "🌿",
  // Pet Care
  dog: "🐕",
  dog_food: "🐕",
  cat: "🐈",
  cat_food: "🐈",
  leash: "🦮",
  paw: "🐾",
  fish: "🐟",
  bird: "🐦",
  pet: "🐾",
  toy: "🐾",
  // Electronics
  phone: "📱",
  laptop: "💻",
  charger: "🔌",
  headphones: "🎧",
  camera: "📷",
  tablet: "📱",
  speaker: "🔊",
  watch: "⌚",
  keyboard: "⌨️",
  mouse: "🖱️",
};

export const categoryDefaultEmoji: Record<Category, string[]> = {
  [Category.groceries]: ["🍎", "🥛", "🍞", "🥦", "🧀", "🍳"],
  [Category.household]: ["🧹", "🧺", "🪣", "🧻", "🕯️", "🫧"],
  [Category.personalCare]: ["🧴", "🪥", "🧼", "💊", "🪒", "🌸"],
  [Category.petCare]: ["🐕", "🐈", "🦮", "🐾", "🐟", "🐦"],
  [Category.electronics]: ["📱", "💻", "🔌", "🎧", "📷", "⌚"],
};

export function getProductEmoji(keyword: string, category: Category): string {
  const lower = keyword.toLowerCase();
  const found = Object.entries(keywordToEmoji).find(
    ([k]) => lower.includes(k) || k.includes(lower),
  );
  if (found) return found[1];
  const defaults = categoryDefaultEmoji[category];
  const idx = Math.abs(keyword.charCodeAt(0) % defaults.length);
  return defaults[idx];
}

export const categoryPastelBg: Record<Category, string> = {
  [Category.groceries]: "#DDEED8",
  [Category.household]: "#DDE8F6",
  [Category.personalCare]: "#F2E3DC",
  [Category.petCare]: "#FFF0DC",
  [Category.electronics]: "#E8E0F6",
};
