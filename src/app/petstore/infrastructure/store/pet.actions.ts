import { createAction, props } from '@ngrx/store';
import { PetAnemia } from '../anemia/PetAnemia';
import { PetCategoryAnemia } from '../anemia/PetCategoryAnemia';


export const loadPets = createAction(
  '[Pet/API] Load Pets'
);

export const loadPetsSuccess = createAction(
  '[Pet/API] Load Pets Success',
  props<{ pets: PetAnemia[], categories: PetCategoryAnemia[] }>()
);

export const loadPetsFailed = createAction(
  '[Pet/API] Load Pets Failed'
);

