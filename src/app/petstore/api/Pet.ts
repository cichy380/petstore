import { PetCategory } from './PetCategory';
import { PetStatus } from './PetStatus';

type PetId = number;

export class Pet {
  constructor(
    public id: PetId,
    public name: string,
    public category: PetCategory,
    public petPhotoUrls: string[],
    // public tags: string[],
    public status: PetStatus
  ) {
  }
}
