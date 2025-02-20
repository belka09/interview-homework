import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatusChangeModalComponent } from './status-change-modal.component';
import { ModalRef } from '../../services/modal.service';
import { Shipment, ShipmentStatus } from '../../models/shipmentItem';
import { ReactiveFormsModule } from '@angular/forms';

describe('StatusChangeModalComponent', () => {
  let component: StatusChangeModalComponent;
  let fixture: ComponentFixture<StatusChangeModalComponent>;

  let modalRefSpy: jasmine.SpyObj<ModalRef>;

  const testShipment: Shipment = {
    id: 1,
    createdAt: new Date(),
    status: ShipmentStatus.Created,
    quantity: 5,
    product: {
      id: 10,
      name: 'Test Product',
      imageUrl: 'test.jpg',
      description: 'A test product',
      quantity: 10,
      unitPrice: 99.99,
    },
  };

  beforeEach(async () => {
    modalRefSpy = jasmine.createSpyObj<ModalRef>('ModalRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [StatusChangeModalComponent, ReactiveFormsModule],
      providers: [
        { provide: ModalRef, useValue: modalRefSpy },
        { provide: 'modal-data', useValue: testShipment },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusChangeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with the given shipment status', () => {
    expect(component.editForm.value.status).toBe(ShipmentStatus.Created);
  });

  it('should call modalRef.close with updated shipment on save if form is valid', () => {
    component.editForm.setValue({ status: ShipmentStatus.Delivered });

    component.save();

    expect(modalRefSpy.close).toHaveBeenCalledWith({
      ...testShipment,
      status: ShipmentStatus.Delivered,
    });
  });

  it('should call modalRef.close without data on cancel', () => {
    component.cancel();
    expect(modalRefSpy.close).toHaveBeenCalledWith();
  });
});
