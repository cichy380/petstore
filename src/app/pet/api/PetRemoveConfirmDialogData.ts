import { Observable } from 'rxjs';
import { Pet } from './Pet';

export class PetRemoveConfirmDialogData {
  pet$!: Observable<Pet>;
}
