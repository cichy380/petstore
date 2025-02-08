import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PET_PROVIDERS } from '../pet.provider';
import { PetService } from '../api/pet.service';
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

  constructor(private petService: PetService) {}

  ngOnInit() {
    this.loadPets();
    this.petService.selectPetListItems().subscribe((pets) => {
      console.log(pets);
    });
  }

  public loadPets(): void {
    this.petService.fetchPets();
  }
}
