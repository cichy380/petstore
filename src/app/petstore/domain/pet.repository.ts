import { Observable } from 'rxjs';
import { PetListItem } from '../api/PetListItem';
import { PetListPagination } from '../api/PetListPagination';
import { PetListFilter } from '../api/PetListFilter';

export abstract class PetRepository {
  abstract selectPetListItems(): Observable<PetListItem[]>;

  abstract selectTotalPetsCount(): Observable<number>;

  abstract selectPetListPagination(): Observable<PetListPagination>;

  abstract selectPetListFilter(): Observable<PetListFilter>;

  abstract fetchPets(): void;

  abstract updatePetListPagination(pagination: PetListPagination): void;

  abstract updatePetListFilter(filter: PetListFilter): void;
}
