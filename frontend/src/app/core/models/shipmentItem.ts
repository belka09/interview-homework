import { WarehouseItem } from './warehouseItem';

export interface Shipment
  extends Omit<FullShipment, 'shipmentDate' | 'createdAt'> {
  shipmentDate: Date | null;
  createdAt: Date;
}

export enum ShipmentStatus {
  Created = 'created',
  Shipped = 'shipped',
  Delivered = 'delivered',
}

export interface FullShipment {
  createdAt: string;
  status: ShipmentStatus;
  products: { product: WarehouseItem; quantity: number }[];
}
