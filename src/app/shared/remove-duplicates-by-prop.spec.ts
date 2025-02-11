import { removeDuplicatesByProp } from './remove-duplicates-by-prop';

describe('removeDuplicatesByProp', () => {
  it('should remove duplicates based on a property', () => {
    const input = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 1, name: 'John' },
    ];
    const output = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ];
    expect(removeDuplicatesByProp(input, 'id')).toEqual(output);
  });

  it('should return the same array if there are no duplicates', () => {
    const input = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ];
    const output = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ];
    expect(removeDuplicatesByProp(input, 'id')).toEqual(output);
  });

  it('should handle an empty array', () => {
    const input: { id: number; name: string }[] = [];
    const output: { id: number; name: string }[] = [];
    expect(removeDuplicatesByProp(input, 'id')).toEqual(output);
  });

  it('should handle different property types', () => {
    const input = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 1, name: 'Alice' },
    ];
    const output = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ];
    expect(removeDuplicatesByProp(input, 'name')).toEqual(output);
  });
});
