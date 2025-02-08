import { Observable } from 'rxjs';
import { PetListItem } from '../api/PetListItem';
import { PetListPagination } from '../api/PetListPagination';


export abstract class PetRepository {

  abstract selectPetListItems(): Observable<PetListItem[]>;

  abstract selectPetListPagination(): Observable<PetListPagination>;

  abstract fetchPets(): void;
}
