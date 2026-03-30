export type { Product, Category } from "./backend.d";

export interface CartItem {
  product: import("./backend.d").Product;
  quantity: number;
}
