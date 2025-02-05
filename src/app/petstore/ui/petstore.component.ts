import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PetsState } from '../infrastructure/store/pets.reducer';
import { Store } from '@ngrx/store';
import * as PetActions from '../infrastructure/store/pets.actions';

@Component({
  selector: 'app-petstore',
  standalone: true,
  imports: [CommonModule],
  providers: [],
  templateUrl: './petstore.component.html',
  styleUrl: './petstore.component.css'
})
export class PetstoreComponent implements OnInit {
  constructor(private store: Store<PetsState>) {}

  ngOnInit() {
    this.loadPets();
  }

  public loadPets(): void {
    this.store.dispatch(PetActions.loadPets());
  }
}
