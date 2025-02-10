type PetCategoryId = number;

export class PetCategory {
  constructor(
    public readonly petCategoryId: PetCategoryId,
    public readonly petCategoryName: string
  ) {
  }
}
