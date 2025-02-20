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
  selector: 'app-record-edit-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './record-edit-modal.component.html',
})
export class RecordEditModalComponent implements OnInit {
  @HostBinding('class.modal') classModal = true;
  editForm!: FormGroup;

  constructor(
    public modalRef: ModalRef,
    private fb: FormBuilder,
    @Inject('modal-data') public data: WarehouseItem
  ) {}

  ngOnInit(): void {
    this.editForm = this.fb.group({
      name: [this.data.name, Validators.required],
      description: [this.data.description],
      quantity: [this.data.quantity, [Validators.required, Validators.min(1)]],
      unitPrice: [
        this.data.unitPrice,
        [Validators.required, Validators.min(0)],
      ],
    });
  }

  save(): void {
    if (this.editForm.valid) {
      const updatedProduct: WarehouseItem = {
        ...this.data,
        ...this.editForm.value,
      };
      this.modalRef.close(updatedProduct);
    }
  }

  cancel(): void {
    this.modalRef.close();
  }
}
