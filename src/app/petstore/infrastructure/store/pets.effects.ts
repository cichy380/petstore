import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { PetstoreResource } from '../PetstoreResource';
import * as PetActions from './pets.actions';
import { Pet } from '../../model/Pet';


@Injectable()
export class PetsEffects {
  constructor(
    private actions$: Actions,
    private petstoreResource: PetstoreResource
  ) {
  }

  loadPets$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PetActions.loadPets),
      switchMap(() =>
        this.petstoreResource.getAllPets().pipe(
          map((pets: Array<Pet>) => PetActions.loadPetsSuccess({ pets })),
          catchError(() => of(PetActions.loadPetsFailed))
        )
      )
    )
  );
}
