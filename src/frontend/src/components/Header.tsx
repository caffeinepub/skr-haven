import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Leaf, Menu, Search, ShoppingCart, X } from "lucide-react";
import { useCallback, useState } from "react";
import { Category } from "../backend.d";

interface HeaderProps {
  cartCount: number;
  searchTerm: string;
  onSearchChange: (val: string) => void;
  selectedCategory: Category | "all" | "sales";
  onCategoryChange: (cat: Category | "all" | "sales") => void;
  onCartOpen: () => void;
  wishlistCount: number;
}

const NAV_ITEMS: { label: string; value: Category | "all" | "sales" }[] = [
  { label: "Groceries", value: Category.groceries },
  { label: "Household", value: Category.household },
  { label: "Personal Care", value: Category.personalCare },
  { label: "Pet Care", value: Category.petCare },
  { label: "Electronics", value: Category.electronics },
  { label: "Sales", value: "sales" },
];

const SUB_NAV = [
  "Fresh Produce",
  "Dairy",
  "Cleaning",
  "Baby Care",
  "Support",
  "Home & Supplies",
  "Electronics",
];

export default function Header({
  cartCount,
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  onCartOpen,
  wishlistCount,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onSearchChange(e.target.value);
    },
    [onSearchChange],
  );

  return (
    <header className="sticky top-0 z-50 shadow-xs">
      {/* Utility Bar */}
      <div className="bg-foreground text-primary-foreground text-xs text-center py-1 px-4">
        Free delivery on orders above ₹499 • Fresh products daily
      </div>

      {/* Main Header */}
      <div className="bg-header border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-4">
          {/* Logo */}
          <button
            type="button"
            className="flex items-center gap-2 flex-shrink-0"
            onClick={() => onCategoryChange("all")}
            data-ocid="header.link"
          >
            <span className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <Leaf className="w-4 h-4 text-primary-foreground" />
            </span>
            <span className="text-lg font-extrabold text-foreground tracking-tight">
              SKR Haven
            </span>
          </button>

          {/* Desktop Nav */}
          <nav
            className="hidden lg:flex items-center gap-1 ml-4"
            aria-label="Categories"
          >
            {NAV_ITEMS.map((item) => (
              <button
                type="button"
                key={item.value}
                onClick={() => onCategoryChange(item.value)}
                data-ocid={`nav.${item.label.toLowerCase().replace(" ", "_")}.link`}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors whitespace-nowrap
                  ${
                    item.value === "sales"
                      ? "text-sale hover:bg-red-50"
                      : selectedCategory === item.value
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground hover:bg-secondary"
                  }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Search */}
          <div className="flex-1 max-w-sm ml-auto lg:ml-4 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search products…"
              value={searchTerm}
              onChange={handleSearch}
              className="pl-9 rounded-full bg-muted border-border text-sm h-9"
              data-ocid="header.search_input"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="hidden sm:flex relative"
              data-ocid="header.wishlist.button"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-4 min-w-4 p-0 flex items-center justify-center text-[10px] bg-primary">
                  {wishlistCount}
                </Badge>
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={onCartOpen}
              data-ocid="header.cart.button"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-4 min-w-4 p-0 flex items-center justify-center text-[10px] bg-primary">
                  {cartCount}
                </Badge>
              )}
            </Button>

            <Button
              size="sm"
              className="hidden sm:flex bg-primary text-primary-foreground hover:bg-primary/90 rounded-full text-xs font-semibold"
              data-ocid="header.login.button"
            >
              Login
            </Button>

            {/* Mobile menu toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-ocid="header.menu.button"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-border bg-header px-4 py-3 flex flex-wrap gap-2">
            {NAV_ITEMS.map((item) => (
              <button
                type="button"
                key={item.value}
                onClick={() => {
                  onCategoryChange(item.value);
                  setMobileMenuOpen(false);
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors
                  ${
                    item.value === "sales"
                      ? "text-sale bg-red-50"
                      : selectedCategory === item.value
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground bg-secondary"
                  }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Secondary Nav Strip */}
      <div className="bg-nav-strip border-b border-border hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-9 flex items-center gap-6">
          {SUB_NAV.map((label) => (
            <button
              type="button"
              key={label}
              className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
              data-ocid={`subnav.${label.toLowerCase().replace(/ /g, "_")}.link`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
