import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { switchMap, take, takeUntil } from 'rxjs';
import { PET_PROVIDERS } from '../pet.provider';
import { PetService } from '../api/pet.service';
import { PetListPagination } from '../api/PetListPagination';
import { PetListFilter } from '../api/PetListFilter';
import { PetListSort } from '../api/PetListSort';
import { PetFilterComponent } from './pet-filter/pet-filter.component';
import { PetTableComponent } from './pet-table/pet-table.component';
import { PetSearchComponent } from './pet-search/pet-search.component';
import { PetFormDialogComponent } from './pet-form-dialog/pet-form-dialog.component';
import { PetFormMode } from '../api/PetFormMode';
import { PetFormDialogData } from '../api/PetFormDialogData';
import { PetId } from '../api/PetId';
import { PetRemoveConfirmDialogData } from '../api/PetRemoveConfirmDialogData';
import { PetRemoveConfirmDialogComponent } from './pet-remove-confirm-dialog/pet-remove-confirm-dialog.component';

@Component({
  selector: 'app-pet-root',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    PetTableComponent,
    PetFilterComponent,
    PetSearchComponent,
  ],
  providers: [...PET_PROVIDERS],
  templateUrl: './pet-root.component.html',
  styleUrl: './pet-root.component.css',
})
export class PetRootComponent implements OnInit {
  readonly petListItems$ = this.petService.selectPetListItems();
  readonly totalPetsCount$ = this.petService.selectTotalPetListItemsCount();
  readonly petCategories$ = this.petService.selectPetCategories();
  readonly petListPagination$ = this.petService.selectPetListPagination();
  readonly petListFilter$ = this.petService.selectPetListFilter();

  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);

  constructor(private readonly petService: PetService) {}

  // TODO remove ngOnInit()
  ngOnInit() {
    this.petService.selectPetListItems().subscribe((pets) => {
      console.log(pets);
    });
  }

  onAddNewPetClick() {
    const dialogRef = this.dialog.open<
      PetFormDialogComponent,
      PetFormDialogData
    >(PetFormDialogComponent, {
      width: '500px',
      data: {
        allPetCategories$: this.petCategories$,
        formMode: PetFormMode.CREATE,
      },
    });

    dialogRef.componentInstance
      .selectSubmitForm()
      .pipe(
        switchMap((formValue) => this.petService.createPet(formValue)),
        take(1),
        takeUntil(dialogRef.afterClosed()),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => dialogRef.close());
  }

  onEditPetClick(petId: PetId) {
    const dialogRef = this.dialog.open<
      PetFormDialogComponent,
      PetFormDialogData
    >(PetFormDialogComponent, {
      width: '500px',
      data: {
        allPetCategories$: this.petCategories$,
        formMode: PetFormMode.UPDATE,
        pet$: this.petService.selectPet(petId),
      },
    });

    // TODO remove duplicated code
    dialogRef.componentInstance
      .selectSubmitForm()
      .pipe(
        switchMap((formValue) => this.petService.updatePet(petId, formValue)),
        take(1),
        takeUntil(dialogRef.afterClosed()),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => dialogRef.close());
  }

  onRemovePetClick(petId: PetId) {
    const dialogRef = this.dialog.open<
      PetRemoveConfirmDialogComponent,
      PetRemoveConfirmDialogData
    >(PetRemoveConfirmDialogComponent, {
      width: '400px',
      data: {
        pet$: this.petService.selectPet(petId),
      },
    });

    dialogRef
      .afterClosed()
      .pipe(take(1), takeUntilDestroyed(this.destroyRef))
      .subscribe((confirmed) => confirmed && this.petService.deletePet(petId));
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
