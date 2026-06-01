import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  // Apuntamos al endpoint que configuraste en Spring Boot
  private baseUrl = 'http://localhost:8081/apistore/v1/categories';
  
  // Inyección moderna de Angular (Requerimiento del PDF)
  private http = inject(HttpClient);

  // Retorna un flujo reactivo (Observable) con la lista de categorías
  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl);
  }
}
