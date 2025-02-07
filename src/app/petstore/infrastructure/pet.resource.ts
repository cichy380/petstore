import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PetDTO } from './dto/PetDTO';


// TODO: to provider
@Injectable({ providedIn: 'root' })
export class PetResource {

  constructor(private httpClient: HttpClient) {
  }

  getAllPets(): Observable<PetDTO[]> {
    return this.httpClient.get<PetDTO[]>('https://petstore.swagger.io/v2/pet/findByStatus?status=available');
  }
}
