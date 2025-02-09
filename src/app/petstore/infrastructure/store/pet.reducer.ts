import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { PetAnemia } from '../anemia/PetAnemia';
import { PetCategoryConverter } from '../converter/PetCategoryConverter';
import { PetCategoryEntitiesAnemia } from '../anemia/PetCategoryEntitiesAnemia';
import * as PetActions from './pet.actions';
import { PetListPagination } from '../../api/PetListPagination';

export const PET_STORE_KEY = 'PET';

export interface PetState extends EntityState<PetAnemia> {
  loaded: boolean;
  loading: boolean;
  categoryEntities: PetCategoryEntitiesAnemia;
  filteredPetCount: number;
  petListPagination: PetListPagination;
  petListSearchQuery: string;
}

export const petAdapter: EntityAdapter<PetAnemia> =
  createEntityAdapter<PetAnemia>({
    selectId: (pet: PetAnemia) => pet.petId,
  });

export const initialState: PetState = petAdapter.getInitialState({
  loaded: false,
  loading: false,
  ids: [],
  entities: {},
  categoryEntities: {},
  filteredPetCount: 0,
  petListPagination: new PetListPagination(0),
  petListSearchQuery: '',
});

export const petReducer = createReducer(
  initialState,

  on(PetActions.loadPets, (state) => ({ ...state, loading: true })),
  on(PetActions.loadPetsSuccess, (state, { pets, categories }) =>
    petAdapter.setAll(pets, {
      ...state,
      petCategoriesMap:
        PetCategoryConverter.toPetCategoriesMapAnemia(categories),
      petListPagination: new PetListPagination(0),
      loading: false,
      loaded: true,
    }),
  ),
  on(PetActions.loadPetsFailed, (state) => ({ ...state, loading: false })),

  on(PetActions.updateFilteredPetCount, (state, { count }) => ({
    ...state,
    filteredPetCount: count,
  })),

  on(PetActions.updatePetListPagination, (state, { pagination }) => ({
    ...state,
    petListPagination: pagination,
  })),
  on(PetActions.updatePetListSearchQuery, (state, { query }) => ({
    ...state,
    petListPagination: new PetListPagination(0),
    petListSearchQuery: query,
  })),
);
