import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PET_STORE_KEY, petAdapter, PetState } from './pet.reducer';


export const getPetState = createFeatureSelector<PetState>(PET_STORE_KEY);

const { selectAll, selectEntities } = petAdapter.getSelectors();

export const getPetLoaded = createSelector(
  getPetState,
  (state: PetState) => state.loaded
);

export const getAllPets = createSelector(
  getPetState,
  (state: PetState) => selectAll(state)
);

export const getPetEntities = createSelector(
  getPetState,
  (state: PetState) => selectEntities(state)
);

export const getPetCategoriesMap = createSelector(
  getPetState,
  (state: PetState) => state.categoryEntities
);
