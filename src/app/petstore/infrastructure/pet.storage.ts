import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  Observable,
  shareReplay,
  tap,
} from 'rxjs';
import { map } from 'rxjs/operators';
import { PetRepository } from '../domain/pet.repository';
import { PetListItem } from '../api/PetListItem';
import { PetListPagination } from '../api/PetListPagination';
import { PetListPaginationStorage } from './pet-list-pagination.storage';
import { PetConverter } from './converter/PetConverter';
import * as PetSelectors from './store/pet.selectors';
import * as PetActions from './store/pet.actions';
import { PetListFilter } from '../api/PetListFilter';
import { PetListFilterStorage } from './pet-list-filter.storage';
import { PetStatus } from '../api/PetStatus';
import { PetAnemia } from './anemia/PetAnemia';

@Injectable()
export class PetStorage implements PetRepository {
  petListItems$ = combineLatest([
    this.store.pipe(select(PetSelectors.getAllPets)),
    this.selectPetListPagination(),
    this.selectPetListFilter().pipe(
      tap((filter) => this.fetchPets(filter.filterStatus)),
      map((_) => void 0),
      distinctUntilChanged(),
    ),
  ]).pipe(
    debounceTime(0),
    map(([pets, pagination]) => this.mapPetPagination(pets, pagination)),
    map((pets) => pets.map((pet) => PetConverter.toPetListItem(pet))),
    shareReplay({ refCount: true, bufferSize: 1 }),
  );

  constructor(
    private readonly store: Store,
    private readonly petListPaginationStorage: PetListPaginationStorage,
    private readonly petListFilterStorage: PetListFilterStorage,
  ) {}

  selectPetListItems(): Observable<PetListItem[]> {
    return this.petListItems$;
  }

  selectTotalPetsCount(): Observable<number> {
    return this.store.pipe(select(PetSelectors.getTotalPetsCount));
  }

  selectPetListPagination(): Observable<PetListPagination> {
    return this.petListPaginationStorage.select();
  }

  selectPetListFilter(): Observable<PetListFilter> {
    return this.petListFilterStorage.select();
  }

  fetchPets(status: PetStatus = PetStatus.SOLD): void {
    this.store.dispatch(PetActions.loadPets({ status }));
  }

  updatePetListPagination(pagination: PetListPagination): void {
    this.petListPaginationStorage.set(pagination);
  }

  updatePetListFilter(filter: PetListFilter): void {
    this.petListFilterStorage.set(filter);
  }

  private mapPetPagination(pets: PetAnemia[], pagination: PetListPagination) {
    return pets.slice(
      pagination.pageIndex * pagination.pageSize,
      (pagination.pageIndex + 1) * pagination.pageSize,
    );
  }
}
