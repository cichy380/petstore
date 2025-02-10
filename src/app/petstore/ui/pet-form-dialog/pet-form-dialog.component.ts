import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { Observable, Subject } from 'rxjs';
import { PetStatus } from '../../api/PetStatus';
import { PetCategory } from '../../api/PetCategory';
import { PetFormValue } from '../../api/PetFormValue';

type PetForm = {
  name: FormControl<string>;
  category: FormControl<PetCategory | null>;
  photoUrls: FormArray<FormControl<string>>;
  status: FormControl<PetStatus>;
};

@Component({
  selector: 'app-pet-form-dialog',
  standalone: true,
  templateUrl: './pet-form-dialog.component.html',
  styleUrl: './pet-form-dialog.component.css',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    AsyncPipe,
  ],
})
export class PetFormDialogComponent {
  readonly input = inject<{ petCategories$: Observable<PetCategory[]> }>(
    MAT_DIALOG_DATA,
  );

  readonly form = new FormGroup<PetForm>({
    name: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    category: new FormControl(null),
    photoUrls: new FormArray<FormControl>([new FormControl('', { nonNullable: true })]),
    status: new FormControl(PetStatus.AVAILABLE, { nonNullable: true }),
  });

  readonly statusOptions = Object.values(PetStatus);

  readonly dialogRef = inject(MatDialogRef<PetFormDialogComponent>);

  private readonly submitFormSubject$ = new Subject<PetFormValue>();

  onAddPhotoUrlClick() {
    this.form.controls['photoUrls']?.push(new FormControl('', { nonNullable: true }));
  }

  onSubmit() {
    if (this.form.valid) {
      this.submitFormSubject$.next(this.getPetFormValue());
    }
  }

  onCancelClick() {
    this.dialogRef.close();
  }

  selectSubmitForm(): Observable<PetFormValue> {
    return this.submitFormSubject$.asObservable();
  }

  private getPetFormValue(): PetFormValue {
    return { ...this.form.getRawValue(), 'photoUrls': this.form.getRawValue()['photoUrls'].filter(Boolean) };
  }
}
