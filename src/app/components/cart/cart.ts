import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/CartService/cart-service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.html',
  styles: ``
})
export class Cart implements OnInit {
  cartItems: any[] = [];
  total = 0;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.total = this.cartService.getTotal();
    });
  }

  getCartItems() {
    return this.cartItems;
  }

  updateQuantity(productId: number, qty: number) {
    this.cartService.updateQuantity(productId, Number(qty));
  }

  removeItem(productId: number) {
    this.cartService.removeItem(productId);
  }

  getTotal() {
    return this.total;
  }

  checkout() {
    this.cartService.checkout();
    this.router.navigate(['/purchase-history']);
  }
}
