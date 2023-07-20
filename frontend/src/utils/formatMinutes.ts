export function convertToHoursAndMinutes(totalMinutes:number) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${hours} hr and ${minutes} min`;
}
