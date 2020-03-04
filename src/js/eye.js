import * as d3 from 'd3';
import * as util from './util';

const FUDGE = 1;

export default class Eye {
  constructor(x, y, yInterval, plotHeight) {
    this.x = x + FUDGE;
    this.y = y;
    this.yInterval = yInterval;
    this.yScale = d3.scaleLinear()
                    .domain(this.yInterval)
                    .range([0, plotHeight]);
    this.eye = null;
  }

  setUp(parent, doc) {
    parent.node().appendChild(doc.node().querySelector('g.input-eye'));
    this.eye = parent.select('g.input-eye')
                     .attr('transform', util.transl(this.x, this.y));
  }

  update(inputData, duration) {
    let startPos = this.pos(inputData[0]);
    this.eye.attr('transform', util.transl(startPos.x, startPos.y))
            .interrupt()
            .transition()
            .duration(duration)
            .ease(d3.easeLinear)
            .attrTween('transform', () => {
              // Custom interpolate to get eye to travel along function
              return (t) => {
                return this.interpolate(inputData, t);
              }
            });
  }

  pos(d) {
    return { x: this.x, y: this.y - this.yScale(d.y) };
  }

  interpolate(inputData, t) {
    let len = inputData.length;
    let index = Math.min(Math.floor(t * len), len - 1);
    let indexNext = index;
    if (index < inputData.length - 2)
      indexNext = index + 1;

    let t1 = index / inputData.length;
    let t2 = indexNext / inputData.length;
    let tdiff = (t - t1) / (t2 - t1);

    let pos1 = this.pos(inputData[index]);
    let pos2 = this.pos(inputData[indexNext]);
    return util.transl(pos1.x, pos1.y + tdiff * (pos2.y - pos1.y));
  }

  pairForTime(inputData, t) {
    let len = inputData.length;
    let index = Math.min(Math.floor(t * len), len - 1);
  }
}
