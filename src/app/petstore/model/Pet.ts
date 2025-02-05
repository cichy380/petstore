import { PetCategory } from './PetCategory';
import { PetStatus } from './PetStatus';


export class Pet {
  constructor(
    public id: number,
    public name: string,
    public category: PetCategory,
    public photoUrls: string[],
    public tags: string[],
    public status: PetStatus
  ) {
  }
}
