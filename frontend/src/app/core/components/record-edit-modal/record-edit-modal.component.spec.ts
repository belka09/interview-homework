import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { RecordEditModalComponent } from './record-edit-modal.component';
import { ModalRef } from '../../services/modal.service';

describe('RecordEditModalComponent', () => {
  let component: RecordEditModalComponent;
  let fixture: ComponentFixture<RecordEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RecordEditModalComponent],
      providers: [{ provide: ModalRef, useValue: { close: () => void 0 } }],
    }).compileComponents();

    fixture = TestBed.createComponent(RecordEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
