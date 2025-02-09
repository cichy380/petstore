import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
    MatFormFieldModule,
    MatIcon,
    MatInput,
    ReactiveFormsModule,
    MatIconButton,
  ],
  templateUrl: './pet-search.component.html',
  styleUrl: './pet-search.component.css',
})
export class PetSearchComponent implements OnInit {
  @Output()
  changeSearchQuery = new EventEmitter<string>();

  form = new FormGroup<PetSearchForm>({
    search: new FormControl('', { nonNullable: true }),
  });

  ngOnInit() {
    this.form.valueChanges.subscribe((value) => {
      console.log(value);
    });
  }

  onSubmit() {
    this.changeSearchQuery.emit(this.form.value.search);
  }
}
