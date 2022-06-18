import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserStoreService } from './user-store.service';

@Injectable()
export class WinesAppInterceptor implements HttpInterceptor {
  constructor(private userStore: UserStoreService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.userStore.token) {
      console.log('INTERCEPTING, HAS TOKEN', this.userStore.token);
      const authReq = request.clone({
        headers: request.headers.set('X-AUTH-HEADER', this.userStore.token),
      });
      console.log('Making an authorized request');
      request = authReq;
    }
    return next.handle(request);
  }
}
