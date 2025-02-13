import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { filter, switchMap, take, takeUntil } from 'rxjs';
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
import { NotificationService } from '../../shared/notification.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-pet-root',
  standalone: true,
  imports: [
    MatTooltipModule,
    MatProgressBarModule,
    MatButtonModule,
    MatIconModule,
    PetTableComponent,
    PetFilterComponent,
    PetSearchComponent,
    AsyncPipe,
  ],
  providers: [...PET_PROVIDERS],
  templateUrl: './pet-root.component.html',
})
export class PetRootComponent {
  readonly petListItems$ = this.petService.selectPetListItems();
  readonly totalPetsCount$ = this.petService.selectTotalPetListItemsCount();
  readonly petCategories$ = this.petService.selectPetCategories();
  readonly petListPagination$ = this.petService.selectPetListPagination();
  readonly petListFilter$ = this.petService.selectPetListFilter();
  readonly loading$ = this.petService.selectLoading();

  private readonly dialog = inject(MatDialog);
  private readonly notificationService = inject(NotificationService);
  private readonly destroyRef = inject(DestroyRef);

  constructor(private readonly petService: PetService) {}

  onAddNewPetClick() {
    this.openPetFormDialog(PetFormMode.CREATE);
  }

  onEditPetClick(petId: PetId) {
    this.openPetFormDialog(PetFormMode.UPDATE, petId);
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
      .pipe(
        take(1),
        filter((confirmed) => confirmed),
        switchMap(() => this.petService.deletePet(petId)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        this.notificationService.showSuccess('Pet removed successfully');
      });
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

  private openPetFormDialog(formMode: PetFormMode, petId?: PetId) {
    const dialogRef = this.dialog.open<
      PetFormDialogComponent,
      PetFormDialogData
    >(PetFormDialogComponent, {
      id: `pet-form-dialog__${formMode}`,
      width: '500px',
      data: {
        allPetCategories$: this.petCategories$,
        formMode,
        pet$: petId ? this.petService.selectPet(petId) : undefined,
      },
    });

    dialogRef.componentInstance
      .selectSubmitForm()
      .pipe(
        switchMap((formValue) =>
          formMode === PetFormMode.CREATE
            ? this.petService.createPet(formValue)
            : this.petService.updatePet(petId!, formValue),
        ),
        take(1),
        takeUntil(dialogRef.afterClosed()),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        this.notificationService.showSuccess(
          formMode === PetFormMode.CREATE
            ? 'Pet created successfully'
            : 'Pet updated successfully',
        );
        dialogRef.close();
      });
  }
}
