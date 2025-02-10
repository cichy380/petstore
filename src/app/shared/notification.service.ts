import { inject, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

const errorSnackBarConfig: MatSnackBarConfig = {
  duration: 5000,
  verticalPosition: 'top',
  panelClass: 'error-snackbar',
};

const successSnackBarConfig: MatSnackBarConfig = {
  duration: 3000,
  verticalPosition: 'top',
};

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private readonly snackBar = inject(MatSnackBar);

  showError(message: string) {
    this.snackBar.open(message, 'Close', errorSnackBarConfig);
  }

  showSuccess(message: string) {
    this.snackBar.open(message, 'Close', successSnackBarConfig);
  }
}
