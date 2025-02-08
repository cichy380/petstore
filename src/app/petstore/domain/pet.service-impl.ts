import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PetService } from '../api/pet.service';
import { PetListItem } from '../api/PetListItem';
import { PetRepository } from './pet.repository';


@Injectable()
export class PetServiceImpl implements PetService {

  constructor(private readonly petRepository: PetRepository) {
  }

  selectPetListItems(): Observable<PetListItem[]> {
    return this.petRepository.selectPetListItems();
  }

  fetchPets(): void {
    this.petRepository.fetchPets();
  }
}
