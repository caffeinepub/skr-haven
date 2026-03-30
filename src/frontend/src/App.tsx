import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/sonner";
import { motion } from "motion/react";
import { useCallback, useMemo, useState } from "react";
import { Category, type Product } from "./backend.d";
import CartDrawer from "./components/CartDrawer";
import FeaturedCategories from "./components/FeaturedCategories";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import NewsletterBand from "./components/NewsletterBand";
import ProductCard from "./components/ProductCard";
import { useAllProducts, useSearchProducts } from "./hooks/useQueries";
import type { CartItem } from "./types";

const SKELETON_KEYS_6 = ["sk1", "sk2", "sk3", "sk4", "sk5", "sk6"];
const SKELETON_KEYS_10 = [
  "sk1",
  "sk2",
  "sk3",
  "sk4",
  "sk5",
  "sk6",
  "sk7",
  "sk8",
  "sk9",
  "sk10",
];

const SAMPLE_PRODUCTS: Product[] = [
  {
    id: 1n,
    name: "Organic Fuji Apples (1 kg)",
    category: Category.groceries,
    price: 12900n,
    description: "Fresh organic apples from Himalayan orchards",
    rating: { stars: 45n },
    imageKeyword: "apple",
    sold: 340n,
  },
  {
    id: 2n,
    name: "Full Cream Milk 1L",
    category: Category.groceries,
    price: 6900n,
    description: "Farm-fresh full cream milk, daily delivery",
    rating: { stars: 48n },
    imageKeyword: "milk",
    sold: 820n,
  },
  {
    id: 3n,
    name: "Whole Wheat Bread",
    category: Category.groceries,
    price: 4500n,
    description: "Stone-ground whole wheat, no preservatives",
    rating: { stars: 43n },
    imageKeyword: "bread",
    sold: 612n,
  },
  {
    id: 4n,
    name: "Premium Dog Food (2 kg)",
    category: Category.petCare,
    price: 89900n,
    description: "High-protein dry kibble for adult dogs",
    rating: { stars: 47n },
    imageKeyword: "dog_food",
    sold: 230n,
  },
  {
    id: 5n,
    name: "Pro-Shield Shampoo 400ml",
    category: Category.personalCare,
    price: 29900n,
    description: "Sulfate-free keratin shampoo for all hair types",
    rating: { stars: 46n },
    imageKeyword: "shampoo",
    sold: 490n,
  },
  {
    id: 6n,
    name: "Wireless Earbuds Pro",
    category: Category.electronics,
    price: 349900n,
    description: "Active noise cancellation, 30hr battery life",
    rating: { stars: 49n },
    imageKeyword: "headphones",
    sold: 155n,
  },
  {
    id: 7n,
    name: "Cat Litter Ultra 5L",
    category: Category.petCare,
    price: 44900n,
    description: "Clumping ultra-absorbent cat litter, odor-free",
    rating: { stars: 44n },
    imageKeyword: "cat",
    sold: 310n,
  },
  {
    id: 8n,
    name: "All-Purpose Cleaner 500ml",
    category: Category.household,
    price: 19900n,
    description: "Kills 99.9% germs, fresh citrus scent",
    rating: { stars: 45n },
    imageKeyword: "spray",
    sold: 760n,
  },
  {
    id: 9n,
    name: "Moisturizing Body Lotion",
    category: Category.personalCare,
    price: 34900n,
    description: "24-hour hydration, shea butter & aloe vera",
    rating: { stars: 47n },
    imageKeyword: "lotion",
    sold: 420n,
  },
  {
    id: 10n,
    name: "Smartphone Charger 65W",
    category: Category.electronics,
    price: 129900n,
    description: "Fast charge USB-C, compatible with all devices",
    rating: { stars: 46n },
    imageKeyword: "charger",
    sold: 280n,
  },
  {
    id: 11n,
    name: "Microfiber Mop Set",
    category: Category.household,
    price: 59900n,
    description: "360° spin mop with reusable microfiber pads",
    rating: { stars: 43n },
    imageKeyword: "mop",
    sold: 195n,
  },
  {
    id: 12n,
    name: "Bird Seed Mix 1kg",
    category: Category.petCare,
    price: 24900n,
    description: "Premium seed blend for parrots and budgies",
    rating: { stars: 45n },
    imageKeyword: "bird",
    sold: 88n,
  },
];

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<
    Category | "all" | "sales"
  >("all");
  const [searchTerm, setSearchTerm] = useState("");

  const { data: backendProducts, isLoading } = useAllProducts();
  const { data: searchResults } = useSearchProducts(searchTerm);

  const products = useMemo(() => {
    if (backendProducts && backendProducts.length > 0) return backendProducts;
    return SAMPLE_PRODUCTS;
  }, [backendProducts]);

  const displayedProducts = useMemo(() => {
    if (searchTerm.trim().length > 0) {
      if (searchResults && searchResults.length > 0) return searchResults;
      return products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }
    if (selectedCategory === "all") return products;
    if (selectedCategory === "sales") return products.slice(0, 6);
    return products.filter((p) => p.category === selectedCategory);
  }, [products, searchTerm, searchResults, selectedCategory]);

  const trendingProducts = useMemo(() => products.slice(0, 6), [products]);
  const weeklyDeals = useMemo(() => products.slice(0, 4), [products]);
  const bestsellers = useMemo(
    () =>
      [...products].sort((a, b) => Number(b.sold) - Number(a.sold)).slice(0, 4),
    [products],
  );

  const addToCart = useCallback((product: Product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  }, []);

  const updateQty = useCallback((id: bigint, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) =>
          i.product.id === id ? { ...i, quantity: i.quantity + delta } : i,
        )
        .filter((i) => i.quantity > 0),
    );
  }, []);

  const removeItem = useCallback((id: bigint) => {
    setCart((prev) => prev.filter((i) => i.product.id !== id));
  }, []);

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);

  const scrollToProducts = () => {
    document
      .getElementById("products-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const isSearching = searchTerm.trim().length > 0;
  const isFiltering = selectedCategory !== "all" || isSearching;

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        cartCount={cartCount}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        onCartOpen={() => setCartOpen(true)}
        wishlistCount={0}
      />

      <main className="flex-1">
        {!isFiltering && <HeroSection onShopNow={scrollToProducts} />}

        {!isFiltering && (
          <FeaturedCategories
            onSelectCategory={(cat) => setSelectedCategory(cat)}
          />
        )}

        {/* Trending Now */}
        {!isFiltering && (
          <section className="py-10 px-4 sm:px-6 max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">
                Trending Now 🔥
              </h2>
            </div>
            {isLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {SKELETON_KEYS_6.map((k) => (
                  <Skeleton
                    key={k}
                    className="h-52 rounded-xl"
                    data-ocid="trending.loading_state"
                  />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {trendingProducts.map((p, i) => (
                  <motion.div
                    key={String(p.id)}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <ProductCard
                      product={p}
                      onAddToCart={addToCart}
                      index={i}
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Weekly Deals + Bestsellers */}
        {!isFiltering && (
          <section className="py-10 px-4 sm:px-6 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div>
                <h2 className="text-xl font-bold text-foreground mb-5">
                  🏷️ Weekly Deals
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {weeklyDeals.map((p, i) => (
                    <ProductCard
                      key={String(p.id)}
                      product={p}
                      onAddToCart={addToCart}
                      index={i}
                    />
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground mb-5">
                  ⭐ Our Bestsellers
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {bestsellers.map((p, i) => (
                    <ProductCard
                      key={String(p.id)}
                      product={p}
                      onAddToCart={addToCart}
                      index={i}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Filtered / Search Results */}
        {isFiltering && (
          <section
            id="products-section"
            className="py-10 px-4 sm:px-6 max-w-7xl mx-auto"
          >
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
              <h2 className="text-2xl font-bold text-foreground">
                {isSearching
                  ? `Search results for "${searchTerm}"`
                  : selectedCategory === "sales"
                    ? "Sales & Deals"
                    : `${
                        selectedCategory.charAt(0).toUpperCase() +
                        selectedCategory.slice(1).replace(/([A-Z])/g, " $1")
                      } Products`}
              </h2>
              <button
                type="button"
                className="text-sm text-primary hover:underline font-semibold"
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchTerm("");
                }}
                data-ocid="products.clear.button"
              >
                ← Back to all
              </button>
            </div>
            {isLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {SKELETON_KEYS_10.map((k) => (
                  <Skeleton key={k} className="h-52 rounded-xl" />
                ))}
              </div>
            ) : displayedProducts.length === 0 ? (
              <div
                className="flex flex-col items-center justify-center py-20 text-muted-foreground"
                data-ocid="products.empty_state"
              >
                <span className="text-5xl mb-4">🔍</span>
                <p className="text-lg font-semibold">No products found</p>
                <p className="text-sm mt-1">
                  Try a different search or category
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {displayedProducts.map((p, i) => (
                  <motion.div
                    key={String(p.id)}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <ProductCard
                      product={p}
                      onAddToCart={addToCart}
                      index={i}
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </section>
        )}

        <NewsletterBand />
      </main>

      <Footer />

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onUpdateQty={updateQty}
        onRemove={removeItem}
      />

      <Toaster />
    </div>
  );
}
