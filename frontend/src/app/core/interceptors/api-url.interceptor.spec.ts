import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpRequest,
} from '@angular/common/http';
import { ApiUrlInterceptor } from './api-url.interceptor';
import { LoaderService } from '../services/loader.service';
import { environment } from 'src/environments/environment';

describe('ApiUrlInterceptor (simplified)', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;
  let loaderService: jasmine.SpyObj<LoaderService>;

  beforeEach(() => {
    const loaderServiceSpy = jasmine.createSpyObj<LoaderService>([
      'show',
      'hide',
    ]);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: LoaderService, useValue: loaderServiceSpy },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ApiUrlInterceptor,
          multi: true,
        },
      ],
    });

    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    loaderService = TestBed.inject(
      LoaderService
    ) as jasmine.SpyObj<LoaderService>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should prepend environment.apiUrl to the request', () => {
    http.get('/some-path').subscribe();

    const req = httpMock.expectOne((r: HttpRequest<unknown>) => {
      return (
        r.method === 'GET' &&
        r.url.includes(environment.apiUrl) &&
        r.url.includes('/some-path')
      );
    });

    expect(req.request.url).toContain(environment.apiUrl);
    expect(req.request.url).toContain('/some-path');
    req.flush({});
  });

  it('should call loaderService.show() on request start', () => {
    http.get('/some-path').subscribe();
    const req = httpMock.expectOne(() => true);
    req.flush({});

    expect(loaderService.show).toHaveBeenCalled();
  });

  it('should call loaderService.hide() after a minimum delay', fakeAsync(() => {
    http.get('/some-path').subscribe();

    const req = httpMock.expectOne(() => true);
    req.flush({});

    expect(loaderService.hide).not.toHaveBeenCalled();

    tick(500);

    expect(loaderService.hide).toHaveBeenCalled();
  }));
});
