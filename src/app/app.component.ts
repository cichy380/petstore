import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AppErrorMessageStorage } from './shared/app-error-message.storage';
import { NotificationService } from './shared/notification.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule, MatIconModule, MatButtonModule],
  providers: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  private readonly notificationService = inject(NotificationService);
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
        (message) => message && this.notificationService.showError(message),
      );
  }
}
