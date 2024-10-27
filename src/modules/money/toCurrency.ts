export function toCurrency(value: number) {
  return `£${(value / 100).toFixed(2)}`;
}
