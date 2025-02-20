import { Component, Inject, OnInit, HostBinding } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModalRef } from '../../services/modal.service';
import { Shipment, ShipmentStatus } from '../../models/shipmentItem';

@Component({
  selector: 'app-status-change-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './status-change-modal.component.html',
  styleUrls: ['./status-change-modal.component.scss'],
})
export class StatusChangeModalComponent implements OnInit {
  @HostBinding('class.modal') classModal = true;
  editForm!: FormGroup;

  shipmentStatus = ShipmentStatus;

  constructor(
    public modalRef: ModalRef,
    private fb: FormBuilder,
    @Inject('modal-data') public data: Shipment
  ) {}

  ngOnInit(): void {
    this.editForm = this.fb.group({
      status: [this.data.status, Validators.required],
    });
  }

  save(): void {
    if (this.editForm.valid) {
      const updatedShipment: Shipment = {
        ...this.data,
        status: this.editForm.value.status,
      };

      this.modalRef.close(updatedShipment);
    }
  }

  cancel(): void {
    this.modalRef.close();
  }
}
