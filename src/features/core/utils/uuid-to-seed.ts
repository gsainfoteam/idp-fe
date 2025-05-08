export function uuidToSeed(uuid: string) {
  return uuid.split('').reduce((acc, char) => {
    return acc + char.charCodeAt(0);
  }, 0);
}
