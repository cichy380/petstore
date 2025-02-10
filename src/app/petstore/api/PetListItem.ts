import { PetId } from './PetId';
import { PetCategory } from './PetCategory';
import { PetStatus } from './PetStatus';

export class PetListItem {
  constructor(
    public petId: PetId,
    public petName: string,
    public petStatus: PetStatus,
    public petCategoryName: PetCategory['petCategoryName'] = '',
  ) {}
}
