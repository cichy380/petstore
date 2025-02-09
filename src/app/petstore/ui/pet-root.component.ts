import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PET_PROVIDERS } from '../pet.provider';
import { PetService } from '../api/pet.service';
import { PetListPagination } from '../api/PetListPagination';
import { PetTableComponent } from './pet-table/pet-table.component';
import { PetFilterComponent } from './pet-filter/pet-filter.component';
import { PetListFilter } from '../api/PetListFilter';
import { PetListSort } from '../api/PetListSort';
import { PetSearchComponent } from './pet-search/pet-search.component';

@Component({
  selector: 'app-pet-root',
  standalone: true,
  imports: [
    CommonModule,
    PetTableComponent,
    PetFilterComponent,
    PetSearchComponent,
  ],
  providers: [...PET_PROVIDERS],
  templateUrl: './pet-root.component.html',
  styleUrl: './pet-root.component.css',
})
export class PetRootComponent implements OnInit {
  petListItems$ = this.petService.selectPetListItems();
  totalPetsCount$ = this.petService.selectTotalPetListItemsCount();
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

  onSortChange(sort: PetListSort | null) {
    this.petService.updatePetListSort(sort);
  }

  onSearchChange(query: string) {
    this.petService.updatePetListSearch(query);
  }
}
