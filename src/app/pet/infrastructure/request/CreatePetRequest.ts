import { CreatePetCategoryRequest } from './CreatePetCategoryRequest';

export class CreatePetRequest {
  constructor(
    public id: number,
    public name: string,
    public photoUrls: string[],
    public status: string,
    public category?: CreatePetCategoryRequest,
  ) {
    this.photoUrls = photoUrls.filter(Boolean);
  }
}
