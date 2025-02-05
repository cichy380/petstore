import { createAction, props } from '@ngrx/store';
import { Pet } from '../../model/Pet';


export const loadPets = createAction(
  '[Pet/API] Load Pets'
);

export const loadPetsSuccess = createAction(
  '[Pet/API] Load Pets Success',
  props<{ pets: Pet[] }>()
);

export const loadPetsFailed = createAction(
  '[Pet/API] Load Pets Failed'
);

