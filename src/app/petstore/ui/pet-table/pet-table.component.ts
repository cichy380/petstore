import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { PetListItem } from '../../api/PetListItem';
import { PetListPagination } from '../../api/PetListPagination';

@Component({
  selector: 'app-pet-table',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule],
  templateUrl: './pet-table.component.html',
  styleUrl: './pet-table.component.css',
})
export class PetTableComponent {
  @Input({ required: true })
  items!: PetListItem[];

  @Input({ required: true })
  totalCount!: number;

  @Input({ required: true })
  pagination!: PetListPagination;

  @Output()
  changePagination = new EventEmitter<PetListPagination>();

  displayedTableColumns = ['number', 'petName', 'petCategoryName', 'petStatus'];

  onPaginationChange(event: PageEvent) {
    this.changePagination.emit(
      new PetListPagination(event.pageIndex, event.pageSize),
    );
  }
}
