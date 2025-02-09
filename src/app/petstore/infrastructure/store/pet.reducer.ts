import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { PetAnemia } from '../anemia/PetAnemia';
import { PetCategoryConverter } from '../converter/PetCategoryConverter';
import { PetCategoryEntitiesAnemia } from '../anemia/PetCategoryEntitiesAnemia';
import * as PetActions from './pet.actions';

export const PET_STORE_KEY = 'PET';

export interface PetState extends EntityState<PetAnemia> {
  loaded: boolean;
  categoryEntities: PetCategoryEntitiesAnemia;
  filteredPetCount: number;
  searchQuery: string;
}

export const petAdapter: EntityAdapter<PetAnemia> =
  createEntityAdapter<PetAnemia>({
    selectId: (pet: PetAnemia) => pet.petId,
  });

export const initialState: PetState = petAdapter.getInitialState({
  loaded: false,
  ids: [],
  entities: {},
  categoryEntities: {},
  filteredPetCount: 0,
  searchQuery: '',
});

export const petReducer = createReducer(
  initialState,
  on(PetActions.loadPetsSuccess, (state, { pets, categories }) =>
    petAdapter.setAll(pets, {
      ...state,
      petCategoriesMap:
        PetCategoryConverter.toPetCategoriesMapAnemia(categories),
      // TODO: set pageIndex (pagination) on 0
      loaded: true,
    }),
  ),
  on(PetActions.updatePetListSearchQuery, (state, { query }) => ({
    ...state,
    // TODO: set pageIndex (pagination) on 0
    searchQuery: query,
  })),
  on(PetActions.updateFilteredPetCount, (state, { count }) => ({
    ...state,
    filteredPetCount: count,
  })),
);
