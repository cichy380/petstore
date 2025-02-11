import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../api-base-url.token';
import { PetId } from '../api/PetId';
import { PetDTO } from './dto/PetDTO';
import { DeletePetDTO } from './dto/DeletePetDTO';
import { CreatePetRequest } from './request/CreatePetRequest';
import { UpdatePetRequest } from './request/UpdatePetRequest';

@Injectable({ providedIn: 'root' })
export class PetResource {
  constructor(
    private httpClient: HttpClient,
    @Inject(API_BASE_URL) private readonly BASE_URL: string,
  ) {}

  readPets(status: string): Observable<PetDTO[]> {
    return this.httpClient.get<PetDTO[]>(`${this.BASE_URL}/pet/findByStatus`, {
      params: { status },
    });
  }

  createPet(pet: CreatePetRequest): Observable<PetDTO> {
    return this.httpClient.post<PetDTO>(`${this.BASE_URL}/pet`, pet);
  }

  updatePet(pet: UpdatePetRequest): Observable<PetDTO> {
    return this.httpClient.put<PetDTO>(`${this.BASE_URL}/pet`, pet);
  }

  deletePet(petId: PetId): Observable<DeletePetDTO> {
    return this.httpClient.delete<DeletePetDTO>(`${this.BASE_URL}/pet/${petId}`);
  }
}
