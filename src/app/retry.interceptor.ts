import { HttpInterceptorFn } from '@angular/common/http';
import { delay, of, retry, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const retryInterceptor: HttpInterceptorFn = (req, next) => {
  const MAX_RETRIES = 3;
  const RETRY_DELAY_MS = 1000;

  return next(req).pipe(
    retry({
      count: MAX_RETRIES,
      delay: (error, retryCount) => {
        if (
          (error.status === 0 || (error.status >= 500 && error.status < 600)) &&
          retryCount < MAX_RETRIES
        ) {
          return of(error).pipe(delay(RETRY_DELAY_MS));
        } else {
          return throwError(() => error);
        }
      },
    }),
    catchError((error) => throwError(() => error)),
  );
};
