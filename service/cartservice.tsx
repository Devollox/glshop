import { BehaviorSubject } from "rxjs";
import React from "react";

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

class CartService extends React.Component {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  public cartItems$ = this.cartItemsSubject.asObservable();

  constructor(props: any) {
    super(props);
    if (typeof localStorage !== "undefined") {
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
    localStorage.setItem("cartItems", JSON.stringify([...currentItems, item]));
  }

  public removeFromCart(itemToRemove: CartItem) {
    const currentItems = this.cartItemsSubject.getValue();
    const updatedItems = currentItems.filter(item => item.slug !== itemToRemove.slug);
    this.cartItemsSubject.next(updatedItems);
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("cartItems", JSON.stringify(updatedItems));
    }
  }
}

export default CartService