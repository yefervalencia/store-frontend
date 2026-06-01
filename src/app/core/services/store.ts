import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '../models/store';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private baseUrl = 'http://localhost:8081/apistore/v1/stores';
  private http = inject(HttpClient);

  getAll(): Observable<Store[]> {
    return this.http.get<Store[]>(this.baseUrl);
  }

  create(store: Store): Observable<Store> {
    return this.http.post<Store>(this.baseUrl, store);
  }

  update(id: string, store: Store): Observable<Store> {
    return this.http.put<Store>(`${this.baseUrl}/${id}`, store);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  getById(id: string): Observable<Store> {
    return this.http.get<Store>(`${this.baseUrl}/${id}`);
  }
}
