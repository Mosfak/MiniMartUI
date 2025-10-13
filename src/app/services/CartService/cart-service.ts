import { Injectable } from '@angular/core';
import { Product } from '../ProductService/product-service';
import { Cart } from '../../components/cart/cart';

export interface CartItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  description: string;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  cart: CartItem[] = [];

  getCart(): CartItem[] {
    console.log(this.cart);
    return this.cart;
  }

  addToCart(product: CartItem) {
    const existing = this.cart.find(i => i.productId === product.productId);
    if (existing) {
      existing.quantity += product.quantity;
    } else {
      this.cart.push({ ...product });
    }
  }

  updateQuantity(productId: number, quantity: number) {
    const item = this.cart.find(i => i.productId === productId);
    if (item) {
      item.quantity = quantity;
    }
  }

  removeFromCart(productId: number) {
    this.cart = this.cart.filter(i => i.productId !== productId);
  }

  clearCart() {
    this.cart = [];
  }

  getTotal(): number {
    return this.cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  }
}
