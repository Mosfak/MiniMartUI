import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService, CartItem } from '../../services/CartService/cart-service';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.html',
  styles: ``
})
export class Cart {
  constructor(public cartService: CartService) {}

  // Always get cart items directly from service
  get cart(): CartItem[] {
    return this.cartService.getCart();
  }

  updateQuantity(id: number, event: any) {
    const quantity = parseInt(event.target.value, 10);
    if (quantity > 0) {
      this.cartService.updateQuantity(id, quantity);
    }
  }

  getCartItems(): CartItem[] {
    return this.cartService.getCart();
  }

  removeItem(id: number) {
    this.cartService.removeFromCart(id);
  }

  checkout() {
    console.log('Checking out', this.cartService.getCart());
    // TODO: Call backend API to create an order
    this.cartService.clearCart();
  }

  getTotal() {
    return this.cartService.getTotal();
  }
}
