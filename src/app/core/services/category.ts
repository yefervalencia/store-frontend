import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl = 'http://localhost:8081/apistore/v1/categories';
  private http = inject(HttpClient);

  // Recibe un texto opcional para el buscador dinámico
  getAll(nameFilter?: string): Observable<Category[]> {
    let params = new HttpParams();
    if (nameFilter) {
      params = params.set('name', nameFilter);
    }
    return this.http.get<Category[]>(this.baseUrl, { params });
  }

  getById(id: string): Observable<Category> {
    return this.http.get<Category>(`${this.baseUrl}/${id}`);
  }

  create(category: Category): Observable<Category> {
    return this.http.post<Category>(this.baseUrl, category);
  }

  update(id: string, category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.baseUrl}/${id}`, category);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}