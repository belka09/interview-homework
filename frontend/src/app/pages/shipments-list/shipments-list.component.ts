import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Shipment } from 'src/app/core/models/shipmentItem';
import { Observable } from 'rxjs';
import { ShipmentsService } from 'src/app/core/services/shipment.service';
import { ShipmentItemComponent } from './shipmen-item/shipment-item.component';

@Component({
  selector: 'app-shipments-list',
  standalone: true,
  imports: [CommonModule, RouterModule, ShipmentItemComponent],
  templateUrl: './shipments-list.component.html',
  styleUrls: ['./shipments-list.component.scss'],
})
export class ShipmentsListComponent {
  items$: Observable<Shipment[]> = this.shipmentsService.fetchAll();

  constructor(private shipmentsService: ShipmentsService) {}

  edit(item: Shipment): void {}
}
