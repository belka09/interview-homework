import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddToShipmentsModalComponent } from './add-to-shipments-modal.component';
import { ModalRef } from '../../services/modal.service';
import { WarehouseItem } from '../../models/warehouseItem';
import { ReactiveFormsModule } from '@angular/forms';

describe('AddToShipmentsModalComponent', () => {
  let fixture: ComponentFixture<AddToShipmentsModalComponent>;
  let component: AddToShipmentsModalComponent;
  let modalRefSpy: jasmine.SpyObj<ModalRef>;

  const mockProduct: WarehouseItem = {
    id: 1,
    name: 'Test Product',
    description: 'Some description',
    imageUrl: 'test.jpg',
    quantity: 50,
    unitPrice: 99.99,
  };

  beforeEach(async () => {
    modalRefSpy = jasmine.createSpyObj<ModalRef>('ModalRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [AddToShipmentsModalComponent, ReactiveFormsModule],
      providers: [
        { provide: ModalRef, useValue: modalRefSpy },
        { provide: 'modal-data', useValue: mockProduct },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToShipmentsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with quantity = 1', () => {
    expect(component.editForm.value.quantity).toBe(1);
  });

  it('should call modalRef.close with shipment data on save if form is valid', () => {
    component.editForm.setValue({ quantity: 5 });
    component.save();

    expect(modalRefSpy.close).toHaveBeenCalledWith({
      quantity: 5,
      product: mockProduct,
    });
  });

  it('should not close with data if form is invalid (e.g., quantity < 1)', () => {
    component.editForm.setValue({ quantity: 0 });
    component.save();

    expect(modalRefSpy.close).not.toHaveBeenCalledWith(
      jasmine.objectContaining({ quantity: 0 })
    );
  });

  it('should close without data on cancel', () => {
    component.cancel();
    expect(modalRefSpy.close).toHaveBeenCalledWith();
  });
});
