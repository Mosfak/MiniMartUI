import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

@Component({
  selector: 'app-products',
  imports: [CommonModule, FormsModule],
  templateUrl: './products.html',
  styles: ``
})

export class Products {
  products: Product[] = [
    { id: 1, name: 'Product 1', price: 10.0, image : 'https://img.freepik.com/free-psd/full-shopping-cart-groceries_191095-79355.jpg?semt=ais_hybrid&w=740&q=80', description: "Description for Product 1" },
    { id: 2, name: 'Product 2', price: 20.0, image : 'https://img.freepik.com/free-psd/full-shopping-cart-groceries_191095-79355.jpg?semt=ais_hybrid&w=740&q=80', description: "Description for Product 2" },
    { id: 3, name: 'Product 3', price: 30.0, image : 'https://img.freepik.com/free-psd/full-shopping-cart-groceries_191095-79355.jpg?semt=ais_hybrid&w=740&q=80', description: "Description for Product 3" }
  ];

  showCreateModal = false;

  newProduct: Product = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    image: ''
  };

  addProduct() {
    const nextId = this.products.length ? Math.max(...this.products.map(p => p.id)) + 1 : 1;
    const productToAdd : Product = {
      id: nextId,
      name: this.newProduct.name,
      description: this.newProduct.description,
      price: this.newProduct.price,
      image: this.newProduct.image
    };
    this.products.push(productToAdd);
    this.showCreateModal = false;
  }

  deleteProduct(product: Product) {
    this.products = this.products.filter(p => p.id !== product.id);
  }
}
