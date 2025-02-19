import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ModalRef } from '../../services/modal.service';
import { AddToShipmentsModalComponent } from './add-to-shipments-modal.component';

describe('AddToShipmentsModalComponent', () => {
  let component: AddToShipmentsModalComponent;
  let fixture: ComponentFixture<AddToShipmentsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, AddToShipmentsModalComponent],
      providers: [{ provide: ModalRef, useValue: { close: () => void 0 } }],
    }).compileComponents();

    fixture = TestBed.createComponent(AddToShipmentsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
