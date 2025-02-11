import { Routes } from '@angular/router';
import { PetRootComponent } from './pet';

export const routes: Routes = [
  {
    path: 'pet',
    component: PetRootComponent,
  },
  {
    path: 'store',
    loadComponent: () => import('./store').then(m => m.StoreRootComponent),
  },
  {
    path: 'user',
    loadComponent: () => import('./user').then(m => m.UserRootComponent),
  },
  {
    path: '',
    redirectTo: 'pet',
    pathMatch: 'full'
  },
];
