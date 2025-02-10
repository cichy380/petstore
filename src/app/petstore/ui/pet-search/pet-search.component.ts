import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatIconButton } from '@angular/material/button';

type PetSearchForm = {
  search: FormControl<string>;
};

@Component({
  selector: 'app-pet-search',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIcon,
    MatInput,
    MatIconButton,
  ],
  templateUrl: './pet-search.component.html',
  styleUrl: './pet-search.component.css',
})
export class PetSearchComponent {
  @Output()
  changeSearchQuery = new EventEmitter<string>();

  form = new FormGroup<PetSearchForm>({
    search: new FormControl('', { nonNullable: true }),
  });

  onSubmit() {
    this.changeSearchQuery.emit(this.form.value.search);
  }
}
