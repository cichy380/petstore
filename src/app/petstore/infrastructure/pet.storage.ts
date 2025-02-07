import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as PetSelectors from './store/pet.selectors';
import * as PetActions from './store/pet.actions';
import { PetRepository } from '../domain/pet.repository';
import { combineLatest, debounceTime, Observable } from 'rxjs';
import { PetListItem } from '../api/PetListItem';
import { map } from 'rxjs/operators';
import { PetConverter } from './converter/PetConverter';


@Injectable()
export class PetStorage implements PetRepository {

  constructor(private readonly store: Store) {
  }

  selectAllPets(): Observable<PetListItem[]> {
    return combineLatest([
      this.store.pipe(select(PetSelectors.getAllPets)),
      this.store.pipe(select(PetSelectors.getPetCategoriesMap))
    ]).pipe(
      debounceTime(0),
      map(([pets, petCategoriesMap]) => {
        return pets.map(pet => PetConverter.toPetListItem(pet, petCategoriesMap))
      })
    );
  }

  fetchPets(): void {
    this.store.dispatch(PetActions.loadPets());
  }
}
