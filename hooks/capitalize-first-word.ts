export function captitalizeFirst(value: string): string {
  const capitalized = value.charAt(0).toUpperCase() + value.slice(1);
  return capitalized;
}
