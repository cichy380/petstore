import { PetFormValue } from '../../api/PetFormValue';
import { PetId } from '../../api/PetId';
import { Pet } from '../../api/Pet';

export class PetConverter {
  static toPet(petId: PetId, pet: PetFormValue): Pet {
    return new Pet(
      petId,
      pet.name,
      pet.status,
      pet.photoUrls,
      pet.category || undefined,
    );
  }
}
