import { PetAnemia } from '../anemia/PetAnemia';
import { PetDTO } from '../dto/PetDTO';
import { PetListItem } from '../../api/PetListItem';
import { PetStatus } from '../../api/PetStatus';
import { Pet } from '../../api/Pet';
import { CreatePetRequest } from '../request/CreatePetRequest';
import { PetCategoryConverter } from './PetCategoryConverter';
import { PetCategory } from '../../api/PetCategory';
import { UpdatePetRequest } from '../request/UpdatePetRequest';
import { Update } from '@ngrx/entity';

export class PetConverter {
  static toPet(pet: PetAnemia): Pet {
    return new Pet(
      pet.petId,
      pet.petName,
      pet.petStatus as PetStatus,
      pet.petPhotoUrls,
      this.toPetCategory(pet),
    );
  }

  static toPetListItem(pet: PetAnemia): PetListItem {
    return new PetListItem(
      pet.petId,
      pet.petName,
      pet.petStatus as PetStatus,
      pet.petCategoryName,
    );
  }

  static toPetAnemia(pet: PetDTO): PetAnemia {
    return new PetAnemia(
      pet.id,
      pet.name!,
      pet.photoUrls,
      pet.status,
      pet.category?.id,
      pet.category?.name,
    );
  }

  static toUpdatePetAnemia(pet: PetDTO): Update<PetAnemia> {
    return {
      id: pet.id,
      changes: this.toPetAnemia(pet),
    }
  }

  static toCreatePetRequest(pet: Pet): CreatePetRequest {
    return new CreatePetRequest(
      pet.petId,
      pet.petName,
      pet.petPhotoUrls,
      pet.petStatus,
      pet.petCategory &&
        PetCategoryConverter.toCreatePetCategoryRequest(pet.petCategory),
    );
  }

  static toUpdatePetRequest(pet: Pet): UpdatePetRequest {
    return new UpdatePetRequest(
      pet.petId,
      pet.petName,
      pet.petPhotoUrls,
      pet.petStatus,
      pet.petCategory &&
      PetCategoryConverter.toUpdatePetCategoryRequest(pet.petCategory),
    );
  }

  private static toPetCategory(pet: PetAnemia): PetCategory | undefined {
    if (pet.petCategoryId === undefined || pet.petCategoryName === undefined) {
      return undefined;
    }
    return new PetCategory(pet.petCategoryId, pet.petCategoryName);
  }
}
