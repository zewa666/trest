
export function sum(a, ...b) {
  return [a, ...b].reduce((prev, curr) => prev + curr, 0);
}

export async function asyncSum(a, ...b) {
  const all = await Promise.all([a, ...b]);

  return sum(...all);
}