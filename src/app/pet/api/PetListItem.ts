import { PetId } from './PetId';
import { PetCategory } from './PetCategory';
import { PetStatus } from './PetStatus';

export class PetListItem {
  constructor(
    public readonly petId: PetId,
    public readonly petName: string,
    public readonly petStatus: PetStatus,
    public readonly petCategoryName: PetCategory['petCategoryName'] = '',
  ) {}
}
