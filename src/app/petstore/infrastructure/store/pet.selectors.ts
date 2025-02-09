import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PET_STORE_KEY, petAdapter, PetState } from './pet.reducer';

export const getPetState = createFeatureSelector<PetState>(PET_STORE_KEY);

const { selectAll, selectEntities, selectTotal } = petAdapter.getSelectors();

export const getPetLoaded = createSelector(
  getPetState,
  (state: PetState) => state.loaded,
);

export const getAllPets = createSelector(getPetState, (state: PetState) =>
  selectAll(state),
);

export const getPetEntities = createSelector(getPetState, (state: PetState) =>
  selectEntities(state),
);

export const getTotalPetsCount = createSelector(
  getPetState,
  (state: PetState) => selectTotal(state),
);

export const getFilteredPetsCount = createSelector(
  getPetState,
  (state: PetState) => state.filteredPetCount,
);

export const getPetCategoriesMap = createSelector(
  getPetState,
  (state: PetState) => state.categoryEntities,
);

export const getPetListFilter = createSelector(
  getPetState,
  (state: PetState) => state.petListFilter,
);

export const getPetListSearchQuery = createSelector(
  getPetState,
  (state: PetState) => state.petListSearchQuery,
);

export const getPetListSort = createSelector(
  getPetState,
  (state: PetState) => state.petListSort,
);

export const getPetListPagination = createSelector(
  getPetState,
  (state: PetState) => state.petListPagination,
);

export const getIsInitialState = createSelector(
  getPetState,
  (state: PetState) => !state.loading && !state.loaded,
);
