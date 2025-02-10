import { PetCategory } from './PetCategory';
import { PetStatus } from './PetStatus';

export class PetFormValue {
  name!: string;
  category!: PetCategory | null;
  photoUrls!: string[];
  status!: PetStatus;
}
