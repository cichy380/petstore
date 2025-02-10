import { PetCategory } from './PetCategory';
import { PetStatus } from './PetStatus';
import { PetId } from './PetId';

export class Pet {
  constructor(
    public petId: PetId,
    public petName: string,
    public petStatus: PetStatus,
    public petPhotoUrls: string[],
    public petCategory?: PetCategory,
  ) {
  }
}
