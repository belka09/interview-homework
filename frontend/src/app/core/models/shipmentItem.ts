import { WarehouseItem } from './warehouseItem';

export enum ShipmentStatus {
  Created = 'created',
  Shipped = 'shipped',
  Delivered = 'delivered',
}

export interface Shipment {
  id: number;
  createdAt: Date;
  status: ShipmentStatus;
  quantity: number;
  product: WarehouseItem;
}
