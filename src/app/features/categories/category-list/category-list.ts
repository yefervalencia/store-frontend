import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { CategoryService } from '../../../core/services/category';
import { Category } from '../../../core/models/category';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './category-list.html'
})
export class CategoryList implements OnInit {
  private categoryService = inject(CategoryService);
  
  categories = signal<Category[]>([]);
  searchControl = new FormControl('', { nonNullable: true });

  ngOnInit(): void {
    this.loadCategories();

    // Buscador Reactivo
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(query => this.categoryService.getAll(query))
    ).subscribe({
      next: (data) => this.categories.set(data),
      error: (err) => console.error('Error en búsqueda', err)
    });
  }

  loadCategories(): void {
    this.categoryService.getAll().subscribe({
      next: (data) => this.categories.set(data)
    });
  }

  deleteCategory(id: string): void {
    if (confirm('¿Estás seguro de eliminar esta categoría?')) {
      this.categoryService.delete(id).subscribe({
        next: () => this.loadCategories(),
        error: () => alert('Error al eliminar (Puede que tenga productos asociados)')
      });
    }
  }
}