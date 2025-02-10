import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AppErrorMessageStorage } from './shared/app-error-message.storage';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const errorMessageStorage = inject(AppErrorMessageStorage);

  return next(req).pipe(
    catchError((error) => {
      if (error.status >= 500) {
        errorMessageStorage.set('A server error occurred');
      } else if (error.status === 0) {
        errorMessageStorage.set('No internet connection');
      }
      return throwError(() => error);
    }),
  );
};
