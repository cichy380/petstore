import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PetDTO } from './dto/PetDTO';
import { API_BASE_URL } from '../../ApiBaseUrlToken';

@Injectable({ providedIn: 'root' })
export class PetResource {
  constructor(
    private httpClient: HttpClient,
    @Inject(API_BASE_URL) private readonly BASE_URL: string,
  ) {}

  getAllPets(status: string): Observable<PetDTO[]> {
    return this.httpClient.get<PetDTO[]>(
      `${this.BASE_URL}/pet/findByStatus`,
      { params: { status } },
    );
  }
}
