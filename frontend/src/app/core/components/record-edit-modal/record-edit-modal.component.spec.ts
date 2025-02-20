import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecordEditModalComponent } from './record-edit-modal.component';
import { ModalRef } from '../../services/modal.service';
import { WarehouseItem } from '../../models/warehouseItem';
import { ReactiveFormsModule } from '@angular/forms';

describe('RecordEditModalComponent', () => {
  let fixture: ComponentFixture<RecordEditModalComponent>;
  let component: RecordEditModalComponent;
  let modalRefSpy: jasmine.SpyObj<ModalRef>;

  const mockProduct: WarehouseItem = {
    id: 1,
    name: 'Test Product',
    description: 'A test product',
    imageUrl: 'test.jpg',
    quantity: 10,
    unitPrice: 99.99,
  };

  beforeEach(async () => {
    modalRefSpy = jasmine.createSpyObj<ModalRef>('ModalRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [RecordEditModalComponent, ReactiveFormsModule],
      providers: [
        { provide: ModalRef, useValue: modalRefSpy },
        { provide: 'modal-data', useValue: mockProduct },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with product data', () => {
    const formValues = component.editForm.value;
    expect(formValues.name).toBe(mockProduct.name);
    expect(formValues.description).toBe(mockProduct.description);
    expect(formValues.quantity).toBe(mockProduct.quantity);
    expect(formValues.unitPrice).toBe(mockProduct.unitPrice);
  });

  it('should call modalRef.close with updated product on save if form is valid', () => {
    component.editForm.setValue({
      name: 'Updated Name',
      description: 'Updated Description',
      quantity: 5,
      unitPrice: 123.45,
    });

    component.save();

    expect(modalRefSpy.close).toHaveBeenCalledWith({
      ...mockProduct,
      name: 'Updated Name',
      description: 'Updated Description',
      quantity: 5,
      unitPrice: 123.45,
    });
  });

  it('should not close with data if the form is invalid', () => {
    component.editForm.setValue({
      name: 'Updated Name',
      description: 'Updated Description',
      quantity: 0,
      unitPrice: 100,
    });

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
