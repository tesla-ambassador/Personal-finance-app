export function captitalizeFirst(value: string | "budget" | "pots"): string {
  const capitalized = value.charAt(0).toUpperCase() + value.slice(1);
  return capitalized;
}
