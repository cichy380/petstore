import { PetAnemia } from '../anemia/PetAnemia';
import { PetDTO } from '../dto/PetDTO';
import { PetListItem } from '../../api/PetListItem';
import { PetStatus } from '../../api/PetStatus';
import { PetCategoriesMapAnemia } from '../anemia/PetCategoriesMapAnemia';


export class PetConverter {

  static toPetAnemia(pet: PetDTO): PetAnemia {
    return new PetAnemia(
      pet.id,
      pet.name,
      pet.photoUrls,
      pet.status,
      pet.category?.id
    );
  }

  static toPetListItem(pet: PetAnemia, petCategoriesMap: PetCategoriesMapAnemia): PetListItem {
    return new PetListItem(
      pet.petId,
      pet.petName,
      pet.petStatus as PetStatus,
      pet.petCategoryId ? petCategoriesMap[pet.petCategoryId].petCategoryName : ''
    )
  }
}
