export interface Product {
  id?: string;
  name: string;
  price: number;
  storeId: string;
  storeName?: string;
  categoryId: string;
  categoryName?: string;
}