import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
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
import { PetListFilter } from '../api/PetListFilter';
import { PetStatus } from '../api/PetStatus';
import { PetListSort, SortDirection } from '../api/PetListSort';
import { Pet } from '../api/Pet';
import { PetCategory } from '../api/PetCategory';
import { PetId } from '../api/PetId';
import { PetAnemia } from './anemia/PetAnemia';
import { PetConverter } from './converter/PetConverter';
import * as PetActions from './store/pet.actions';
import * as PetSelectors from './store/pet.selectors';

@Injectable()
export class PetStorage implements PetRepository {
  private readonly petListItems$ = combineLatest([
    this.store.pipe(select(PetSelectors.getAllPets)),
    this.selectPetListSearchQuery(),
    this.selectPetListPagination(),
    this.selectPetListSort(),
  ]).pipe(
    tap(() => this.fetchPetsIfStateIsInitial()),
    debounceTime(0),
    map(([pets, searchQuery, pagination, sort]) => {
      const filteredPets = this.mapPetFilterBySearchQuery(pets, searchQuery);
      const sortedPets = this.mapPetSort(filteredPets, sort);
      const paginatedPets = this.mapPetPagination(sortedPets, pagination);
      return {
        pets: paginatedPets,
        filteredPetCount: filteredPets.length,
      };
    }),
    tap(({ pets, filteredPetCount }) =>
      this.store.dispatch(
        PetActions.updateFilteredPetCount({ count: filteredPetCount }),
      ),
    ),
    map(({ pets }) => pets.map((pet) => PetConverter.toPetListItem(pet))),
    shareReplay({ refCount: true, bufferSize: 1 }),
  );

  constructor(
    private readonly store: Store,
    private readonly actions$: Actions,
  ) {}

  selectPetListItems(): Observable<PetListItem[]> {
    return this.petListItems$;
  }

  selectPet(petId: PetId): Observable<Pet> {
    return this.store.pipe(
      select(PetSelectors.getPetById(petId)),
      map((pet) => PetConverter.toPet(pet!)),
    );
  }

  selectTotalPetListItemsCount(): Observable<number> {
    return this.store.pipe(select(PetSelectors.getFilteredPetsCount));
  }

  selectPetCategories(): Observable<PetCategory[]> {
    return this.store.pipe(select(PetSelectors.getPetCategories));
  }

  selectPetListPagination(): Observable<PetListPagination> {
    return this.store.pipe(select(PetSelectors.getPetListPagination));
  }

  selectPetListFilter(): Observable<PetListFilter> {
    return this.store.pipe(select(PetSelectors.getPetListFilter));
  }

  selectPetListSort(): Observable<PetListSort | null> {
    return this.store.pipe(select(PetSelectors.getPetListSort));
  }

  selectPetListSearchQuery(): Observable<string> {
    return this.store.pipe(select(PetSelectors.getPetListSearchQuery));
  }

  selectLoading(): Observable<boolean> {
    return this.store.pipe(select(PetSelectors.getPetLoading));
  }

  createPet(pet: Pet): Observable<void> {
    this.store.dispatch(
      PetActions.createPet({ pet: PetConverter.toCreatePetRequest(pet) }),
    );
    return this.actions$.pipe(
      ofType(PetActions.createPetSuccess),
      map((_) => void 0),
    );
  }

  updatePet(pet: Pet): Observable<void> {
    this.store.dispatch(
      PetActions.updatePet({ pet: PetConverter.toUpdatePetRequest(pet) }),
    );
    return this.actions$.pipe(
      ofType(PetActions.updatePetSuccess),
      map((_) => void 0),
    );
  }

  deletePet(petId: PetId): Observable<void> {
    this.store.dispatch(PetActions.deletePet({ petId }));
    return this.actions$.pipe(
      ofType(PetActions.deletePetSuccess),
      map((_) => void 0),
    );
  }

  updatePetListFilter(filter: PetListFilter): void {
    this.store.dispatch(PetActions.updatePetListFilter({ filter }));
  }

  updatePetListPagination(pagination: PetListPagination): void {
    this.store.dispatch(PetActions.updatePetListPagination({ pagination }));
  }

  updatePetListSort(sort: PetListSort | null): void {
    this.store.dispatch(PetActions.updatePetListSort({ sort }));
  }

  updatePetListSearch(query: string): void {
    this.store.dispatch(PetActions.updatePetListSearchQuery({ query }));
  }

  private fetchPets(status: PetStatus): void {
    this.store.dispatch(PetActions.loadPets({ status }));
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
          ((a[sort.sortColumn] || '') as string).localeCompare(
            (b[sort.sortColumn] || '') as string,
          ),
        )
      : copyPets.sort((a, b) =>
          ((b[sort.sortColumn] || '') as string).localeCompare(
            (a[sort.sortColumn] || '') as string,
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
