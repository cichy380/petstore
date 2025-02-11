import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { PetListPagination } from '../api/PetListPagination';
import { PetListSort, SortDirection } from '../api/PetListSort';
import { PetAnemia } from './anemia/PetAnemia';
import * as PetSelectors from './store/pet.selectors';
import { PetStorage } from './pet.storage';

describe('PetStorage', () => {
  let service: PetStorage;
  let store: MockStore;

  const mockInitialPets: PetAnemia[] = [
    new PetAnemia(1, 'Dog', [], 'available', 1, 'Animals'),
    new PetAnemia(2, 'Cat', [], 'available', 2, 'Animals'),
    new PetAnemia(3, 'Bird', [], 'available', 3, 'Birds'),
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PetStorage,
        provideMockStore({
          selectors: [
            { selector: PetSelectors.getAllPets, value: mockInitialPets },
            { selector: PetSelectors.getPetListSearchQuery, value: '' },
            {
              selector: PetSelectors.getPetListPagination,
              value: new PetListPagination(0, 2),
            },
            { selector: PetSelectors.getPetListSort, value: null },
          ],
        }),
      ],
    });

    service = TestBed.inject(PetStorage);
    store = TestBed.inject(MockStore);
  });

  it('should filter, sort, and paginate the pets correctly', (done) => {
    store.overrideSelector(PetSelectors.getAllPets, mockInitialPets);
    store.overrideSelector(PetSelectors.getPetListSearchQuery, 'a');
    store.overrideSelector(PetSelectors.getPetListPagination, new PetListPagination(0, 2));
    store.overrideSelector(PetSelectors.getPetListSort, new PetListSort('petName', SortDirection.ASC));

    service.selectPetListItems().subscribe((petListItems) => {
      expect(petListItems.length).toBe(2);
      expect(petListItems[0].petName).toBe('Cat');
      expect(petListItems[1].petName).toBe('Dog');
      done();
    });
  });

  it('should work correctly when no search query matches', (done) => {
    store.overrideSelector(PetSelectors.getPetListSearchQuery, 'elephant');

    service.selectPetListItems().subscribe((petListItems) => {
      expect(petListItems.length).toBe(0); // No matching pets
      done();
    });
  });

  it('should sort correctly in descending order', (done) => {
    store.overrideSelector(PetSelectors.getPetListSort, new PetListSort('petName', SortDirection.DESC));

    service.selectPetListItems().subscribe((petListItems) => {
      expect(petListItems.length).toBe(2);
      expect(petListItems[0].petName).toBe('Dog');
      expect(petListItems[1].petName).toBe('Cat');
      done();
    });
  });

  it('should paginate correctly for the second page', (done) => {
    store.overrideSelector(PetSelectors.getPetListPagination, new PetListPagination(1, 2));

    service.selectPetListItems().subscribe((petListItems) => {
      expect(petListItems.length).toBe(1);
      expect(petListItems[0].petName).toBe('Bird');
      done();
    });
  });
});
