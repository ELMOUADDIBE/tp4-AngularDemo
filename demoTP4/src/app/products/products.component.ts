import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Observable } from 'rxjs';
import { Product } from '../model/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  products : Array<Product> = [];
  public keyword: string = '';
  constructor(private productsService: ProductService) {
  }

  ngOnInit() {
    this.getProducts();
    }
    
    getProducts(){
      this.productsService.getProducts().subscribe({
        next: data => {
          this.products = data;
        },
        error: error => {
          console.log(error);
        }
      })

      //this.products = this.productsService.getProducts();
    }

    deleteProduct(product: Product) {
      if(confirm('Are you sure you want to delete this product?')) {
        this.productsService.deleteProduct(product).subscribe({
          next: _ => {
            this.products = this.products.filter(p => p.id !== product.id);
          },
          error: error => {
            console.log(error);
          }
        });
      }
    }

    editProduct(p:Product){
      //
    }

    searchProducts(){
      this.productsService.searchProducts(this.keyword).subscribe({
        next: data => {
          this.products = data;
        },
        error: error => {
          console.log(error);
        }
      })
    }

}