import { createAction, props } from '@ngrx/store';
import { PetAnemia } from '../anemia/PetAnemia';
import { PetCategoryAnemia } from '../anemia/PetCategoryAnemia';
import { PetStatus } from '../../api/PetStatus';
import { PetListPagination } from '../../api/PetListPagination';

export const loadPets = createAction(
  '[Pet/API] Load Pets',
  props<{ status: PetStatus }>(),
);

export const loadPetsSuccess = createAction(
  '[Pet/API] Load Pets Success',
  props<{ pets: PetAnemia[]; categories: PetCategoryAnemia[] }>(),
);

export const loadPetsFailed = createAction('[Pet/API] Load Pets Failed');

export const updateFilteredPetCount = createAction(
  '[Pet] Update Filtered Pet Count',
  props<{ count: number }>(),
);

export const updatePetListPagination = createAction(
  '[Pet] Update Pet List Pagination',
  props<{ pagination: PetListPagination }>(),
);

export const updatePetListSearchQuery = createAction(
  '[Pet] Update Pet List Search Query',
  props<{ query: string }>(),
);
