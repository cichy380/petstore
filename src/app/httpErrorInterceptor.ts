import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

const errorSnackBarConfig: MatSnackBarConfig = {
  duration: 5000,
  verticalPosition: 'top',
  panelClass: 'error-snackbar',
};

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const snackBar = inject(MatSnackBar);

  return next(req).pipe(
    catchError((error) => {
      if (error.status >= 500) {
        snackBar.open('A server error occurred', 'Close', errorSnackBarConfig);
      } else if (error.status === 0) {
        snackBar.open('No internet connection', 'Close', errorSnackBarConfig);
      }
      return throwError(() => error);
    }),
  );
};
