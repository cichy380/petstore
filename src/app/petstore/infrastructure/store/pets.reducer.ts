import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Pet } from '../../model/Pet';
import * as PetActions from './pets.actions';


export interface PetsState extends EntityState<Pet> {
  loaded: boolean;
}

export const adapter: EntityAdapter<Pet> = createEntityAdapter<Pet>();

export const initialState: PetsState = adapter.getInitialState({
  loaded: false
});

export const petsReducer = createReducer(
  initialState,
  on(PetActions.loadPetsSuccess, (state, { pets }) =>
    adapter.setAll(pets, { ...state, loaded: true })
  )
);

export const {
  selectAll: selectAllPets,
  selectEntities: selectPetEntities,
  selectIds: selectPetIds
} = adapter.getSelectors();
