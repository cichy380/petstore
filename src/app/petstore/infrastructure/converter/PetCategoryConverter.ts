import { PetCategoryDTO } from '../dto/PetCategoryDTO';
import { PetCategoryAnemia } from '../anemia/PetCategoryAnemia';
import { PetCategoriesMapAnemia } from '../anemia/PetCategoriesMapAnemia';


export class PetCategoryConverter {
  static toPetCategoryAnemia(petCategory: PetCategoryDTO): PetCategoryAnemia {
    return new PetCategoryAnemia(
      petCategory.id,
      petCategory.name
    )
  }

  static toPetCategoriesMapAnemia(petCategories: PetCategoryAnemia[]): PetCategoriesMapAnemia {
    return petCategories.reduce((map, petCategory) => {
      map[petCategory.petCategoryId] = petCategory;
      return map;
    }, {} as PetCategoriesMapAnemia);
  }
}
