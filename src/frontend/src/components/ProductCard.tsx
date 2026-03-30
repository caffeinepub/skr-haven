import { Button } from "@/components/ui/button";
import { ShoppingCart, Star } from "lucide-react";
import type { Product } from "../backend.d";
import { categoryPastelBg, getProductEmoji } from "../utils/emojiMap";

const STAR_KEYS = ["s1", "s2", "s3", "s4", "s5"];

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  index?: number;
}

export default function ProductCard({
  product,
  onAddToCart,
  index = 0,
}: ProductCardProps) {
  const emoji = getProductEmoji(product.imageKeyword, product.category);
  const bg = categoryPastelBg[product.category];
  const stars = Math.round(Number(product.rating.stars) / 10);
  const price = (Number(product.price) / 100).toFixed(2);

  return (
    <div
      className="bg-card rounded-xl shadow-xs hover:shadow-card transition-shadow border border-border flex flex-col overflow-hidden group"
      data-ocid={`products.item.${index + 1}`}
    >
      {/* Image Area */}
      <div
        className="flex items-center justify-center h-36 text-5xl rounded-t-xl"
        style={{ backgroundColor: bg }}
      >
        {emoji}
      </div>

      {/* Info */}
      <div className="p-3 flex flex-col flex-1">
        <p className="text-[13px] font-semibold text-foreground line-clamp-2 mb-1">
          {product.name}
        </p>
        <p className="text-xs text-muted-foreground line-clamp-1 mb-2">
          {product.description}
        </p>

        {/* Stars */}
        <div className="flex items-center gap-0.5 mb-2">
          {STAR_KEYS.map((key, i) => (
            <Star
              key={key}
              className={`w-3 h-3 ${
                i < stars ? "fill-star text-star" : "fill-border text-border"
              }`}
            />
          ))}
          <span className="text-xs text-muted-foreground ml-1">
            ({stars}/5)
          </span>
        </div>

        <div className="flex items-center justify-between mt-auto gap-2">
          <span className="text-sm font-bold text-foreground">₹{price}</span>
          <Button
            size="sm"
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full text-xs h-7 px-3 flex items-center gap-1"
            onClick={() => onAddToCart(product)}
            data-ocid={`products.add_to_cart.${index + 1}`}
          >
            <ShoppingCart className="w-3 h-3" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}
