import { Component, Inject, OnInit, HostBinding } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModalRef } from '../../services/modal.service';
import { WarehouseItem } from '../../models/warehouseItem';

@Component({
  selector: 'app-modal-add-to-shipments',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-to-shipments-modal.component.html',
  styleUrls: ['./add-to-shipments-modal.component.scss'],
})
export class AddToShipmentsModalComponent implements OnInit {
  @HostBinding('class.modal') classModal = true;
  editForm!: FormGroup;

  constructor(
    public modalRef: ModalRef,
    private fb: FormBuilder,
    @Inject('modal-data') public data: WarehouseItem
  ) {}

  ngOnInit(): void {
    this.editForm = this.fb.group({
      quantity: [1, [Validators.required, Validators.min(1)]],
    });
  }

  save(): void {
    if (this.editForm.valid) {
      const shipmentData = {
        quantity: this.editForm.value.quantity,
        product: this.data,
      };
      this.modalRef.close(shipmentData);
    }
  }

  cancel(): void {
    this.modalRef.close();
  }
}
