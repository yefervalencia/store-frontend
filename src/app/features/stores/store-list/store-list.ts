import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StoreService } from '../../../core/services/store';
import { Store } from '../../../core/models/store';

@Component({
  selector: 'app-store-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './store-list.html',
  styleUrl: './store-list.css',
})
export class StoreList implements OnInit{
  private storeService = inject(StoreService);

  // Signal para almacenar las tiendas (Estado reactivo)
  stores = signal<Store[]>([]);

  ngOnInit(): void {
    this.loadStores();
  }

  loadStores(): void {
    // Nos suscribimos al Observable del servicio
    this.storeService.getAll().subscribe({
      next: (data) => {
        this.stores.set(data); // Actualizamos el Signal con los datos del backend
      },
      error: (err) => {
        console.error('Error al cargar tiendas', err);
      }
    });
  }

  deleteStore(id: string): void {
    if (confirm('¿Estás seguro de eliminar esta tienda?')) {
      this.storeService.delete(id).subscribe({
        next: () => {
          // Si se elimina con éxito, recargamos la lista
          this.loadStores();
        },
        error: (err) => alert('Error al eliminar la tienda')
      });
    }
  }
}
