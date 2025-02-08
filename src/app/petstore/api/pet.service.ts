import { Observable } from 'rxjs';
import { PetListItem } from './PetListItem';
import { PetListPagination } from './PetListPagination';

export abstract class PetService {
  abstract selectPetListItems(): Observable<PetListItem[]>;

  abstract selectTotalPetsCount(): Observable<number>;

  abstract selectPetListPagination(): Observable<PetListPagination>;

  abstract fetchPets(): void;

  abstract updatePetListPagination(pagination: PetListPagination): void;

  // abstract updatePetListFilter(filter: PetListFilter): void;

  // abstract updatePetListSort(sort: PetListSort): void;

  // abstract updatePetListSearch(query: string): void;
}
