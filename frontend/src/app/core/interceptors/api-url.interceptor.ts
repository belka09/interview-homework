import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoaderService } from '../services/loader.service';

@Injectable()
export class ApiUrlInterceptor implements HttpInterceptor {
  constructor(private loaderService: LoaderService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const startTime = Date.now();
    this.loaderService.show();

    const newRequest = request.clone({
      url: `${environment.apiUrl}/${request.url}`,
    });

    return next.handle(newRequest).pipe(
      finalize(() => {
        const diff = Date.now() - startTime;
        const minDelay = 500;
        const remaining = minDelay - diff;

        if (remaining > 0) {
          setTimeout(() => this.loaderService.hide(), remaining);
        } else {
          this.loaderService.hide();
        }
      })
    );
  }
}
