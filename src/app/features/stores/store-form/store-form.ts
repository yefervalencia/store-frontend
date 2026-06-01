import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { StoreService } from '../../../core/services/store';
import { Store } from '../../../core/models/store';

@Component({
  selector: 'app-store-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './store-form.html',
  styleUrl: './store-form.css',
})
export class StoreForm {
  private fb = inject(FormBuilder);
  private storeService = inject(StoreService);
  private router = inject(Router);

  // Formulario tipado con nonNullable (Según Formularios.pdf)
  storeForm = this.fb.group({
    name: ['', { validators: [Validators.required], nonNullable: true }],
    address: ['', { validators: [Validators.required], nonNullable: true }]
  });

  onSubmit(): void {
    if (this.storeForm.invalid) return;

    // Le decimos a TypeScript que trate los datos como un objeto Store
    this.storeService.create(this.storeForm.getRawValue() as Store).subscribe({
      next: () => this.router.navigate(['/stores']), 
      error: (err) => alert('Error al guardar la tienda')
    });
  }
}
