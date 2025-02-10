import { PetCategoryDTO } from '../dto/PetCategoryDTO';
import { PetCategoryAnemia } from '../anemia/PetCategoryAnemia';
import { PetCategory } from '../../api/PetCategory';
import { CreatePetCategoryRequest } from '../request/CreatePetCategoryRequest';

export class PetCategoryConverter {
  static toPetCategoryAnemia(petCategory: PetCategoryDTO): PetCategoryAnemia {
    return new PetCategoryAnemia(petCategory.id, petCategory.name);
  }

  static toCreatePetCategoryRequest(category: PetCategory): CreatePetCategoryRequest {
    return new CreatePetCategoryRequest(category.petCategoryId, category.petCategoryName);
  }
}
