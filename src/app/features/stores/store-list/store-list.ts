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
  stores = signal<Store[]>([]);

  ngOnInit(): void {
    this.loadStores();
  }

  loadStores(): void {
    this.storeService.getAll().subscribe({
      next: (data) => {
        this.stores.set(data);
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
          this.loadStores();
        },
        error: (err) => alert('Error al eliminar la tienda')
      });
    }
  }
}
