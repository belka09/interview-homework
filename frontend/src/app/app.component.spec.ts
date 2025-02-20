import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { LoaderService } from './core/services/loader.service';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let loaderServiceSpy: jasmine.SpyObj<LoaderService>;

  beforeEach(async () => {
    loaderServiceSpy = jasmine.createSpyObj<LoaderService>(
      'LoaderService',
      ['show', 'hide'],
      {}
    );

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [{ provide: LoaderService, useValue: loaderServiceSpy }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have title 'warehouse'`, () => {
    expect(component.title).toBe('warehouse');
  });

  it('should inject LoaderService', () => {
    expect(component.loaderService).toBe(loaderServiceSpy);
  });
});
