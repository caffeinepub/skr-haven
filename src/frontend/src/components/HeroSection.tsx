import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

interface HeroSectionProps {
  onShopNow: () => void;
}

export default function HeroSection({ onShopNow }: HeroSectionProps) {
  return (
    <section className="bg-gradient-to-br from-background via-background to-secondary overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[420px] lg:min-h-[500px]">
          {/* Left: Text */}
          <div className="flex flex-col justify-center py-14 pr-0 lg:pr-12">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-4">
                🌿 Your Daily Essentials Store
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-extrabold text-foreground leading-tight mb-5">
                Everything You Need,{" "}
                <span className="text-primary">Every Day</span>
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground mb-8 max-w-md leading-relaxed">
                From fresh groceries to pet care, personal essentials to
                electronics — SKR Haven delivers everything your household
                needs, right to your door.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 font-semibold text-sm"
                  onClick={onShopNow}
                  data-ocid="hero.primary_button"
                >
                  Shop Essentials
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full px-8 font-semibold text-sm border-border"
                  data-ocid="hero.secondary_button"
                >
                  View Deals
                </Button>
              </div>
              <div className="flex items-center gap-6 mt-8">
                <div className="text-center">
                  <p className="text-xl font-bold text-foreground">10K+</p>
                  <p className="text-xs text-muted-foreground">Products</p>
                </div>
                <div className="w-px h-8 bg-border" />
                <div className="text-center">
                  <p className="text-xl font-bold text-foreground">50K+</p>
                  <p className="text-xs text-muted-foreground">Customers</p>
                </div>
                <div className="w-px h-8 bg-border" />
                <div className="text-center">
                  <p className="text-xl font-bold text-foreground">4.8★</p>
                  <p className="text-xs text-muted-foreground">Rating</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Image */}
          <motion.div
            className="relative hidden lg:block"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          >
            <div className="absolute inset-0 flex items-stretch">
              <img
                src="/assets/generated/hero-family-kitchen.dim_800x600.jpg"
                alt="Fresh groceries and daily essentials"
                className="w-full h-full object-cover rounded-l-3xl"
              />
              <div className="absolute inset-0 rounded-l-3xl bg-gradient-to-r from-background/30 to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
