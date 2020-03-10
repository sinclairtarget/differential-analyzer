import * as d3 from 'd3';
import * as util from './util';

const WHEEL_INTERVAL = [-20, 10];
const ROTATIONS_PER_LOOP = 40;

export default class Wheel {
  constructor() {
    this.x = null;
    this.y = null;
    this.triangle = null;
  }

  setUp(parent) {
    this.triangle = parent.select('.wheel-triangle');

    let rect = this.triangle.node().getBoundingClientRect();
    this.x = rect.x;
    this.y = rect.y;
  }

  update(data, duration) {
    let maxY = d3.max(data, (d) => d.y);
    this.triangle.attr('transform', util.transl(WHEEL_INTERVAL[0], 0))
                 .interrupt()
                 .transition()
                 .duration(duration)
                 .ease((t) => {
                   let [x, y] = util.interpolateData(data, t);
                   return y / maxY;
                 })
                 .attrTween('transform', () => {
                   return (t) => {
                     let progress = t * ROTATIONS_PER_LOOP;
                     let progressThisRot = progress % 1;
                     let diff = WHEEL_INTERVAL[1] - WHEEL_INTERVAL[0];
                     let x = WHEEL_INTERVAL[0] + progressThisRot * diff;
                     return util.transl(x, 0);
                   };
                 });
  }
}
