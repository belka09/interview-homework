import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ModalRef } from '../../services/modal.service';
import { StatusChangeModalComponent } from './status-change-modal.component';

describe('StatusChangeModalComponent', () => {
  let component: StatusChangeModalComponent;
  let fixture: ComponentFixture<StatusChangeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, StatusChangeModalComponent],
      providers: [{ provide: ModalRef, useValue: { close: () => void 0 } }],
    }).compileComponents();

    fixture = TestBed.createComponent(StatusChangeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
