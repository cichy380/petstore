import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { PetListItem } from '../../api/PetListItem';

@Component({
  selector: 'app-pet-table',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './pet-table.component.html',
  styleUrl: './pet-table.component.css',
})
export class PetTableComponent {
  @Input({ required: true })
  petTableItems!: PetListItem[];

  displayedTableColumns = ['number', 'petName', 'petCategoryName', 'petStatus'];
}
