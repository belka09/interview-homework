import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListItemComponent } from './list-item.component';
import { WarehouseItem } from '../../../core/models/warehouseItem';

describe('ListItemComponent', () => {
  let fixture: ComponentFixture<ListItemComponent>;
  let component: ListItemComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListItemComponent);
    component = fixture.componentInstance;

    component.item = {
      id: 1,
      name: 'Test Product',
      description: 'Test Description',
      imageUrl: 'test.jpg',
      quantity: 10,
      unitPrice: 99.99,
    } as WarehouseItem;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit editItem when the first button is clicked', () => {
    spyOn(component.editItem, 'emit');

    const buttons = fixture.nativeElement.querySelectorAll('button');
    buttons[0].click();

    expect(component.editItem.emit).toHaveBeenCalled();
  });

  it('should emit deleteItem when the second button is clicked', () => {
    spyOn(component.deleteItem, 'emit');

    const buttons = fixture.nativeElement.querySelectorAll('button');
    buttons[1].click();

    expect(component.deleteItem.emit).toHaveBeenCalled();
  });

  it('should emit addToShipment when the third button is clicked', () => {
    spyOn(component.addToShipment, 'emit');

    const buttons = fixture.nativeElement.querySelectorAll('button');
    buttons[2].click();

    expect(component.addToShipment.emit).toHaveBeenCalled();
  });
});
