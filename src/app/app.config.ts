import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import { PET_STORE_KEY, petReducer } from './petstore/infrastructure/store/pet.reducer';
import { PetEffects } from './petstore/infrastructure/store/pet.effects';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideStore({ [PET_STORE_KEY]: petReducer }),
    provideEffects([PetEffects]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode()
    }),
    provideAnimationsAsync(),
    // [
    //   { provide: 'BASE_URL', useValue: 'https://petstore.swagger.io/v2' }
    // ]
  ]
};
