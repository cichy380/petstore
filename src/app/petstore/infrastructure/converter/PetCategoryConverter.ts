import { PetCategoryDTO } from '../dto/PetCategoryDTO';
import { PetCategoryAnemia } from '../anemia/PetCategoryAnemia';
import { PetCategory } from '../../api/PetCategory';
import { CreatePetCategoryRequest } from '../request/CreatePetCategoryRequest';
import { UpdatePetCategoryRequest } from '../request/UpdatePetCategoryRequest';

export class PetCategoryConverter {
  static toPetCategory(petCategory: PetCategoryAnemia): PetCategory {
    return new PetCategory(petCategory.petCategoryId, petCategory.petCategoryName);
  }

  static toPetCategoryAnemia(petCategory: PetCategoryDTO): PetCategoryAnemia {
    return new PetCategoryAnemia(petCategory.id, petCategory.name);
  }

  static toCreatePetCategoryRequest(category: PetCategory): CreatePetCategoryRequest {
    return new CreatePetCategoryRequest(category.petCategoryId, category.petCategoryName);
  }

  static toUpdatePetCategoryRequest(category: PetCategory): UpdatePetCategoryRequest {
    return new UpdatePetCategoryRequest(category.petCategoryId, category.petCategoryName);
  }
}
