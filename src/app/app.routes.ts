import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pet').then(m => m.PetRootComponent),
  }
];
