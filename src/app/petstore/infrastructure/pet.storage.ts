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
import { PetListSort, SortDirection } from '../api/PetListSort';
import { PetListSortStorage } from './pet-list-sort.storage';

@Injectable()
export class PetStorage implements PetRepository {
  petListItems$ = combineLatest([
    this.store.pipe(select(PetSelectors.getAllPets)),
    this.selectPetListPagination(),
    this.selectPetListSort(),
    this.selectPetListFilter().pipe(
      tap((filter) => this.fetchPets(filter.filterStatus)),
      map((_) => void 0),
      distinctUntilChanged(),
    ),
  ]).pipe(
    debounceTime(0),
    map(([pets, pagination, sort]) => ({
      pets: this.mapPetSort(pets, sort),
      pagination,
    })),
    map(({ pets, pagination }) => this.mapPetPagination(pets, pagination)),
    map((pets) => pets.map((pet) => PetConverter.toPetListItem(pet))),
    shareReplay({ refCount: true, bufferSize: 1 }),
  );

  constructor(
    private readonly store: Store,
    private readonly petListPaginationStorage: PetListPaginationStorage,
    private readonly petListFilterStorage: PetListFilterStorage,
    private readonly petListSortStorage: PetListSortStorage,
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

  selectPetListSort(): Observable<PetListSort | null> {
    return this.petListSortStorage.select();
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

  updatePetListSort(sort: PetListSort | null): void {
    this.petListSortStorage.set(sort);
  }

  private mapPetPagination(pets: PetAnemia[], pagination: PetListPagination) {
    return pets.slice(
      pagination.pageIndex * pagination.pageSize,
      (pagination.pageIndex + 1) * pagination.pageSize,
    );
  }

  private mapPetSort(pets: PetAnemia[], sort: PetListSort | null): PetAnemia[] {
    if (sort === null) {
      return pets;
    }

    const copyPets = [...pets];

    return sort.sortDirection === SortDirection.ASC
      ? copyPets.sort((a, b) =>
          ((b[sort.sortColumn] || '') as string).localeCompare(
            (a[sort.sortColumn] || '') as string,
          ),
        )
      : copyPets.sort((a, b) =>
          ((a[sort.sortColumn] || '') as string).localeCompare(
            (b[sort.sortColumn] || '') as string,
          ),
        );
  }
}
