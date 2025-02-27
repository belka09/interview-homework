import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { ProductsService } from 'src/app/core/services/products.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { RecordEditModalComponent } from 'src/app/core/components/record-edit-modal/record-edit-modal.component';
import { ListItemComponent } from './list-item/list-item.component';
import { WarehouseItem } from '../../core/models/warehouseItem';
import { AddToShipmentsModalComponent } from 'src/app/core/components/add-to-shipments-modal/add-to-shipments-modal.component';
import { ShipmentsService } from 'src/app/core/services/shipment.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-items-list',
  standalone: true,
  imports: [CommonModule, ListItemComponent],
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss'],
})
export class ItemsListComponent {
  items$: Observable<WarehouseItem[]> = this.productsService.fetchAll();

  constructor(
    private productsService: ProductsService,
    private modalService: ModalService,
    private shipmentsService: ShipmentsService,
    private toastService: ToastService
  ) {}

  addItemToShipment(product: WarehouseItem): void {
    const modalRef = this.modalService.open(AddToShipmentsModalComponent, {
      data: product,
    });

    modalRef.afterClosed.subscribe(
      (shipmentData: { quantity: number; product: WarehouseItem }) => {
        if (shipmentData) {
          const newShipment = {
            productId: shipmentData.product.id,
            quantity: shipmentData.quantity,
          };

          this.shipmentsService.createShipment(newShipment).subscribe(
            () => {
              this.toastService.showSuccess('Shipment created successfully!');
              this.items$ = this.productsService.fetchAll();
            },
            () => {
              this.toastService.showError('Error creating shipment');
            }
          );
        }
      }
    );
  }

  edit(product: WarehouseItem): void {
    const modalRef = this.modalService.open(RecordEditModalComponent, {
      data: product,
    });

    modalRef.afterClosed.subscribe((updatedProduct: WarehouseItem) => {
      if (updatedProduct) {
        this.productsService
          .updateProduct(updatedProduct.id, updatedProduct)
          .subscribe(
            () => {
              this.items$ = this.productsService.fetchAll();
              this.toastService.showSuccess('Product updated successfully!');
            },
            () => {
              this.toastService.showError('Error updating product');
            }
          );
      }
    });
  }

  delete(id: number): void {
    this.productsService.deleteProduct(id).subscribe(() => {
      this.items$ = this.productsService.fetchAll();
    });
  }
}
