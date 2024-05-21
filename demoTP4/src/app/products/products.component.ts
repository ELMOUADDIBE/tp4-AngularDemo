import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Observable } from 'rxjs';
import { Product } from '../model/product.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  public products: Array<Product> = [];
  public keyword: string = "";
  public totalPages: number = 0;
  public pageSize: number = 4;
  public currentPage: number = 1;
  constructor(private productService: ProductService, private router: Router) {
  }

  ngOnInit() {
    this.getAllProducts()
  }

  getAllProducts() {
    this.productService.getAllProducts(this.currentPage, this.pageSize)
      .subscribe({
        next: (resp) => {
          this.products = resp.body as Product[];
          let totalProducts: number = parseInt(resp.headers.get('x-total-count')!)
          this.totalPages = Math.floor(totalProducts / this.pageSize)
          if (totalProducts % this.pageSize != 0) {
            ++this.totalPages;
          }
        }
      }
      )
  }


  searchProducts() {
    this.productService.searchProducts(this.keyword, this.currentPage, this.pageSize)
      .subscribe({
        next: (resp) => {
          this.products = resp.body as Product[];
          let totalProducts: number = parseInt(resp.headers.get('x-total-count')!)
          this.totalPages = Math.floor(totalProducts / this.pageSize)
          if (totalProducts % this.pageSize != 0) {
            ++this.totalPages;
          }
        }
      }
      )
  }


  handleDelete(product: Product) {
    if (confirm("Etes vous sûre?"))
      this.productService.deleteProduct(product).subscribe({
        next: value => {
          this.getAllProducts();
          //this.appState.productsState.products=
          //this.appState.productsState.products.filter((p:any)=>p.id!=product.id);
          //this.searchProducts();
        }
      })
  }
  // handleGotoPage(page: number) {
  //   this.currentPage=page;
  //   this.searchProducts();
  // }

  handleEdit(product: Product) {
    this.router.navigateByUrl(`/admin/editProduct/${product.id}`)
  }
}
