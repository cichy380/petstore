import { PetCategoryDTO } from './PetCategoryDTO';


export class PetDTO {
  public id!: number;
  public name!: string;
  public category?: PetCategoryDTO;
  public photoUrls!: string[];
  public tags!: string[];
  public status!: string;
}
