import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { ProductsService } from 'src/app/core/services/products.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { RecordEditModalComponent } from 'src/app/core/components/record-edit-modal/record-edit-modal.component';

import { ListItemComponent } from './list-item/list-item.component';
import { WarehouseItem } from '../../core/models/warehouseItem';

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
    private modalService: ModalService
  ) {}

  addItemToShipment(id: number): void {
    // this.itemsMockService.addToShipment(id);
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
              console.log('Product updated successfully');
            },
            (error) => {
              console.error('Error updating product', error);
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
