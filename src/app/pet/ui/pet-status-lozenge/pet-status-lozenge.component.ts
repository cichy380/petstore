import { Component, Input } from '@angular/core';
import { PetStatus } from '../../api/PetStatus';

@Component({
  selector: 'app-pet-status-lozenge',
  standalone: true,
  templateUrl: './pet-status-lozenge.component.html',
})
export class PetStatusLozengeComponent {
  @Input({ required: true })
  status!: PetStatus;

  PetStatus = PetStatus;
}
