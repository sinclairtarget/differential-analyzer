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
                return util.interpolate(inputData, (d) => this.pos(d), t);
              }
            });
  }

  pos(d) {
    return { x: this.x, y: this.y - this.yScale(d.y) };
  }
}
