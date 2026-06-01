import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
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
  private route = inject(ActivatedRoute);

  currentId = signal<string | null>(null);

  // Formulario tipado con nonNullable (Según Formularios.pdf)
  storeForm = this.fb.group({
    name: ['', { validators: [Validators.required], nonNullable: true }],
    address: ['', { validators: [Validators.required], nonNullable: true }]
  });

  ngOnInit(): void {
    // Revisamos si la URL trae un parámetro 'id'
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.currentId.set(id); // Guardamos el ID en el signal
      // Traemos los datos del backend para llenar el formulario
      this.storeService.getById(id).subscribe(store => {
        this.storeForm.patchValue({
          name: store.name,
          address: store.address
        });
      });
    }
  }

  onSubmit(): void {
    if (this.storeForm.invalid) return;

    const storeData = this.storeForm.getRawValue() as Store;
    const id = this.currentId();

    if (id) {
      // Si hay un ID, llamamos al método UPDATE
      this.storeService.update(id, storeData).subscribe({
        next: () => this.router.navigate(['/stores']),
        error: () => alert('Error al actualizar la tienda')
      });
    } else {
      // Si NO hay ID, llamamos al método CREATE
      this.storeService.create(storeData).subscribe({
        next: () => this.router.navigate(['/stores']),
        error: () => alert('Error al guardar la tienda')
      });
    }
  }
}
