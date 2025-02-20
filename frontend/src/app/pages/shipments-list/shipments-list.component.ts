import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Shipment, ShipmentStatus } from 'src/app/core/models/shipmentItem';
import { Observable } from 'rxjs';
import { ShipmentsService } from 'src/app/core/services/shipment.service';
import { ShipmentItemComponent } from './shipmen-item/shipment-item.component';
import { ModalService } from 'src/app/core/services/modal.service';
import { StatusChangeModalComponent } from 'src/app/core/components/status-change-model/status-change-modal.component';

@Component({
  selector: 'app-shipments-list',
  standalone: true,
  imports: [CommonModule, RouterModule, ShipmentItemComponent],
  templateUrl: './shipments-list.component.html',
  styleUrls: ['./shipments-list.component.scss'],
})
export class ShipmentsListComponent {
  items$: Observable<Shipment[]> = this.shipmentsService.fetchAll();

  constructor(
    private shipmentsService: ShipmentsService,
    private modalService: ModalService
  ) {}

  edit(shipment: Shipment): void {
    const modalRef = this.modalService.open(StatusChangeModalComponent, {
      data: shipment,
    });

    modalRef.afterClosed.subscribe((updatedShipment: Shipment) => {
      if (updatedShipment) {
        this.shipmentsService
          .updateShipmentStatus(updatedShipment.id, updatedShipment.status)
          .subscribe(
            () => {
              console.log('Shipment status updated successfully');
              this.items$ = this.shipmentsService.fetchAll();
            },
            (error) => {
              console.error('Error updating shipment status', error);
            }
          );
      }
    });
  }
}
