import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { PetAnemia } from '../anemia/PetAnemia';
import { PetCategoryConverter } from '../converter/PetCategoryConverter';
import { PetCategoryEntitiesAnemia } from '../anemia/PetCategoryEntitiesAnemia';
import * as PetActions from './pet.actions';


export const PET_STORE_KEY = 'PET';

export interface PetState extends EntityState<PetAnemia> {
  loaded: boolean;
  // sortComparer: (a: PetAnemia, b: PetAnemia) => number;
  categoryEntities: PetCategoryEntitiesAnemia;
}

export const petAdapter: EntityAdapter<PetAnemia> = createEntityAdapter<PetAnemia>({
  // sortComparer: (a, b) => a.petName > b.petName ? 1 : -1,
  selectId: (pet: PetAnemia) => pet.petId
});

export const initialState: PetState = petAdapter.getInitialState({
  loaded: false,
  // sortComparer: (a, b) => a.petName > b.petName ? 1 : -1,
  // ids: [],
  // entities: {},
  categoryEntities: {}
});

export const petReducer = createReducer(
  initialState,
  on(PetActions.loadPetsSuccess, (state, { pets, categories }) =>
    petAdapter.setAll(pets, {
      ...state,
      petCategoriesMap: PetCategoryConverter.toPetCategoriesMapAnemia(categories),
      loaded: true
    })
  ),
  // on(PetActions.updateSortComparer, (state, { sortComparer }) => ({
  //   ...state,
  //   sortComparer
  // }))
);
