import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  MatRadioButton,
  MatRadioChange,
  MatRadioGroup,
} from '@angular/material/radio';
import { PetStatus } from '../../api/PetStatus';
import { PetListFilter } from '../../api/PetListFilter';
import { PetStatusLozengeComponent } from '../pet-status-lozenge/pet-status-lozenge.component';

@Component({
  selector: 'app-pet-filter',
  standalone: true,
  imports: [MatRadioButton, MatRadioGroup, PetStatusLozengeComponent],
  templateUrl: './pet-filter.component.html',
})
export class PetFilterComponent {
  @Input({ required: true })
  filter!: PetListFilter;

  @Output()
  changeFilter = new EventEmitter<PetListFilter>();

  petStatusFilterOptions: PetStatus[] = Object.values(PetStatus);

  onStatusFilterChange(event: MatRadioChange) {
    this.changeFilter.emit(new PetListFilter(event.value));
  }
}
