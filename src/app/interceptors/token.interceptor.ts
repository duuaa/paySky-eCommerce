import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    req: HttpRequest<any>,
    next: HttpHandler
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Observable<HttpEvent<any>> {
    // Get the token from local storage (or another method)

    // Clone the request and set the new header
    if (localStorage.getItem('token')) {
      const cloned = req.clone({
        headers: req.headers.set(
          'Authorization',
          `Bearer ${localStorage.getItem('token')}`
        ),
      });
      return next.handle(cloned);
    }

    return next.handle(req);
  }
}
