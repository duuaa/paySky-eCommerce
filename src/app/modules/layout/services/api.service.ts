import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'https://fakestoreapi.com';

  constructor(private http: HttpClient) {}

  // المنتجات
  getProducts(): Observable<product[]> {
    return this.http.get<product[]>(`${this.baseUrl}/products`);
  }

  getProduct(id: number): Observable<product> {
    return this.http.get<product>(`${this.baseUrl}/products/${id}`);
  }

  addProduct(product: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/products`, product);
  }

  updateProduct(id: number, product: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/products/${id}`, product);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/products/${id}`);
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/products/categories`);
  }

  filterByCategory(category: string): Observable<product[]> {
    return this.http.get<product[]>(
      `${this.baseUrl}/products/category/${category}`
    );
  }
}
