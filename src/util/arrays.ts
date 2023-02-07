export function range(start: number, end: number, step = 1): number[] {
  return Array.from(Array(end - start).keys())
    .filter(it => it % step == 0)
    .map(it => it + start);
}

export function rangeTo(end: number): number[] {
  return range(0, end);
}

