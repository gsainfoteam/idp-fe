export function timeString(sec: number) {
  const minutes = Math.floor(sec / 60);
  const seconds = sec % 60;

  return `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`;
}
