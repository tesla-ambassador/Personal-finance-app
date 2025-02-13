export function convertToDollar(n: number): string {
  const formattedNumber = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(n);

  return formattedNumber;
}

export function sumOfNumbers(arr: number[]): number {
  let sum = 0;
  arr.forEach((num) => {
    sum += num;
  });
  return sum;
}
