import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { PetResource } from '../pet.resource';
import { PetCategoryConverter } from '../converter/PetCategoryConverter';
import { PetConverter } from '../converter/PetConverter';
import * as PetActions from './pet.actions';


@Injectable()
export class PetEffects {

  loadPets$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PetActions.loadPets),
      switchMap(() =>
        this.petResource.getAllPets().pipe(
          map(pets => PetActions.loadPetsSuccess({
            pets: pets.map(pet => PetConverter.toPetAnemia(pet)),
            categories: pets.filter(pet => !!pet.category).map(pet => PetCategoryConverter.toPetCategoryAnemia(pet.category!))
          })),
          catchError(() => of(PetActions.loadPetsFailed()))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private petResource: PetResource
  ) {
  }
}
