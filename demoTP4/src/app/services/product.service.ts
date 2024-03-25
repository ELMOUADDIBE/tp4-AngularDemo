import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  public getProducts(): Observable<Array<Product>> {
    return this.http.get<Array<Product>>('http://localhost:8888/products');
  }

  public deleteProduct(p: Product) {
    return this.http.delete(`http://localhost:8888/products/${p.id}`);
  }

  public saveProduct(p: Product): Observable<Product> {
    return this.http.post<Product>('http://localhost:8888/products/', p);
  }

  public searchProducts(keyword: string): Observable<Array<Product>> {
    return this.http.get<Array<Product>>(`http://localhost:8888/products?name_like=${keyword}`);
  }
}
