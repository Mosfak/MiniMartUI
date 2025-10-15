import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartItem } from '../CartService/cart-service';

export interface OrderItem {
  productId: number;
  quantity: number;
}

export interface OrderSummary {
  userId: number;          // current user's ID
  totalAmount: number;
  orderDate?: string;      // backend can set automatically
  items:  OrderItem[];
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'https://localhost:7276/api/orders';

  constructor(private http: HttpClient) {}

  // Place a new order
  placeOrder(cartItems: CartItem[], userId: number, totalAmount: number): Observable<{ message: string; orderId: number }> {
    const order: OrderSummary = {
      userId,
      totalAmount,
      items: cartItems.map(item => ({
        productId: item.productId,
        quantity: item.quantity
      }))
    };

    return this.http.post<{ message: string; orderId: number }>(this.apiUrl, order);
  }

  // Get all orders for a given user
  getOrders(userId: number): Observable<OrderSummary[]> {
    return this.http.get<OrderSummary[]>(`${this.apiUrl}/${userId}`);
  }
}
