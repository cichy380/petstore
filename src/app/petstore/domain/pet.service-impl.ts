import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PetService } from '../api/pet.service';
import { PetListItem } from '../api/PetListItem';
import { PetRepository } from './pet.repository';
import { PetListPagination } from '../api/PetListPagination';

@Injectable()
export class PetServiceImpl implements PetService {
  constructor(private readonly petRepository: PetRepository) {}

  selectPetListItems(): Observable<PetListItem[]> {
    return this.petRepository.selectPetListItems();
  }

  selectTotalPetsCount(): Observable<number> {
    return this.petRepository.selectTotalPetsCount();
  }

  selectPetListPagination(): Observable<PetListPagination> {
    return this.petRepository.selectPetListPagination();
  }

  fetchPets(): void {
    this.petRepository.fetchPets();
  }

  updatePetListPagination(pagination: PetListPagination) {
    this.petRepository.updatePetListPagination(pagination);
  }
}
