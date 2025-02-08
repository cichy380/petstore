import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  MatRadioButton,
  MatRadioChange,
  MatRadioGroup,
} from '@angular/material/radio';
import { PetStatus } from '../../api/PetStatus';
import { PetListFilter } from '../../api/PetListFilter';

@Component({
  selector: 'app-pet-filter',
  standalone: true,
  imports: [MatRadioButton, MatRadioGroup],
  templateUrl: './pet-filter.component.html',
  styleUrl: './pet-filter.component.css',
})
export class PetFilterComponent {
  @Input({ required: true })
  filter!: PetListFilter;

  @Output()
  changeFilter = new EventEmitter<PetListFilter>();

  petStatusFilterOptions = Object.values(PetStatus);

  onStatusFilterChange(event: MatRadioChange) {
    this.changeFilter.emit(new PetListFilter(event.value));
  }
}
