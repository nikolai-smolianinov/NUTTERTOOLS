export function pushToLimitedArray<T>(
  array: T[],
  items: T | T[],
  limit: number,
): T[] {
  // Convert single item to array if needed
  const itemsToAdd = Array.isArray(items) ? items : [items];

  // Combine existing array with new items
  const newArray = [...array, ...itemsToAdd];

  // If array exceeds limit, remove elements from the beginning
  if (newArray.length > limit) {
    return newArray.slice(-limit);
  }

  return newArray;
}
