import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pet } from '../model/Pet';


@Injectable({ providedIn: 'root' })
export class PetstoreResource {

  constructor(private http: HttpClient) {
  }

  getAllPets(): Observable<Pet[]> {
    return this.http.get<Pet[]>('https://petstore.swagger.io/v2/pet/findByStatus?status=available');
  }
}
