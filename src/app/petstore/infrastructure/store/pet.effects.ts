import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { PetResource } from '../pet.resource';
import { PetCategoryConverter } from '../converter/PetCategoryConverter';
import { PetConverter } from '../converter/PetConverter';
import * as PetActions from './pet.actions';
import { PetListPaginationStorage } from '../pet-list-pagination.storage';
import { PetListPagination } from '../../api/PetListPagination';


@Injectable()
export class PetEffects {
  loadPets$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PetActions.loadPets),
      switchMap((action) =>
        this.petResource.getAllPets(action.status).pipe(
          map((pets) => {
            this.petListPaginationStorage.set(new PetListPagination(0));
            return PetActions.loadPetsSuccess({
              pets: pets.filter(pet => pet.name).map(pet => PetConverter.toPetAnemia(pet)),
              categories: pets
                .filter((pet) => !!pet.category)
                .map((pet) =>
                  PetCategoryConverter.toPetCategoryAnemia(pet.category!),
                ),
            });
          }),
          catchError(() => of(PetActions.loadPetsFailed())),
        ),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private petResource: PetResource,
    private petListPaginationStorage: PetListPaginationStorage
  ) {
  }
}
