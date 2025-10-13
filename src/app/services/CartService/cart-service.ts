import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


export interface CartItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  description: string;
}
@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItems.asObservable();

  constructor() {
    const saved = localStorage.getItem('cart');
    if (saved) {
      this.cartItems.next(JSON.parse(saved));
    }
  }

  private updateStorage(items: any[]) {
    localStorage.setItem('cart', JSON.stringify(items));
    this.cartItems.next(items);
  }

  getItems() {
    return this.cartItems.getValue();
  }

  addItem(product: any) {
    const items = this.getItems();
    const existing = items.find(i => i.productId === product.productId);
    if (existing) existing.quantity += 1;
    else items.push({ ...product, quantity: 1 });

    this.updateStorage(items);
  }

  updateQuantity(productId: number, qty: number) {
    const items = this.getItems().map(i => {
      if (i.productId === productId) i.quantity = qty;
      return i;
    });
    this.updateStorage(items);
  }

  checkout() {
    // Placeholder for checkout logic
    console.log('Checkout called');
  }
  
  removeItem(productId: number) {
    const items = this.getItems().filter(i => i.productId !== productId);
    this.updateStorage(items);
  }

  clearCart() {
    this.updateStorage([]);
  }

  getTotal() {
    return this.getItems().reduce((sum, i) => sum + i.price * i.quantity, 0);
  }
}
