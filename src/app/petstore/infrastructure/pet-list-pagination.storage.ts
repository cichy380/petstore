import { StorageService } from '../../shared/StorageService';
import { PetListPagination } from '../api/PetListPagination';


export class PetListPaginationStorage extends StorageService<PetListPagination> {
    constructor() {
        super(new PetListPagination(1));
    }
}
