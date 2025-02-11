import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { PetListItem } from '../../api/PetListItem';
import { PetListPagination } from '../../api/PetListPagination';
import { MatSortModule, Sort } from '@angular/material/sort';
import { PetListSort, SortDirection } from '../../api/PetListSort';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { PetId } from '../../api/PetId';

@Component({
  selector: 'app-pet-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIcon,
    MatIconButton,
  ],
  templateUrl: './pet-table.component.html',
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

  @Output()
  changeSort = new EventEmitter<PetListSort | null>();

  @Output()
  clickEdit = new EventEmitter<PetId>();

  @Output()
  clickRemove = new EventEmitter<PetId>();

  displayedTableColumns: (keyof PetListItem | 'number' | 'action')[] = [
    'number',
    'petName',
    'petCategoryName',
    'petStatus',
    'action',
  ];

  onEditClick(petId: PetId) {
    this.clickEdit.emit(petId);
  }

  onRemoveClick(petId: PetId) {
    this.clickRemove.emit(petId);
  }

  onPaginationChange(event: PageEvent) {
    this.changePagination.emit(
      new PetListPagination(event.pageIndex, event.pageSize),
    );
  }

  onSortChange(sort: Sort) {
    this.changeSort.emit(
      sort.direction
        ? new PetListSort(
            sort.active as keyof PetListItem,
            sort.direction as SortDirection,
          )
        : null,
    );
  }
}
