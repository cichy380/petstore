import { Observable } from 'rxjs';
import { PetListItem } from './PetListItem';


export abstract class PetService {

  abstract selectAllPets(): Observable<PetListItem[]>;

  abstract fetchAllPets(): void;
}
