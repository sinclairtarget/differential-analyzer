export function transl(x, y) {
  return 'translate(' + x + ',' + y + ')';
}

export function rot(a, x, y) {
  return 'rotate(' + a + ',' + x + ',' + y + ')';
}

// Inclusive
export function range(start, stop) {
  return Array(stop + 1 - start).fill(1).map((x, y) => x + y)
                                    .map((x) => x + start - 1);
}

export function interpolateData(data, t) {
  let len = data.length;
  let index = Math.min(Math.floor(t * len), len - 1);
  let indexNext = index;
  if (index < data.length - 1)
    indexNext = index + 1;

  let t1 = index / data.length;
  let t2 = indexNext / data.length;
  let tdiff = 0;
  if (t1 != t2)
    tdiff = (t - t1) / (t2 - t1);

  let d1 = data[index];
  let d2 = data[indexNext];
  return [d1.x, d1.y + tdiff * (d2.y - d1.y)];
}

export function interpolate(data, t) {
  let [x, y] = interpolateData(data, t);
  return transl(x, y);
}
