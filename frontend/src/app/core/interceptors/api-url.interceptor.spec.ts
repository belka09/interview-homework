import { TestBed } from '@angular/core/testing';

import { ApiUrlInterceptor } from './api-url.interceptor';
import { HttpRequest, HttpEvent, HttpResponse, HttpHandler } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

describe('ApiUrlInterceptor', () => {
  let mockHandler: jasmine.SpyObj<HttpHandler>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiUrlInterceptor],
    });
    mockHandler = jasmine.createSpyObj('handler', ['handle']);
    mockHandler.handle.and.callFake((req) => of(new HttpResponse(req)));
  });

  it('should be created', () => {
    const interceptor: ApiUrlInterceptor = TestBed.inject(ApiUrlInterceptor);
    expect(interceptor).toBeTruthy();
  });

  it('should return a URL containing the API baseUrl', (done) => {
    const interceptor: ApiUrlInterceptor = TestBed.inject(ApiUrlInterceptor);
    const reqUrl = '/some/endpoint';

    interceptor.intercept(new HttpRequest('GET', reqUrl), mockHandler).subscribe((res) => {
      expect(mockHandler.handle).toHaveBeenCalledWith(
        jasmine.objectContaining({
          url: `${environment.api.baseUrl}/${reqUrl}`,
        }),
      );

      done();
    });
  });
});
