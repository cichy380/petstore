type PetCategoryId = number;

export class PetCategory {
  constructor(
    public petCategoryId: PetCategoryId,
    public petCategoryName: string
  ) {
  }
}
