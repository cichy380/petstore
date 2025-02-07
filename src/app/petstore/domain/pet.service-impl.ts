import { Injectable } from '@angular/core';
import { PetService } from '../api/pet.service';
import { PetRepository } from './pet.repository';
import { Observable } from 'rxjs';
import { PetListItem } from '../api/PetListItem';


@Injectable()
export class PetServiceImpl implements PetService {

  constructor(private readonly petRepository: PetRepository) {
  }

  selectAllPets(): Observable<PetListItem[]> {
    return this.petRepository.selectAllPets();
  }

  fetchAllPets(): void {
    this.petRepository.fetchPets();
  }
}
