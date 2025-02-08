import { Observable } from 'rxjs';
import { PetListItem } from './PetListItem';


export abstract class PetService {

  abstract selectPetListItems(): Observable<PetListItem[]>;

  abstract fetchPets(): void;

  // abstract updatePetListPagination(pagination: PetListPagination): void;

  // abstract updatePetListFilter(filter: PetListFilter): void;

  // abstract updatePetListSort(sort: PetListSort): void;

  // abstract updatePetListSearch(query: string): void;

}
