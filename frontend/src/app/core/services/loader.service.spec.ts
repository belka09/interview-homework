import { TestBed } from '@angular/core/testing';
import { LoaderService } from './loader.service';

describe('LoaderService', () => {
  let service: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have loading$ = false by default', () => {
    let currentValue: boolean | undefined;
    service.loading$.subscribe((value) => (currentValue = value));
    expect(currentValue).toBeFalse();
  });

  it('should set loading$ to true when show() is called', () => {
    let currentValue: boolean | undefined;
    service.loading$.subscribe((value) => (currentValue = value));
    service.show();
    expect(currentValue).toBeTrue();
  });

  it('should set loading$ to false when hide() is called', () => {
    let currentValue: boolean | undefined;
    service.loading$.subscribe((value) => (currentValue = value));
    service.show();
    service.hide();
    expect(currentValue).toBeFalse();
  });
});
