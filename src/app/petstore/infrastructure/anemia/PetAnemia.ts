export class PetAnemia {
  constructor(
    public petId: number,
    public petName: string,
    public petPhotoUrls: string[],
    public petStatus: string,
    public petCategoryId?: number
  ) {
  }
}
