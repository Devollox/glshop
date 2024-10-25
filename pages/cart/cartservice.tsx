import { BehaviorSubject } from "rxjs";

export interface CartItem {
  slug?: string;
  name?: string;
  price?: number;
  old_price?: number;
  price_in_gold?: number;
  for_sale?: boolean;
  h1_title?: string;
  product_type?: string;
  region?: string;
  platform?: string;
  app_id?: string;
  value?: any;
}

export default class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  public cartItems$ = this.cartItemsSubject.asObservable();

  constructor() {
    if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
      const savedItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
      this.cartItemsSubject.next(savedItems);
    }
  }

  public addToCart(item: CartItem) {
    const currentItems = this.cartItemsSubject.getValue();
    const existingItemIndex = currentItems.findIndex(i => i.slug === item.slug);
    if (existingItemIndex >= 0) {
      return;
    }
    this.cartItemsSubject.next([...currentItems, item]);
    if (typeof window !== "undefined") {
      localStorage.setItem("cartItems", JSON.stringify([...currentItems, item]));
    }
  }

  public removeFromCart(itemToRemove: CartItem) {
    const currentItems = this.cartItemsSubject.getValue();
    const updatedItems = currentItems.filter(item => item.slug !== itemToRemove.slug);
    this.cartItemsSubject.next(updatedItems);
    if (typeof window !== "undefined") {
      localStorage.setItem("cartItems", JSON.stringify(updatedItems));
    }
  }
}

export const cartService = new CartService();
