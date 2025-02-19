import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShipmentsService } from 'src/app/core/services/shipment.service';
import { Shipment, ShipmentStatus } from 'src/app/core/models/shipmentItem';

@Component({
  selector: 'app-shipment-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shipment-item.component.html',
  styleUrls: ['./shipment-item.component.scss'],
})
export class ShipmentItemComponent {
  @Input() item: Shipment;
  @Output() editItem: EventEmitter<void> = new EventEmitter<void>();

  constructor(private shipmentsService: ShipmentsService) {}

  getStatusClass(status: ShipmentStatus): string {
    switch (status) {
      case ShipmentStatus.Created:
        return 'created';
      case ShipmentStatus.Shipped:
        return 'shipped';
      case ShipmentStatus.Delivered:
        return 'delivered';
      default:
        return '';
    }
  }
}
