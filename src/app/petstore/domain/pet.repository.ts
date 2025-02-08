import { Observable } from 'rxjs';
import { PetListItem } from '../api/PetListItem';
import { PetListPagination } from '../api/PetListPagination';

export abstract class PetRepository {
  abstract selectPetListItems(): Observable<PetListItem[]>;

  abstract selectTotalPetsCount(): Observable<number>;

  abstract selectPetListPagination(): Observable<PetListPagination>;

  abstract fetchPets(): void;

  abstract updatePetListPagination(pagination: PetListPagination): void;
}
