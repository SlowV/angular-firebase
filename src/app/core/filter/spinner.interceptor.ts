import {Injectable, Pipe, PipeTransform} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {finalize} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Spinner implements HttpInterceptor {

  totalRequests = 0;

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.totalRequests++;

    return next.handle(request).pipe(
      finalize(() => {
        this.totalRequests--;
        if (this.totalRequests === 0) {
          setTimeout(() => {
            // this.store.dispatch(hideSpinner());
          }, 1500);
        }
      })
    );

  }


}
