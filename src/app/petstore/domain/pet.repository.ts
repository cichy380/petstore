import { PetListItem } from '../api/PetListItem';
import { Observable } from 'rxjs';


export abstract class PetRepository {

  abstract selectAllPets(): Observable<PetListItem[]>;

  abstract fetchPets(): void;
}
