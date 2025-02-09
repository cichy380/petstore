import { createAction, props } from '@ngrx/store';
import { PetAnemia } from '../anemia/PetAnemia';
import { PetCategoryAnemia } from '../anemia/PetCategoryAnemia';
import { PetStatus } from '../../api/PetStatus';

export const loadPets = createAction(
  '[Pet/API] Load Pets',
  props<{ status: PetStatus }>(),
);

export const loadPetsSuccess = createAction(
  '[Pet/API] Load Pets Success',
  props<{ pets: PetAnemia[]; categories: PetCategoryAnemia[] }>(),
);

export const loadPetsFailed = createAction('[Pet/API] Load Pets Failed');

export const updatePetListSearchQuery = createAction(
  '[Pet] Update Search Query',
  props<{ query: string }>(),
);

export const updateFilteredPetCount = createAction(
  '[Pet] Update Filtered Pet Count',
  props<{ count: number }>(),
);
