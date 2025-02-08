import { PetAnemia } from '../anemia/PetAnemia';
import { PetDTO } from '../dto/PetDTO';
import { PetListItem } from '../../api/PetListItem';
import { PetStatus } from '../../api/PetStatus';


export class PetConverter {

  static toPetAnemia(pet: PetDTO): PetAnemia {
    return new PetAnemia(
      pet.id,
      pet.name,
      pet.photoUrls,
      pet.status,
      pet.category?.id,
      pet.category?.name
    );
  }

  static toPetListItem(pet: PetAnemia): PetListItem {
    return new PetListItem(
      pet.petId,
      pet.petName,
      pet.petStatus as PetStatus,
      pet.petCategoryName
    )
  }
}
