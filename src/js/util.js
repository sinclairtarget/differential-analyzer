export function transl(x, y) {
  return 'translate(' + x + ',' + y + ')';
}

// Inclusive
export function range(start, stop) {
  return Array(stop + 1 - start).fill(1).map((x, y) => x + y)
                                    .map((x) => x + start - 1);
}
