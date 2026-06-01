import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:8081/apistore/v1/products';
  private http = inject(HttpClient);

  // Recibe un objeto opcional con los filtros para el buscador dinámico
  getAll(filters?: { name?: string, storeId?: string, categoryId?: string }): Observable<Product[]> {
    let params = new HttpParams();
    
    // Si enviamos parámetros, se agregan a la URL (ej: ?name=Laptop)
    if (filters?.name) {
      params = params.set('name', filters.name);
    }
    if (filters?.storeId) {
      params = params.set('storeId', filters.storeId);
    }
    if (filters?.categoryId) {
      params = params.set('categoryId', filters.categoryId);
    }

    return this.http.get<Product[]>(this.baseUrl, { params });
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product);
  }

  update(id: string, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/${id}`, product);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
