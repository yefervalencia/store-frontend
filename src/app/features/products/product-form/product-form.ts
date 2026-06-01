import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
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
  private route = inject(ActivatedRoute);

  stores = signal<Store[]>([]);
  categories = signal<Category[]>([]);
  currentId = signal<string | null>(null);

  productForm = this.fb.group({
    name: ['', { validators: [Validators.required], nonNullable: true }],
    price: [0, { validators: [Validators.required, Validators.min(0.1)], nonNullable: true }],
    storeId: ['', { validators: [Validators.required], nonNullable: true }],
    categoryId: ['', { validators: [Validators.required], nonNullable: true }]
  });

  ngOnInit(): void {
    forkJoin({
      tiendas: this.storeService.getAll(),
      categorias: this.categoryService.getAll()
    }).subscribe(resultado => {
      this.stores.set(resultado.tiendas);
      this.categories.set(resultado.categorias);

      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.currentId.set(id);
        this.productService.getById(id).subscribe(product => {
          this.productForm.patchValue({
            name: product.name,
            price: product.price,
            storeId: product.storeId,
            categoryId: product.categoryId
          });
        });
      }
    });
  }

  onSubmit(): void {
    if (this.productForm.invalid) return;

    const productData = this.productForm.getRawValue() as Product;
    const id = this.currentId();

    if (id) {
      this.productService.update(id, productData).subscribe({
        next: () => this.router.navigate(['/products']),
        error: (err) => alert('Error al actualizar')
      });
    } else {
      this.productService.create(productData).subscribe({
        next: () => this.router.navigate(['/products']),
        error: (err) => alert('Error al crear')
      });
    }
  }
}
