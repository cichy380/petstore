import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppErrorMessageStorage } from './shared/app-error-message-storage';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

const errorSnackBarConfig: MatSnackBarConfig = {
  duration: 5000,
  verticalPosition: 'top',
  panelClass: 'error-snackbar',
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  providers: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  private readonly snackBar = inject(MatSnackBar);
  private readonly destroyRef = inject(DestroyRef);

  constructor(
    private readonly appErrorMessageStorage: AppErrorMessageStorage,
  ) {}

  ngOnInit() {
    this.observeErrorMessage();
  }

  observeErrorMessage() {
    this.appErrorMessageStorage
      .select()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(
        (message) =>
          message && this.snackBar.open(message, 'Close', errorSnackBarConfig),
      );
  }
}
