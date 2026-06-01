import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs'; // <-- ¡Operador clave!
import { ProductService } from '../../../core/services/product';
import { StoreService } from '../../../core/services/store';
import { CategoryService } from '../../../core/services/category';
import { Store } from '../../../core/models/store';
import { Category } from '../../../core/models/category';
import { Product } from '../../../core/models/product';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css',
})
export class ProductForm implements OnInit{
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  private storeService = inject(StoreService);
  private categoryService = inject(CategoryService);
  private router = inject(Router);

  // Signals para llenar los selects del HTML
  stores = signal<Store[]>([]);
  categories = signal<Category[]>([]);

  productForm = this.fb.group({
    name: ['', { validators: [Validators.required], nonNullable: true }],
    price: [0, { validators: [Validators.required, Validators.min(0.1)], nonNullable: true }],
    storeId: ['', { validators: [Validators.required], nonNullable: true }],
    categoryId: ['', { validators: [Validators.required], nonNullable: true }]
  });

  ngOnInit(): void {
    // forkJoin ejecuta ambas peticiones en paralelo y espera a que terminen
    forkJoin({
      tiendas: this.storeService.getAll(),
      categorias: this.categoryService.getAll()
    }).subscribe({
      next: (resultado) => {
        this.stores.set(resultado.tiendas);
        this.categories.set(resultado.categorias);
      }
    });
  }

  onSubmit(): void {
    if (this.productForm.invalid) return;

    // Le decimos a TypeScript que trate los datos puros como un objeto Product
    this.productService.create(this.productForm.getRawValue() as Product).subscribe({
      next: () => this.router.navigate(['/products']),
      error: (err) => alert('Error: ' + err.error?.message)
    });
  }
}
