import { Injectable } from '@angular/core';
import { StorageService } from '../../shared/StorageService';
import { PetListFilter } from '../api/PetListFilter';
import { PetStatus } from '../api/PetStatus';

@Injectable({ providedIn: 'root' })
export class PetListFilterStorage extends StorageService<PetListFilter> {
  constructor() {
    super(new PetListFilter(PetStatus.AVAILABLE));
  }
}
