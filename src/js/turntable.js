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
  }

  setUp(parent) {
    this.turntable = parent.select('g.turntable')
                           .attr('transform', util.transl(this.x, this.y));

    this.disk = this.turntable.select('g.disk');
  }

  update(inputData, duration) {
    let startPos = this.pos(inputData[0]);
    this.turntable.attr('transform', util.transl(startPos.x, startPos.y))
              .interrupt()
              .transition()
              .duration(duration)
              .ease(d3.easeLinear)
              .attrTween('transform', () => {
                return (t) => {
                  return util.interpolate(inputData, (d) => this.pos(d), t);
                }
              });

    let [cx, cy] = [590, 303]; // Guesswork! (Should figure out how to do this)
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
