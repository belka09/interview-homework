import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ToastService, ToastType, ToastMessage } from './toast.service';

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a success toast and remove it after 2 seconds', fakeAsync(() => {
    let capturedToasts: ToastMessage[] = [];

    const subscription = service.toasts$.subscribe((toasts) => {
      capturedToasts = toasts;
    });

    expect(capturedToasts.length).toBe(0);

    service.showSuccess('Operation successful');
    expect(capturedToasts.length).toBe(1);
    expect(capturedToasts[0].type).toBe(ToastType.Success);
    expect(capturedToasts[0].text).toBe('Operation successful');

    tick(2000);

    expect(capturedToasts.length).toBe(0);

    subscription.unsubscribe();
  }));
});
