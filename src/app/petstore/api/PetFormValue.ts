import { PetCategory } from './PetCategory';
import { PetStatus } from './PetStatus';

export class PetFormValue {
  constructor(
    public readonly name: string,
    public readonly photoUrls: string[],
    public readonly status: PetStatus,
    public readonly category: PetCategory | null = null,
  ) {
    this.photoUrls = this.photoUrls.length ? this.photoUrls : [''];
  }
}
