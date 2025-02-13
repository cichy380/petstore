import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PET_STORE_KEY, petAdapter, PetState } from './pet.reducer';
import { PetId } from '../../api/PetId';

export const getPetState = createFeatureSelector<PetState>(PET_STORE_KEY);

const { selectAll, selectEntities, selectTotal } = petAdapter.getSelectors();

export const getAllPets = createSelector(getPetState, (state: PetState) =>
  selectAll(state),
);

export const getPetEntities = createSelector(getPetState, (state: PetState) =>
  selectEntities(state),
);

export const getPetById = (id: PetId) =>
  createSelector(getPetEntities, (entities) => entities[id]);

export const getTotalPetsCount = createSelector(
  getPetState,
  (state: PetState) => selectTotal(state),
);

export const getFilteredPetsCount = createSelector(
  getPetState,
  (state: PetState) => state.filteredPetCount,
);

export const getPetCategories = createSelector(
  getPetState,
  (state: PetState) => state.categories,
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

export const getPetLoaded = createSelector(
  getPetState,
  (state: PetState) => state.loaded,
);

export const getPetLoading = createSelector(
  getPetState,
  (state: PetState) => state.loading,
);

export const getIsInitialState = createSelector(
  getPetState,
  (state: PetState) => !state.loading && !state.loaded,
);
