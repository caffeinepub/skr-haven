import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Minus, Plus, Trash2 } from "lucide-react";
import type { CartItem } from "../types";
import { categoryPastelBg, getProductEmoji } from "../utils/emojiMap";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQty: (id: bigint, delta: number) => void;
  onRemove: (id: bigint) => void;
}

export default function CartDrawer({
  open,
  onClose,
  items,
  onUpdateQty,
  onRemove,
}: CartDrawerProps) {
  const total = items.reduce(
    (sum, item) => sum + Number(item.product.price) * item.quantity,
    0,
  );

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent
        side="right"
        className="w-full max-w-sm flex flex-col"
        data-ocid="cart.sheet"
      >
        <SheetHeader>
          <SheetTitle>
            Your Cart ({items.reduce((s, i) => s + i.quantity, 0)} items)
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto mt-4 space-y-3">
          {items.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center h-40 text-muted-foreground"
              data-ocid="cart.empty_state"
            >
              <span className="text-4xl mb-3">🛒</span>
              <p className="text-sm">Your cart is empty</p>
            </div>
          ) : (
            items.map((item, idx) => (
              <div
                key={String(item.product.id)}
                className="flex items-center gap-3 p-3 bg-secondary rounded-lg"
                data-ocid={`cart.item.${idx + 1}`}
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl flex-shrink-0"
                  style={{
                    backgroundColor: categoryPastelBg[item.product.category],
                  }}
                >
                  {getProductEmoji(
                    item.product.imageKeyword,
                    item.product.category,
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-foreground line-clamp-1">
                    {item.product.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    ₹{(Number(item.product.price) / 100).toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => onUpdateQty(item.product.id, -1)}
                  >
                    <Minus className="w-3 h-3" />
                  </Button>
                  <span className="text-sm font-semibold w-5 text-center">
                    {item.quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => onUpdateQty(item.product.id, 1)}
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-destructive"
                    onClick={() => onRemove(item.product.id)}
                    data-ocid={`cart.delete_button.${idx + 1}`}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-border pt-4 mt-4 space-y-3">
            <div className="flex justify-between text-sm font-semibold">
              <span>Total</span>
              <span>₹{(total / 100).toFixed(2)}</span>
            </div>
            <Button
              className="w-full bg-primary text-primary-foreground rounded-full font-semibold"
              data-ocid="cart.submit_button"
            >
              Proceed to Checkout
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
