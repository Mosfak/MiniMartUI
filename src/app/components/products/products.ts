import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ProductService } from '../../services/ProductService/product-service';


@Component({
  selector: 'app-products',
  imports: [CommonModule, FormsModule],
  templateUrl: './products.html',
  styles: ``
})

export class Products {
  products: Product[] = [];

  showCreateModal = false;
  showCartPopup = false;
  cartPopupProduct: Product | null = null;

  newProduct: Product = {
   productId: 0,
   name: '',
   price: 0,
   category: '',
   imageUrl: '',
   description: ''
  };

  constructor(private auth: AuthService, private productService: ProductService) {}
   ngOnInit(): void {
   this.loadProducts();
  }

  loadProducts() {
    return this.productService.getProducts().subscribe({
      next: data => {
         this.products = data;
         console.log(this.products);
      },
      error: err => console.error('Failed to load products', err)
    });
  }

  addProduct() {
    this.productService.addProduct(this.newProduct).subscribe({
      next: product => {
        this.products.push(product);
        this.showCreateModal = false;
      },
      error: err => console.error('Failed to add product', err)
    });
    this.showCreateModal = false;

  }
  // addProduct() {
  //   const nextId = this.products.length ? Math.max(...this.products.map(p => p.id)) + 1 : 1;
  //   const productToAdd : Product = {
  //     id: nextId,
  //     name: this.newProduct.name,
  //     description: this.newProduct.description,
  //     price: this.newProduct.price,
  //     image: this.newProduct.image
  //   };
  //   this.products.push(productToAdd);
  //   this.showCreateModal = false;
  // }

  deleteProduct(product: Product) {
    this.productService.deleteProduct(product.productId).subscribe({
      next: () => (this.products = this.products.filter(p => p.productId !== product.productId)),
      error: err => console.error('Failed to delete product', err)
    });
  }

  getRole() {
    return this.auth.getRole();
  }
  
  addToCart(product: Product) {
    this.cartPopupProduct = product;
    this.showCartPopup = true;
    setTimeout(() => (this.showCartPopup = false), 4000);
  }


  viewCart() {
    window.location.href = '/cart';
    this.showCartPopup = false;
  }

  closeCartPopup() {
    this.showCartPopup = false;
  }
}
