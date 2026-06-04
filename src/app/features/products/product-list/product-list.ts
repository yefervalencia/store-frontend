import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ProductService } from '../../../core/services/product';
import { Product } from '../../../core/models/product';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList implements OnInit{
  private productService = inject(ProductService);

  products = signal<Product[]>([]);

  searchControl = new FormControl('', { nonNullable: true });

  ngOnInit(): void {
    this.loadProducts();

    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(query => this.productService.getAll(query ? { name: query } : {}))
    ).subscribe({
      next: (data) => this.products.set(data),
      error: (err) => console.error('Error en búsqueda', err)
    });
  }

  loadProducts(): void {
    this.productService.getAll().subscribe({
      next: (data) => this.products.set(data),
      error: (err) => console.error('Error al cargar productos', err)
    });
  }

  deleteProduct(id: string): void {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this.productService.delete(id).subscribe({
        next: () => this.loadProducts(),
        error: (err) => alert('Error al eliminar el producto')
      });
    }
  }
}
