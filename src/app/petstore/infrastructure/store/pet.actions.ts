import { createAction, props } from '@ngrx/store';
import { PetStatus } from '../../api/PetStatus';
import { PetListPagination } from '../../api/PetListPagination';
import { PetListFilter } from '../../api/PetListFilter';
import { PetAnemia } from '../anemia/PetAnemia';
import { PetCategoryAnemia } from '../anemia/PetCategoryAnemia';
import { PetListSort } from '../../api/PetListSort';
import { CreatePetRequest } from '../request/CreatePetRequest';
import { UpdatePetRequest } from '../request/UpdatePetRequest';
import { Update } from '@ngrx/entity';
import { PetId } from '../../api/PetId';

export const loadPets = createAction(
  '[Pet/API] Load Pets',
  props<{ status: PetStatus }>(),
);

export const loadPetsSuccess = createAction(
  '[Pet/API] Load Pets Success',
  props<{ pets: PetAnemia[]; categories: PetCategoryAnemia[] }>(),
);

export const loadPetsFailure = createAction('[Pet/API] Load Pets Failure');

export const createPet = createAction(
  '[Pet/API] Create Pet',
  props<{ pet: CreatePetRequest }>(),
);

export const createPetSuccess = createAction(
  '[Pet/API] Create Pet Success',
  props<{ pet: PetAnemia }>(),
);

export const createPetFailure = createAction('[Pet/API] Create Pet Failure');

export const updatePet = createAction(
  '[Pet/API] Update Pet',
  props<{ pet: UpdatePetRequest }>(),
);

export const updatePetSuccess = createAction(
  '[Pet/API] Update Pet Success',
  props<{ pet: Update<PetAnemia> }>(),
);

export const updatePetFailure = createAction('[Pet/API] Update Pet Failure');

export const deletePet = createAction(
  '[Pet/API] Delete Pet',
  props<{ petId: PetId }>(),
);

export const deletePetSuccess = createAction(
  '[Pet/API] Delete Pet Success',
  props<{ petId: PetId }>(),
);

export const deletePetFailure = createAction('[Pet/API] Delete Pet Failure');

export const updateFilteredPetCount = createAction(
  '[Pet] Update Filtered Pet Count',
  props<{ count: number }>(),
);

export const updatePetListFilter = createAction(
  '[Pet] Update Pet List Filter',
  props<{ filter: PetListFilter }>(),
);

export const updatePetListSearchQuery = createAction(
  '[Pet] Update Pet List Search Query',
  props<{ query: string }>(),
);

export const updatePetListSort = createAction(
  '[Pet] Update Pet List Sort',
  props<{ sort: PetListSort | null }>(),
);

export const updatePetListPagination = createAction(
  '[Pet] Update Pet List Pagination',
  props<{ pagination: PetListPagination }>(),
);
