import * as d3 from 'd3';
import * as util from './util';

const DISPLACEMENT_INTERVAL = [0, 60];

export default class Turntable {
  constructor(x, y, yInterval) {
    this.x = x;
    this.y = y;
    this.yScale = d3.scaleLinear()
                    .domain(yInterval)
                    .range(DISPLACEMENT_INTERVAL);

    this.turntable = null;
    this.disk = null;
    this.data = null;
  }

  setUp(parent, data) {
    this.turntable = parent.select('g.turntable')
                           .attr('transform', util.transl(this.x, this.y));

    this.disk = this.turntable.select('g.disk');
    this.data = data.map((d) => this.pos(d));
  }

  update(duration) {
    let startPos = this.data[0];
    this.turntable.attr('transform', util.transl(startPos.x, startPos.y))
              .interrupt()
              .transition()
              .duration(duration)
              .ease(d3.easeLinear)
              .attrTween('transform', () => {
                return (t) => {
                  return util.interpolate(this.data, t);
                }
              });

    let [cx, cy] = [591, 302]; // Guesswork! (Should figure out how to do this)
    this.disk.attr('transform', util.rot(0, cx, cy))
             .interrupt()
             .transition()
             .duration(duration)
             .ease(d3.easeLinear)
             .attrTween('transform', () => {
               return (t) => {
                 return util.rot(t * 360, cx, cy);
               }
             });
  }

  pos(d) {
    return { x: this.x, y: this.y - this.yScale(d.y) };
  }
}
