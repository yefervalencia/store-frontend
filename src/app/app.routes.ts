import { Routes } from '@angular/router';
import { ProductList } from './features/products/product-list/product-list';
import { StoreList } from './features/stores/store-list/store-list';
import { ProductForm } from './features/products/product-form/product-form';
import { StoreForm } from './features/stores/store-form/store-form';
import { CategoryList } from './features/categories/category-list/category-list';
import { CategoryForm } from './features/categories/category-form/category-form';

export const routes: Routes = [
  { path: 'products', component: ProductList },
  { path: 'products/new', component: ProductForm },
  { path: 'products/edit/:id', component: ProductForm },
  { path: 'stores', component: StoreList },
  { path: 'stores/new', component: StoreForm },
  { path: 'stores/edit/:id', component: StoreForm },
  { path: 'categories', component: CategoryList },
{ path: 'categories/new', component: CategoryForm },
{ path: 'categories/edit/:id', component: CategoryForm },
  // Redirigir la ruta raíz a productos
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  // Cualquier ruta no encontrada va a productos (o podrías crear un componente 404)
  { path: '**', redirectTo: '/products' }
];
