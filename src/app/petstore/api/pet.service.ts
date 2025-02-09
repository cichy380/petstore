import { Observable } from 'rxjs';
import { PetListItem } from './PetListItem';
import { PetListPagination } from './PetListPagination';
import { PetListFilter } from './PetListFilter';
import { PetListSort } from './PetListSort';

export abstract class PetService {
  abstract selectPetListItems(): Observable<PetListItem[]>;

  abstract selectTotalPetListItemsCount(): Observable<number>;

  abstract selectPetListPagination(): Observable<PetListPagination>;

  abstract selectPetListFilter(): Observable<PetListFilter>;

  // TODO remove fetchPets() ?
  abstract fetchPets(): void;

  abstract updatePetListPagination(pagination: PetListPagination): void;

  abstract updatePetListFilter(filter: PetListFilter): void;

  abstract updatePetListSort(sort: PetListSort | null): void;

  abstract updatePetListSearch(query: string): void;
}
