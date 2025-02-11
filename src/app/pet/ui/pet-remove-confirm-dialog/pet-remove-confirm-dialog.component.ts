import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PetRemoveConfirmDialogData } from '../../api/PetRemoveConfirmDialogData';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-pet-remove-confirm-dialog',
  standalone: true,
  templateUrl: './pet-remove-confirm-dialog.component.html',
  imports: [MatButtonModule, AsyncPipe],
  styleUrl: './pet-remove-confirm-dialog.component.css',
})
export class PetRemoveConfirmDialogComponent {
  readonly dialogInput = inject<PetRemoveConfirmDialogData>(MAT_DIALOG_DATA);

  readonly dialogRef = inject(MatDialogRef<PetRemoveConfirmDialogComponent>);

  onCancelClick() {
    this.dialogRef.close(false);
  }

  onRemoveClick() {
    this.dialogRef.close(true);
  }
}
