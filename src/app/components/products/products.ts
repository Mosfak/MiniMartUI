import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  imports: [CommonModule],
  templateUrl: './products.html',
  styles: ``
})
export class Products {
  products = [
    { id: 1, name: 'Product 1', price: 10.0, image : 'https://img.freepik.com/free-psd/full-shopping-cart-groceries_191095-79355.jpg?semt=ais_hybrid&w=740&q=80', description: "Description for Product 1" },
    { id: 2, name: 'Product 2', price: 20.0, image : 'https://img.freepik.com/free-psd/full-shopping-cart-groceries_191095-79355.jpg?semt=ais_hybrid&w=740&q=80', description: "Description for Product 2" },
    { id: 3, name: 'Product 3', price: 30.0, image : 'https://img.freepik.com/free-psd/full-shopping-cart-groceries_191095-79355.jpg?semt=ais_hybrid&w=740&q=80', description: "Description for Product 3" }
  ];
}
