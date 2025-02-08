import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PET_PROVIDERS } from '../pet.provider';
import { PetService } from '../api/pet.service';
import { PetListPagination } from '../api/PetListPagination';
import { PetTableComponent } from './pet-table/pet-table.component';

@Component({
  selector: 'app-pet-root',
  standalone: true,
  imports: [CommonModule, PetTableComponent],
  providers: [...PET_PROVIDERS],
  templateUrl: './pet-root.component.html',
  styleUrl: './pet-root.component.css',
})
export class PetRootComponent implements OnInit {
  petListItems$ = this.petService.selectPetListItems();
  totalPetsCount$ = this.petService.selectTotalPetsCount();
  petListPagination$ = this.petService.selectPetListPagination();

  constructor(private petService: PetService) {}

  ngOnInit() {
    this.loadPets();
    this.petService.selectPetListItems().subscribe((pets) => {
      console.log(pets);
    });
  }

  loadPets() {
    this.petService.fetchPets();
  }

  onPaginationChange(pagination: PetListPagination) {
    this.petService.updatePetListPagination(pagination);
  }
}
