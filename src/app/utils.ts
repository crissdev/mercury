export function createEqualityComparer<T>(name: keyof T, ascending = true) {
  return function stringPropertySortAsc(first: T, second: T) {
    if (first[name] < second[name]) {
      return ascending ? -1 : 1;
    }
    if (first[name] > second[name]) {
      return ascending ? 1 : -1;
    }
    return 0;
  };
}
