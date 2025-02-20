import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShipmentsListComponent } from './shipments-list.component';
import { ShipmentsService } from 'src/app/core/services/shipment.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { of, throwError, Subject } from 'rxjs';
import { Shipment, ShipmentStatus } from 'src/app/core/models/shipmentItem';
import { WarehouseItem } from 'src/app/core/models/warehouseItem';
import { StatusChangeModalComponent } from 'src/app/core/components/status-change-model/status-change-modal.component';

describe('ShipmentsListComponent', () => {
  let component: ShipmentsListComponent;
  let fixture: ComponentFixture<ShipmentsListComponent>;
  let shipmentsService: jasmine.SpyObj<ShipmentsService>;
  let modalService: jasmine.SpyObj<ModalService>;

  beforeEach(async () => {
    const shipmentsServiceSpy = jasmine.createSpyObj<ShipmentsService>(
      'ShipmentsService',
      ['fetchAll', 'updateShipmentStatus']
    );
    const modalServiceSpy = jasmine.createSpyObj<ModalService>('ModalService', [
      'open',
    ]);

    await TestBed.configureTestingModule({
      imports: [ShipmentsListComponent],
      providers: [
        { provide: ShipmentsService, useValue: shipmentsServiceSpy },
        { provide: ModalService, useValue: modalServiceSpy },
      ],
    }).compileComponents();

    shipmentsService = TestBed.inject(
      ShipmentsService
    ) as jasmine.SpyObj<ShipmentsService>;
    modalService = TestBed.inject(ModalService) as jasmine.SpyObj<ModalService>;
  });

  beforeEach(() => {
    shipmentsService.fetchAll.and.returnValue(of([]));

    fixture = TestBed.createComponent(ShipmentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch shipments on init', () => {
    expect(shipmentsService.fetchAll).toHaveBeenCalled();
    let result: Shipment[] | undefined;
    component.items$.subscribe((items) => (result = items));
    expect(result).toEqual([]);
  });

  describe('#edit', () => {
    let afterClosed$: Subject<Shipment | undefined>;

    beforeEach(() => {
      afterClosed$ = new Subject<Shipment | undefined>();

      modalService.open.and.returnValue({
        afterClosed: afterClosed$.asObservable(),
      } as any);
    });

    it('should open the modal with the given shipment data', () => {
      const testProduct: WarehouseItem = {
        id: 10,
        name: 'Test Product',
        unitPrice: 100,
        quantity: 50,
        imageUrl: 'dummy.jpg',
        description: 'Test description',
      };

      const testShipment: Shipment = {
        id: 1,
        createdAt: new Date(),
        status: ShipmentStatus.Created,
        quantity: 5,
        product: testProduct,
      };

      component.edit(testShipment);

      expect(modalService.open).toHaveBeenCalledWith(
        StatusChangeModalComponent,
        {
          data: testShipment,
        }
      );
    });

    it('should not call updateShipmentStatus if modal returns undefined', () => {
      component.edit({} as Shipment);

      afterClosed$.next(undefined);
      afterClosed$.complete();

      expect(shipmentsService.updateShipmentStatus).not.toHaveBeenCalled();
    });

    it('should call updateShipmentStatus if modal returns updated shipment', () => {
      shipmentsService.fetchAll.and.returnValue(of([{ id: 2 } as Shipment]));

      const updatedShipment: Shipment = {
        id: 1,
        createdAt: new Date(),
        status: ShipmentStatus.Shipped,
        quantity: 10,
        product: {
          id: 101,
          name: 'Updated Product',
          unitPrice: 150,
          quantity: 10,
          imageUrl: 'dummy.jpg',
          description: 'Updated desc',
        },
      };

      shipmentsService.updateShipmentStatus.and.returnValue(
        of(updatedShipment)
      );

      component.edit({} as Shipment);

      afterClosed$.next(updatedShipment);
      afterClosed$.complete();

      expect(shipmentsService.updateShipmentStatus).toHaveBeenCalledWith(
        updatedShipment.id,
        updatedShipment.status
      );
      expect(shipmentsService.fetchAll).toHaveBeenCalled();
    });

    it('should log an error if updateShipmentStatus fails', () => {
      spyOn(console, 'error');

      const updatedShipment: Shipment = {
        id: 1,
        createdAt: new Date(),
        status: ShipmentStatus.Shipped,
        quantity: 10,
        product: {
          id: 101,
          name: 'Updated Product',
          unitPrice: 150,
          quantity: 10,
          imageUrl: 'dummy.jpg',
          description: 'Updated desc',
        },
      };

      shipmentsService.updateShipmentStatus.and.returnValue(
        throwError(() => new Error('Update failed'))
      );

      component.edit({} as Shipment);

      afterClosed$.next(updatedShipment);
      afterClosed$.complete();

      expect(shipmentsService.updateShipmentStatus).toHaveBeenCalled();
      expect(console.error).toHaveBeenCalledWith(
        'Error updating shipment status',
        jasmine.any(Error)
      );
    });
  });
});
