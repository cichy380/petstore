export class PetListPagination {
  private static readonly DEFAULT_PAGE_SIZE = 10;

  constructor(
    public readonly pageIndex: number,
    public readonly pageSize: number = PetListPagination.DEFAULT_PAGE_SIZE,
  ) {}
}
