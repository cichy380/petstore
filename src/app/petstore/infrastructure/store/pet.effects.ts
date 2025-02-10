import { Injectable } from '@angular/core';
import { HttpStatusCode } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, tap } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { PetResource } from '../pet.resource';
import { PetCategoryConverter } from '../converter/PetCategoryConverter';
import { PetConverter } from '../converter/PetConverter';
import * as PetActions from './pet.actions';
import { AppErrorMessageStorage } from '../../../shared/app-error-message-storage';

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
          catchError((httpErrorResponse) =>
            of(
              PetActions.loadPetsFailure({
                errorMessage: this.getPetLoadErrorMessage(
                  httpErrorResponse.status,
                ),
              }),
            ),
          ),
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
          catchError((httpErrorResponse) =>
            of(
              PetActions.createPetFailure({
                errorMessage: this.getPetCreateErrorMessage(
                  httpErrorResponse.status,
                ),
              }),
            ),
          ),
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
          catchError((httpErrorResponse) =>
            of(
              PetActions.updatePetFailure({
                errorMessage: this.getPetUpdateErrorMessage(
                  httpErrorResponse.status,
                ),
              }),
            ),
          ),
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
          catchError((httpErrorResponse) =>
            of(
              PetActions.deletePetFailure({
                errorMessage: this.getPetDeleteErrorMessage(
                  httpErrorResponse.status,
                ),
              }),
            ),
          ),
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

  error$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          PetActions.loadPetsFailure,
          PetActions.createPetFailure,
          PetActions.updatePetFailure,
          PetActions.deletePetFailure,
        ),
        tap(
          (action) =>
            action.errorMessage &&
            this.appErrorMessageStorage.set(action.errorMessage),
        ),
      ),
    { dispatch: false },
  );

  constructor(
    private readonly actions$: Actions,
    private readonly petResource: PetResource,
    private readonly appErrorMessageStorage: AppErrorMessageStorage,
  ) {}

  private getPetLoadErrorMessage(status: HttpStatusCode): string | undefined {
    switch (status) {
      case HttpStatusCode.BadRequest:
        return 'Invalid input';
      default:
        return undefined;
    }
  }

  private getPetCreateErrorMessage(status: HttpStatusCode): string | undefined {
    switch (status) {
      case HttpStatusCode.MethodNotAllowed:
        return 'Invalid input';
      default:
        return undefined;
    }
  }

  private getPetUpdateErrorMessage(status: HttpStatusCode): string | undefined {
    switch (status) {
      case HttpStatusCode.BadRequest:
        return 'Invalid ID supplied';
      case HttpStatusCode.NotFound:
        return 'Pet not found';
      case HttpStatusCode.MethodNotAllowed:
        return 'Validation exception';
      default:
        return undefined;
    }
  }

  private getPetDeleteErrorMessage(status: HttpStatusCode): string | undefined {
    switch (status) {
      case HttpStatusCode.BadRequest:
        return 'Invalid ID supplied';
      case HttpStatusCode.NotFound:
        return 'Pet not found';
      default:
        return undefined;
    }
  }
}
