import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PET_PROVIDERS } from '../pet.provider';
import { PetService } from '../api/pet.service';
import { PetListPagination } from '../api/PetListPagination';
import { PetTableComponent } from './pet-table/pet-table.component';
import { PetFilterComponent } from './pet-filter/pet-filter.component';
import { PetListFilter } from '../api/PetListFilter';

@Component({
  selector: 'app-pet-root',
  standalone: true,
  imports: [CommonModule, PetTableComponent, PetFilterComponent],
  providers: [...PET_PROVIDERS],
  templateUrl: './pet-root.component.html',
  styleUrl: './pet-root.component.css',
})
export class PetRootComponent implements OnInit {
  petListItems$ = this.petService.selectPetListItems();
  totalPetsCount$ = this.petService.selectTotalPetsCount();
  petListPagination$ = this.petService.selectPetListPagination();
  petListFilter$ = this.petService.selectPetListFilter();

  constructor(private petService: PetService) {}

  ngOnInit() {
    this.petService.selectPetListItems().subscribe((pets) => {
      console.log(pets);
    });
  }

  onFilterChange(filter: PetListFilter) {
    this.petService.updatePetListFilter(filter);
  }

  onPaginationChange(pagination: PetListPagination) {
    this.petService.updatePetListPagination(pagination);
  }
}
