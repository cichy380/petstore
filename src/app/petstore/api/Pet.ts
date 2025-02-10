import { PetCategory } from './PetCategory';
import { PetStatus } from './PetStatus';

export type PetId = number;

export class Pet {
  constructor(
    public petId: PetId,
    public petName: string,
    public petStatus: PetStatus,
    public petPhotoUrls: string[],
    public category?: PetCategory,
  ) {
  }
}
