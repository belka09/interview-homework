import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WarehouseItem } from '../models/warehouseItem';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  fetchAll() {
    return this.http.get<WarehouseItem[]>('products');
  }

  getProductById(id: number) {
    return this.http.get<WarehouseItem>(`products/${id}`);
  }

  createProduct(product: WarehouseItem) {
    return this.http.post<WarehouseItem>('products', product);
  }

  updateProduct(id: number, product: WarehouseItem) {
    return this.http.put<WarehouseItem>(`products/${id}`, product);
  }

  deleteProduct(id: number) {
    return this.http.delete(`products/${id}`);
  }
}
