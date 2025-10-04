export type Comparable = number | string | bigint | Date | boolean;

export function sortBy<T, K extends Comparable>(
  arr: T[],
  key: (item: T) => K,
): T[] {
  return arr
    .map((item) => [key(item), item] as [K, T])
    .sort(([keyA], [keyB]) => {
      if (keyA < keyB) return -1;
      if (keyA > keyB) return 1;
      return 0;
    })
    .map(([, item]) => item);
}

export function sortByMulti<T, K extends Comparable[]>(
  arr: T[],
  key: (item: T) => K,
): T[] {
  return arr
    .map((item) => [key(item), item] as [K, T])
    .sort(([keyA], [keyB]) => {
      for (let i = 0; i < Math.min(keyA.length, keyB.length); i++) {
        if (keyA[i]! < keyB[i]!) return -1;
        if (keyA[i]! > keyB[i]!) return 1;
      }
      return 0;
    })
    .map(([, item]) => item);
}
