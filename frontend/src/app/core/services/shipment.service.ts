import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Shipment, ShipmentStatus } from '../models/shipmentItem';

@Injectable({
  providedIn: 'root',
})
export class ShipmentsService {
  constructor(private http: HttpClient) {}

  fetchAll() {
    return this.http.get<Shipment[]>('shipments');
  }

  getShipmentById(id: number) {
    return this.http.get<Shipment>(`shipments/${id}`);
  }

  createShipment(shipment: {
    productId: number;
    quantity: number;
    status?: ShipmentStatus;
  }) {
    return this.http.post<Shipment>('shipments', shipment);
  }

  updateShipmentStatus(id: number, status: ShipmentStatus) {
    return this.http.put<Shipment>(`shipments/${id}/status`, { status });
  }
}
