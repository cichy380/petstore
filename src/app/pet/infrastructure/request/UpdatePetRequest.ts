import { UpdatePetCategoryRequest } from './UpdatePetCategoryRequest';

export class UpdatePetRequest {
  constructor(
    public id: number,
    public name: string,
    public photoUrls: string[],
    public status: string,
    public category?: UpdatePetCategoryRequest,
  ) {
    this.photoUrls = photoUrls.filter(Boolean);
  }
}
