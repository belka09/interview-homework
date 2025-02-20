import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShipmentItemComponent } from './shipment-item.component';
import { ShipmentsService } from 'src/app/core/services/shipment.service';
import { Shipment, ShipmentStatus } from 'src/app/core/models/shipmentItem';

describe('ShipmentItemComponent', () => {
  let component: ShipmentItemComponent;
  let fixture: ComponentFixture<ShipmentItemComponent>;
  let shipmentsServiceSpy: jasmine.SpyObj<ShipmentsService>;

  beforeEach(async () => {
    shipmentsServiceSpy = jasmine.createSpyObj('ShipmentsService', [
      'dummyMethod',
    ]);

    await TestBed.configureTestingModule({
      imports: [ShipmentItemComponent],
      providers: [{ provide: ShipmentsService, useValue: shipmentsServiceSpy }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipmentItemComponent);
    component = fixture.componentInstance;

    component.item = {
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

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return correct class for each status', () => {
    expect(component.getStatusClass(ShipmentStatus.Created)).toBe('created');
    expect(component.getStatusClass(ShipmentStatus.Shipped)).toBe('shipped');
    expect(component.getStatusClass(ShipmentStatus.Delivered)).toBe(
      'delivered'
    );
    expect(component.getStatusClass('UNKNOWN' as ShipmentStatus)).toBe('');
  });

  it('should emit editItem when the button is clicked', () => {
    spyOn(component.editItem, 'emit');

    const button: HTMLButtonElement =
      fixture.nativeElement.querySelector('.list-item--button');

    if (!button) {
      fail('Could not find the update status button in the template.');
      return;
    }

    button.click();
    expect(component.editItem.emit).toHaveBeenCalled();
  });
});
