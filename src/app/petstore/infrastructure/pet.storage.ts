import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PetRepository } from '../domain/pet.repository';
import { PetListItem } from '../api/PetListItem';
import { PetListPagination } from '../api/PetListPagination';
import { PetListPaginationStorage } from './pet-list-pagination.storage';
import { PetConverter } from './converter/PetConverter';
import * as PetSelectors from './store/pet.selectors';
import * as PetActions from './store/pet.actions';


@Injectable()
export class PetStorage implements PetRepository {

  constructor(
    private readonly store: Store,
    private readonly petListPaginationStorage: PetListPaginationStorage,
  ) {
  }

  selectPetListItems(): Observable<PetListItem[]> {
    return combineLatest([
      this.store.pipe(select(PetSelectors.getAllPets)),
      this.selectPetListPagination()
    ]).pipe(
      map(([pets, pagination]) => pets.slice(pagination.page - 1, pagination.page - 1 + pagination.pageSize)),
      map(pets => pets.map(pet => PetConverter.toPetListItem(pet)))
    );
  }

  selectPetListPagination(): Observable<PetListPagination> {
    return this.petListPaginationStorage.select();
  }

  fetchPets(): void {
    this.store.dispatch(PetActions.loadPets());
  }

  // private selectAllPetListItems(): Observable<PetListItem[]> {
  //   // TODO method fetchIfNotFetched() run here
  //   return combineLatest([
  //     this.store.pipe(select(PetSelectors.getAllPets)),
  //     this.store.pipe(select(PetSelectors.getPetCategoriesMap))
  //   ]).pipe(
  //     debounceTime(0),
  //     map(([pets, petCategoriesMap]) => {
  //       return pets.map(pet => PetConverter.toPetListItem(pet))
  //     })
  //   );
  // }
}
