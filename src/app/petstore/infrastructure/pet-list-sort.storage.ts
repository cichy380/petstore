import { Injectable } from '@angular/core';
import { StorageService } from '../../shared/StorageService';
import { PetListSort } from '../api/PetListSort';

@Injectable({ providedIn: 'root' })
export class PetListSortStorage extends StorageService<PetListSort | null> {
  constructor() {
    super(null);
  }
}
