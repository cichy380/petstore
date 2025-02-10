import { PetFormMode } from './PetFormMode';
import { Observable } from 'rxjs';
import { PetCategory } from './PetCategory';
import { Pet } from './Pet';

export class PetFormDialogData {
  formMode!: PetFormMode;
  allPetCategories$!: Observable<PetCategory[]>;
  pet$?: Observable<Pet>;
}
