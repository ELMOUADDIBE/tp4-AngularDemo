import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  constructor(private productsService: ProductService) {
  }

  ngOnInit() {
    this.getProducts();
    }
    
    getProducts(){
      this.productsService.getProducts()
      .subscribe({
        next: data => {
          this.products = data;
        },
        error: error => {
          console.log(error);
        }
      })
    }

  products: Array<any> = [];
}