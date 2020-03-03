import * as util from './util';

//  [0, 1, 4, 9, 16] ->
// [0, 0, 1, 5, 14]
export function integrate(f_data) {
  let sum = 0;
  let ret = [];
  for (const { x, y } of f_data) {
    ret.push({ x: x, y: sum});
    sum = sum + y;
  }

  return ret;
}

// Stop is inclusive
export function stream_of_x(stop) {
  return util.range(0, stop);
}
