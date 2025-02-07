import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./petstore').then(m => m.PetRootComponent),
  }
];
