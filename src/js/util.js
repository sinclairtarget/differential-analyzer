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

export function interpolate(inputData, pos, t) {
  let len = inputData.length;
  let index = Math.min(Math.floor(t * len), len - 1);
  let indexNext = index;
  if (index < inputData.length - 1)
    indexNext = index + 1;

  let t1 = index / inputData.length;
  let t2 = indexNext / inputData.length;
  let tdiff = 0;
  if (t1 != t2)
    tdiff = (t - t1) / (t2 - t1);

  let pos1 = pos(inputData[index]);
  let pos2 = pos(inputData[indexNext]);
  return transl(pos1.x, pos1.y + tdiff * (pos2.y - pos1.y));
}
