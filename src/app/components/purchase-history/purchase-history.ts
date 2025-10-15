import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService, OrderSummary } from '../../services/OrderService/order-service';
import { UserService } from '../../services/UserService/user-service';

@Component({
  selector: 'app-purchase-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './purchase-history.html',
})
export class PurchaseHistory implements OnInit {
  orders: OrderSummary[] = [];
  userId: number = 0; // You’ll set this dynamically, e.g., from localStorage

  constructor(private orderService: OrderService, private userService: UserService) {}

  ngOnInit(): void {
  this.userService.getUserId().subscribe({
    next: (id) => {
      this.userId = id;
      this.loadOrders();
    },
    error: (err) => console.error('Failed to get user ID', err)
  });
}


  loadOrders() {
    console.log('Fetching orders for userId:', this.userId);
    this.orderService.getOrders(this.userId).subscribe({
      next: (data) => {
        this.orders = data;
      },
      error: (err) => console.error('Failed to load orders', err)
    });
  }
}
