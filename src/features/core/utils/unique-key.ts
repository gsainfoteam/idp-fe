export function uniqueKey(str: string) {
  return str.split('').reduce((acc, char, index) => {
    return acc + char.charCodeAt(0) * (index + 1);
  }, 0);
}
