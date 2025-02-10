import { PetCategory } from './PetCategory';
import { PetStatus } from './PetStatus';
import { PetId } from './PetId';

export class Pet {
  constructor(
    public readonly petId: PetId,
    public readonly petName: string,
    public readonly petStatus: PetStatus,
    public readonly petPhotoUrls: string[],
    public readonly petCategory?: PetCategory,
  ) {
  }
}
