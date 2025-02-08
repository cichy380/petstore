import { Injectable } from '@angular/core';
import { StorageService } from '../../shared/StorageService';
import { PetListPagination } from '../api/PetListPagination';

@Injectable({ providedIn: 'root' })
export class PetListPaginationStorage extends StorageService<PetListPagination> {
  constructor() {
    super(new PetListPagination(0));
  }
}
