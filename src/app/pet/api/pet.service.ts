import { Observable } from 'rxjs';
import { PetId } from './PetId';
import { Pet } from './Pet';
import { PetListItem } from './PetListItem';
import { PetListPagination } from './PetListPagination';
import { PetListFilter } from './PetListFilter';
import { PetListSort } from './PetListSort';
import { PetFormValue } from './PetFormValue';
import { PetCategory } from './PetCategory';

export abstract class PetService {
  abstract selectPetListItems(): Observable<PetListItem[]>;

  abstract selectPet(petId: PetId): Observable<Pet>;

  abstract selectTotalPetListItemsCount(): Observable<number>;

  abstract selectPetCategories(): Observable<PetCategory[]>;

  abstract selectPetListPagination(): Observable<PetListPagination>;

  abstract selectPetListFilter(): Observable<PetListFilter>;

  abstract selectLoading(): Observable<boolean>;

  abstract createPet(petFormValue: PetFormValue): Observable<void>;

  abstract updatePet(petId: PetId, petFormValue: PetFormValue): Observable<void>;

  abstract deletePet(petId: PetId): Observable<void>;

  abstract updatePetListPagination(pagination: PetListPagination): void;

  abstract updatePetListFilter(filter: PetListFilter): void;

  abstract updatePetListSort(sort: PetListSort | null): void;

  abstract updatePetListSearch(query: string): void;
}
