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
      switchMap((action) =>
        this.petResource.readPets(action.status).pipe(
          map((pets) =>
            PetActions.loadPetsSuccess({
              pets: pets
                .filter((pet) => pet.name)
                .map((pet) => PetConverter.toPetAnemia(pet)),
              categories: pets
                .filter((pet) => !!pet.category)
                .map((pet) =>
                  PetCategoryConverter.toPetCategoryAnemia(pet.category!),
                ),
            }),
          ),
          catchError(() => of(PetActions.loadPetsFailure())),
        ),
      ),
    ),
  );

  createPet$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PetActions.createPet),
      switchMap((action) =>
        this.petResource.createPet(action.pet).pipe(
          map((pet) =>
            PetActions.createPetSuccess({
              pet: PetConverter.toPetAnemia(pet),
            }),
          ),
          catchError(() => of(PetActions.createPetFailure())),
        ),
      ),
    ),
  );

  updatePet$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PetActions.updatePet),
      switchMap((action) =>
        this.petResource.updatePet(action.pet).pipe(
          map((pet) =>
            PetActions.updatePetSuccess({
              pet: PetConverter.toUpdatePetAnemia(pet),
            }),
          ),
          catchError(() => of(PetActions.updatePetFailure())),
        ),
      ),
    ),
  );

  deletePet$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PetActions.deletePet),
      switchMap((action) =>
        this.petResource.deletePet(action.petId).pipe(
          map((_) =>
            PetActions.deletePetSuccess({
              petId: action.petId,
            }),
          ),
          catchError(() => of(PetActions.deletePetFailure())),
        ),
      ),
    ),
  );

  updatePetListFilter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PetActions.updatePetListFilter),
      map((action) =>
        PetActions.loadPets({ status: action.filter.filterStatus }),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private petResource: PetResource,
  ) {}
}
