import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
import { Observable, Subject, take } from 'rxjs';
import { PetStatus } from '../../api/PetStatus';
import { PetCategory } from '../../api/PetCategory';
import { PetFormValue } from '../../api/PetFormValue';
import { PetFormMode } from '../../api/PetFormMode';
import { PetFormDialogData } from '../../api/PetFormDialogData';
import { map } from 'rxjs/operators';

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
export class PetFormDialogComponent implements OnInit {
  readonly dialogInput = inject<PetFormDialogData>(MAT_DIALOG_DATA);

  readonly PetFormMode = PetFormMode;

  form!: FormGroup<PetForm>;

  readonly statusOptions = Object.values(PetStatus);

  readonly dialogRef = inject(MatDialogRef<PetFormDialogComponent>);
  private readonly destroyRef = inject(DestroyRef);
  private readonly submitFormSubject$ = new Subject<PetFormValue>();

  ngOnInit() {
    if (this.dialogInput.formMode === PetFormMode.CREATE) {
      const initialPetFormValue = new PetFormValue('', [], PetStatus.AVAILABLE);
      this.form = this.createPetFormGroup(initialPetFormValue);
    } else if (this.dialogInput.formMode === PetFormMode.UPDATE) {
      this.selectPetFormValue()
        ?.pipe(take(1), takeUntilDestroyed(this.destroyRef))
        .subscribe((formValue) => {
          this.form = this.createPetFormGroup(formValue);
        });
    }
  }

  onAddPhotoUrlClick() {
    this.form.controls['photoUrls']?.push(
      new FormControl('', { nonNullable: true }),
    );
  }

  onSubmit() {
    if (this.form.valid) {
      this.submitFormSubject$.next(this.form.getRawValue());
    }
  }

  onCancelClick() {
    this.dialogRef.close();
  }

  selectSubmitForm(): Observable<PetFormValue> {
    return this.submitFormSubject$.asObservable();
  }

  compareCategories(option1: PetCategory, option2: PetCategory): boolean {
    return option1?.petCategoryId === option2?.petCategoryId;
  }

  private createPetFormGroup(formValue: PetFormValue): FormGroup<PetForm> {
    return new FormGroup<PetForm>({
      name: new FormControl(formValue.name, {
        validators: [Validators.required],
        nonNullable: true,
      }),
      category: new FormControl(formValue.category),
      photoUrls: new FormArray<FormControl>(
        formValue.photoUrls.map(
          (photoUrl) => new FormControl(photoUrl, { nonNullable: true }),
        ),
      ),
      status: new FormControl(formValue.status, { nonNullable: true }),
    });
  }

  private selectPetFormValue(): Observable<PetFormValue> | undefined {
    return this.dialogInput.pet$?.pipe(
      map(
        (pet) =>
          new PetFormValue(
            pet.petName,
            pet.petPhotoUrls,
            pet.petStatus,
            pet.petCategory,
          ),
      ),
    );
  }
}
