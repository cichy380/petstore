import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PET_PROVIDERS } from '../pet.provider';
import { PetService } from '../api/pet.service';


@Component({
  selector: 'app-pet-root',
  standalone: true,
  imports: [CommonModule],
  providers: [...PET_PROVIDERS],
  templateUrl: './pet-root.component.html',
  styleUrl: './pet-root.component.css'
})
export class PetRootComponent implements OnInit {

  constructor(private petService: PetService) {
  }

  ngOnInit() {
    this.loadPets();
    this.petService.selectAllPets().subscribe(pets => {
      console.log(pets);
    });
  }

  public loadPets(): void {
    this.petService.fetchAllPets();
  }
}
