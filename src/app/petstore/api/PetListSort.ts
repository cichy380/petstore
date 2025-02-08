import { PetListItem } from './PetListItem';

export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc',
}

export class PetListSort {
  constructor(
    public readonly sortColumn: keyof PetListItem,
    public readonly sortDirection: SortDirection,
  ) {}
}
