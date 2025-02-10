import { Observable } from 'rxjs';
import { PetListItem } from '../api/PetListItem';
import { PetListPagination } from '../api/PetListPagination';
import { PetListFilter } from '../api/PetListFilter';
import { PetListSort } from '../api/PetListSort';
import { Pet } from '../api/Pet';
import { PetCategory } from '../api/PetCategory';
import { PetId } from '../api/PetId';

export abstract class PetRepository {
  abstract selectPetListItems(): Observable<PetListItem[]>;

  abstract selectPet(petId: PetId): Observable<Pet>;

  abstract selectTotalPetListItemsCount(): Observable<number>;

  abstract selectPetCategories(): Observable<PetCategory[]>;

  abstract selectPetListPagination(): Observable<PetListPagination>;

  abstract selectPetListFilter(): Observable<PetListFilter>;

  abstract selectPetListSearchQuery(): Observable<string>;

  abstract createPet(pet: Pet): Observable<void>;

  abstract updatePet(pet: Pet): Observable<void>;

  abstract deletePet(petId: PetId): Observable<void>;

  abstract updatePetListPagination(pagination: PetListPagination): void;

  abstract updatePetListFilter(filter: PetListFilter): void;

  abstract updatePetListSort(sort: PetListSort | null): void;

  abstract updatePetListSearch(query: string): void;
}
