import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ItemsListComponent } from './items-list.component';
import { ProductsService } from 'src/app/core/services/products.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { ShipmentsService } from 'src/app/core/services/shipment.service';
import { WarehouseItem } from 'src/app/core/models/warehouseItem';

describe('ItemsListComponent', () => {
  let component: ItemsListComponent;
  let fixture: ComponentFixture<ItemsListComponent>;

  let productsServiceSpy: jasmine.SpyObj<ProductsService>;
  let modalServiceSpy: jasmine.SpyObj<ModalService>;
  let shipmentsServiceSpy: jasmine.SpyObj<ShipmentsService>;

  beforeEach(async () => {
    const pSpy = jasmine.createSpyObj('ProductsService', [
      'fetchAll',
      'getProductById',
      'updateProduct',
      'deleteProduct',
    ]);
    const mSpy = jasmine.createSpyObj('ModalService', ['open']);
    const sSpy = jasmine.createSpyObj('ShipmentsService', ['createShipment']);

    await TestBed.configureTestingModule({
      imports: [ItemsListComponent],
      providers: [
        { provide: ProductsService, useValue: pSpy },
        { provide: ModalService, useValue: mSpy },
        { provide: ShipmentsService, useValue: sSpy },
      ],
    }).compileComponents();

    productsServiceSpy = TestBed.inject(
      ProductsService
    ) as jasmine.SpyObj<ProductsService>;
    modalServiceSpy = TestBed.inject(
      ModalService
    ) as jasmine.SpyObj<ModalService>;
    shipmentsServiceSpy = TestBed.inject(
      ShipmentsService
    ) as jasmine.SpyObj<ShipmentsService>;
  });

  beforeEach(() => {
    productsServiceSpy.fetchAll.and.returnValue(of([]));

    fixture = TestBed.createComponent(ItemsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call addItemToShipment and open a modal', () => {
    const mockProduct: WarehouseItem = {
      id: 123,
      name: 'Test Product',
      description: 'desc',
      imageUrl: 'test.jpg',
      quantity: 10,
      unitPrice: 99.99,
    };
    productsServiceSpy.getProductById.and.returnValue(of(mockProduct));

    const afterClosed$ = of(null);
    modalServiceSpy.open.and.returnValue({ afterClosed: afterClosed$ } as any);

    component.addItemToShipment(123);

    expect(productsServiceSpy.getProductById).toHaveBeenCalledWith(123);
    expect(modalServiceSpy.open).toHaveBeenCalled();
  });

  it('should call edit and open a modal', () => {
    const mockProduct: WarehouseItem = {
      id: 1,
      name: 'Test Product',
      description: 'desc',
      imageUrl: 'test.jpg',
      quantity: 10,
      unitPrice: 99.99,
    };
    modalServiceSpy.open.and.returnValue({ afterClosed: of(null) } as any);

    component.edit(mockProduct);

    expect(modalServiceSpy.open).toHaveBeenCalled();
  });

  it('should call delete with the correct ID', () => {
    productsServiceSpy.deleteProduct.and.returnValue(of({}));

    component.delete(999);
    expect(productsServiceSpy.deleteProduct).toHaveBeenCalledWith(999);
  });
});
