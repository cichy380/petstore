import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { removeDuplicatesByProp } from '../../../shared/removeDuplicatesByProp';
import { PetListPagination } from '../../api/PetListPagination';
import { PetListFilter } from '../../api/PetListFilter';
import { PetStatus } from '../../api/PetStatus';
import { PetListSort } from '../../api/PetListSort';
import { PetAnemia } from '../anemia/PetAnemia';
import { PetCategoryAnemia } from '../anemia/PetCategoryAnemia';
import * as PetActions from './pet.actions';

export const PET_STORE_KEY = 'PET';

const DEFAULT_PET_LIST_FILTER_STATUS = PetStatus.AVAILABLE;

export interface PetState extends EntityState<PetAnemia> {
  loaded: boolean;
  loading: boolean;
  categories: PetCategoryAnemia[];
  filteredPetCount: number;
  petListFilter: PetListFilter;
  petListSearchQuery: string;
  petListSort: PetListSort | null;
  petListPagination: PetListPagination;
}

export const petAdapter: EntityAdapter<PetAnemia> =
  createEntityAdapter<PetAnemia>({
    selectId: (pet: PetAnemia) => pet.petId,
    sortComparer: (a: PetAnemia, b: PetAnemia) => (a.petId > b.petId ? 1 : -1),
  });

export const initialState: PetState = petAdapter.getInitialState({
  loaded: false,
  loading: false,
  ids: [],
  entities: {},
  categories: [],
  filteredPetCount: 0,
  petListFilter: new PetListFilter(DEFAULT_PET_LIST_FILTER_STATUS),
  petListSearchQuery: '',
  petListSort: null,
  petListPagination: new PetListPagination(0),
});

export const petReducer = createReducer(
  initialState,

  on(PetActions.loadPetsSuccess, (state, { pets, categories }) =>
    petAdapter.setAll(pets, {
      ...state,
      categories: removeDuplicatesByProp(categories, 'petCategoryId'),
      petListPagination: new PetListPagination(0),
      loading: false,
      loaded: true,
    }),
  ),

  on(PetActions.createPetSuccess, (state, { pet }) =>
    petAdapter.addOne(pet, { ...state, loading: false }),
  ),

  on(PetActions.updatePetSuccess, (state, { pet }) =>
    petAdapter.updateOne(pet, { ...state, loading: false }),
  ),

  on(PetActions.deletePetSuccess, (state, { petId }) =>
    petAdapter.removeOne(petId, { ...state, loading: false }),
  ),

  on(
    PetActions.loadPets,
    PetActions.createPet,
    PetActions.updatePet,
    PetActions.deletePet,
    (state) => ({ ...state, loading: true }),
  ),

  on(
    PetActions.loadPetsFailure,
    PetActions.createPetFailure,
    PetActions.updatePetFailure,
    PetActions.deletePetFailure,
    (state) => ({ ...state, loading: false }),
  ),

  on(PetActions.updateFilteredPetCount, (state, { count }) => ({
    ...state,
    filteredPetCount: count,
  })),

  on(PetActions.updatePetListFilter, (state, { filter }) => ({
    ...state,
    petListFilter: filter,
  })),
  on(PetActions.updatePetListSearchQuery, (state, { query }) => ({
    ...state,
    petListPagination: new PetListPagination(0),
    petListSearchQuery: query,
  })),
  on(PetActions.updatePetListSort, (state, { sort }) => ({
    ...state,
    petListSort: sort,
  })),
  on(PetActions.updatePetListPagination, (state, { pagination }) => ({
    ...state,
    petListPagination: pagination,
  })),
);
