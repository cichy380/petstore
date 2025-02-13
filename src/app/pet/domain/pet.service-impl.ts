import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PetConverter } from './converter/PetConverter';
import { PetService } from '../api/pet.service';
import { PetListItem } from '../api/PetListItem';
import { PetListPagination } from '../api/PetListPagination';
import { PetListFilter } from '../api/PetListFilter';
import { PetListSort } from '../api/PetListSort';
import { PetFormValue } from '../api/PetFormValue';
import { PetCategory } from '../api/PetCategory';
import { PetRepository } from './pet.repository';
import { PetId } from '../api/PetId';
import { Pet } from '../api/Pet';
import { removeHtmlTags } from '../../shared/remove-html-tags';

@Injectable()
export class PetServiceImpl implements PetService {
  constructor(private readonly petRepository: PetRepository) {}

  selectPetListItems(): Observable<PetListItem[]> {
    return this.petRepository.selectPetListItems();
  }

  selectPet(petId: PetId): Observable<Pet> {
    return this.petRepository.selectPet(petId);
  }

  selectTotalPetListItemsCount(): Observable<number> {
    return this.petRepository.selectTotalPetListItemsCount();
  }

  selectPetCategories(): Observable<PetCategory[]> {
    return this.petRepository.selectPetCategories();
  }

  selectPetListPagination(): Observable<PetListPagination> {
    return this.petRepository.selectPetListPagination();
  }

  selectPetListFilter(): Observable<PetListFilter> {
    return this.petRepository.selectPetListFilter();
  }

  selectLoading(): Observable<boolean> {
    return this.petRepository.selectLoading();
  }

  createPet(petFormValue: PetFormValue): Observable<void> {
    const newPetId = this.createPetId();
    petFormValue.name = this.sanitize(petFormValue.name);
    petFormValue.photoUrls = petFormValue.photoUrls.map(url => this.sanitize(url));
    return this.petRepository.createPet(
      PetConverter.toPet(newPetId, petFormValue),
    );
  }

  updatePet(petId: PetId, petFormValue: PetFormValue): Observable<void> {
    petFormValue.name = this.sanitize(petFormValue.name);
    petFormValue.photoUrls = petFormValue.photoUrls.map(url => this.sanitize(url));
    return this.petRepository.updatePet(
      PetConverter.toPet(petId, petFormValue),
    );
  }

  deletePet(petId: PetId): Observable<void> {
    return this.petRepository.deletePet(petId);
  }

  updatePetListPagination(pagination: PetListPagination) {
    this.petRepository.updatePetListPagination(pagination);
  }

  updatePetListFilter(filter: PetListFilter): void {
    this.petRepository.updatePetListFilter(filter);
  }

  updatePetListSort(sort: PetListSort | null): void {
    this.petRepository.updatePetListSort(sort);
  }

  updatePetListSearch(query: string): void {
    this.petRepository.updatePetListSearch(query);
  }

  private createPetId(): number {
    return Math.floor(Math.random() * 1000000);
  }

  private sanitize(text: string): string {
    return removeHtmlTags(text.trim());
  }
}
