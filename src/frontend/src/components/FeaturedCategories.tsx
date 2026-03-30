import { motion } from "motion/react";
import { Category } from "../backend.d";
import { categoryPastelBg } from "../utils/emojiMap";

interface FeaturedCategoriesProps {
  onSelectCategory: (cat: Category) => void;
}

const CATEGORIES = [
  { label: "Groceries", emoji: "🥦", value: Category.groceries },
  { label: "Household", emoji: "🏠", value: Category.household },
  { label: "Personal Care", emoji: "🧴", value: Category.personalCare },
  { label: "Pet Care", emoji: "🐾", value: Category.petCare },
  { label: "Electronics", emoji: "📱", value: Category.electronics },
];

export default function FeaturedCategories({
  onSelectCategory,
}: FeaturedCategoriesProps) {
  return (
    <section className="py-12 px-4 sm:px-6 max-w-7xl mx-auto">
      <motion.h2
        className="text-2xl font-bold text-foreground mb-8 text-center"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Shop by Category
      </motion.h2>
      <div className="flex justify-center flex-wrap gap-6 sm:gap-10">
        {CATEGORIES.map((cat, i) => (
          <motion.button
            key={cat.value}
            onClick={() => onSelectCategory(cat.value)}
            className="flex flex-col items-center gap-3 group"
            data-ocid={`categories.${cat.label.toLowerCase().replace(" ", "_")}.button`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            whileHover={{ scale: 1.06 }}
          >
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center text-4xl shadow-xs transition-shadow group-hover:shadow-card"
              style={{ backgroundColor: categoryPastelBg[cat.value] }}
            >
              {cat.emoji}
            </div>
            <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
              {cat.label}
            </span>
          </motion.button>
        ))}
      </div>
    </section>
  );
}
