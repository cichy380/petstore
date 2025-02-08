import { Provider } from '@angular/core';
import { PetService } from './api/pet.service';
import { PetServiceImpl } from './domain/pet.service-impl';
import { PetRepository } from './domain/pet.repository';
import { PetStorage } from './infrastructure/pet.storage';
import { PetListPaginationStorage } from './infrastructure/pet-list-pagination.storage';


export const PET_PROVIDERS: Provider[] = [
  { provide: PetService, useClass: PetServiceImpl },
  { provide: PetRepository, useClass: PetStorage },
  PetListPaginationStorage
];
