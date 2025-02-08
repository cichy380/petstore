export class PetListPagination {
  private static readonly DEFAULT_PAGE_SIZE = 10;

  constructor(
    public readonly page: number,
    public readonly pageSize: number = PetListPagination.DEFAULT_PAGE_SIZE
  ) {
  }
}
