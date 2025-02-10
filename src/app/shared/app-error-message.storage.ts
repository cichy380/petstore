import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({ providedIn: 'root' })
export class AppErrorMessageStorage extends StorageService<string | null> {
  constructor() {
    super(null);
  }
}
