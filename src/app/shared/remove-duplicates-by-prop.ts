export function removeDuplicatesByProp<T>(array: T[], property: keyof T): T[] {
  const seenIds = new Set();
  return array.filter((item) => {
    if (seenIds.has(item[property])) {
      return false;
    }
    seenIds.add(item[property]);
    return true;
  });
}
