import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastComponent } from './toast.component';
import { ToastService, ToastMessage } from '../../services/toast.service';
import { Subject } from 'rxjs';

describe('ToastComponent', () => {
  let fixture: ComponentFixture<ToastComponent>;
  let component: ToastComponent;
  let toastServiceSpy: jasmine.SpyObj<ToastService>;
  let toastsSubject: Subject<ToastMessage[]>;

  beforeEach(async () => {
    toastsSubject = new Subject<ToastMessage[]>();

    toastServiceSpy = jasmine.createSpyObj<ToastService>('ToastService', [], {
      toasts$: toastsSubject.asObservable(),
    });

    await TestBed.configureTestingModule({
      imports: [ToastComponent],
      providers: [{ provide: ToastService, useValue: toastServiceSpy }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
