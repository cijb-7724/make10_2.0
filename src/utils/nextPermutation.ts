export const nextPermutation = (array: number[]): boolean => {
  let i = array.length - 2;
  while (i >= 0 && array[i] >= array[i + 1]) --i;

  if (i < 0) return false;

  let j = array.length - 1;
  while (array[j] <= array[i]) --j;

  [array[i], array[j]] = [array[j], array[i]];

  let left = i + 1;
  let right = array.length - 1;
  while (left < right) {
      [array[left], array[right]] = [array[right], array[left]];
      ++left;
      --right;
  }

  return true;
}
