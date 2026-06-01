import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { CategoryService } from '../../../core/services/category';
import { Category } from '../../../core/models/category';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './category-form.html'
})
export class CategoryForm implements OnInit {
  private fb = inject(FormBuilder);
  private categoryService = inject(CategoryService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  currentId = signal<string | null>(null);

  categoryForm = this.fb.group({
    name: ['', { validators: [Validators.required], nonNullable: true }],
    description: ['', { validators: [Validators.required], nonNullable: true }]
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.currentId.set(id);
      this.categoryService.getById(id).subscribe(cat => {
        this.categoryForm.patchValue({
          name: cat.name,
          description: cat.description
        });
      });
    }
  }

  onSubmit(): void {
    if (this.categoryForm.invalid) return;

    const catData = this.categoryForm.getRawValue() as Category;
    const id = this.currentId();

    if (id) {
      this.categoryService.update(id, catData).subscribe({
        next: () => this.router.navigate(['/categories']),
        error: () => alert('Error al actualizar')
      });
    } else {
      this.categoryService.create(catData).subscribe({
        next: () => this.router.navigate(['/categories']),
        error: () => alert('Error al crear')
      });
    }
  }
}