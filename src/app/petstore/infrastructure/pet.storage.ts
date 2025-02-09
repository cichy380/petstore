import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  combineLatest,
  debounceTime,
  Observable,
  shareReplay,
  take,
  tap,
  withLatestFrom,
} from 'rxjs';
import { map } from 'rxjs/operators';
import { PetRepository } from '../domain/pet.repository';
import { PetListItem } from '../api/PetListItem';
import { PetListPagination } from '../api/PetListPagination';
import { PetConverter } from './converter/PetConverter';
import * as PetSelectors from './store/pet.selectors';
import * as PetActions from './store/pet.actions';
import { PetListFilter } from '../api/PetListFilter';
import { PetStatus } from '../api/PetStatus';
import { PetAnemia } from './anemia/PetAnemia';
import { PetListSort, SortDirection } from '../api/PetListSort';
import { PetListSortStorage } from './pet-list-sort.storage';

@Injectable()
export class PetStorage implements PetRepository {
  petListItems$ = combineLatest([
    this.store.pipe(select(PetSelectors.getAllPets)),
    this.selectPetListSearchQuery(),
    this.selectPetListPagination(),
    this.selectPetListSort(),
  ]).pipe(
    tap(() => this.fetchPetsIfStateIsInitial()),
    debounceTime(0),
    map(([pets, searchQuery, pagination, sort]) => ({
      pets,
      searchQuery,
      pagination,
      sort,
    })),
    map((combinedData) => ({
      ...combinedData,
      pets: this.mapPetFilterBySearchQuery(
        combinedData.pets,
        combinedData.searchQuery,
      ),
    })),
    map((combinedData) => ({
      ...combinedData,
      pets: this.mapPetSort(combinedData.pets, combinedData.sort),
    })),
    tap(({ pets }) =>
      this.store.dispatch(
        PetActions.updateFilteredPetCount({ count: pets.length }),
      ),
    ),
    map((combinedData) => ({
      ...combinedData,
      pets: this.mapPetPagination(combinedData.pets, combinedData.pagination),
    })),
    map((combinedData) =>
      combinedData.pets.map((pet) => PetConverter.toPetListItem(pet)),
    ),
    shareReplay({ refCount: true, bufferSize: 1 }),
  );

  constructor(
    private readonly store: Store,
    private readonly petListSortStorage: PetListSortStorage,
  ) {}

  selectPetListItems(): Observable<PetListItem[]> {
    return this.petListItems$;
  }

  selectTotalPetListItemsCount(): Observable<number> {
    return this.store.pipe(select(PetSelectors.getFilteredPetsCount));
  }

  selectPetListPagination(): Observable<PetListPagination> {
    return this.store.pipe(select(PetSelectors.getPetListPagination));
  }

  selectPetListFilter(): Observable<PetListFilter> {
    return this.store.pipe(select(PetSelectors.getPetListFilter));
  }

  selectPetListSort(): Observable<PetListSort | null> {
    return this.petListSortStorage.select();
  }

  selectPetListSearchQuery(): Observable<string> {
    return this.store.pipe(select(PetSelectors.getPetListSearchQuery));
  }

  fetchPets(status: PetStatus = PetStatus.SOLD): void {
    this.store.dispatch(PetActions.loadPets({ status }));
  }

  updatePetListFilter(filter: PetListFilter): void {
    this.store.dispatch(PetActions.updatePetListFilter({ filter }));
  }

  updatePetListPagination(pagination: PetListPagination): void {
    this.store.dispatch(PetActions.updatePetListPagination({ pagination }));
  }

  updatePetListSort(sort: PetListSort | null): void {
    this.petListSortStorage.set(sort);
  }

  updatePetListSearch(query: string): void {
    this.store.dispatch(PetActions.updatePetListSearchQuery({ query }));
  }

  private mapPetFilterBySearchQuery(
    pets: PetAnemia[],
    searchQuery: string,
  ): PetAnemia[] {
    return pets.filter(
      (pet) =>
        pet.petName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pet.petCategoryName?.toLowerCase().includes(searchQuery.toLowerCase()),
    );
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

  private fetchPetsIfStateIsInitial() {
    this.store
      .pipe(select(PetSelectors.getIsInitialState), take(1))
      .pipe(withLatestFrom(this.selectPetListFilter()))
      .subscribe(
        ([isInitialState, { filterStatus }]) =>
          isInitialState && this.fetchPets(filterStatus),
      );
  }
}
