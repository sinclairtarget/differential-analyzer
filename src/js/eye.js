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
    this.data = null;
  }

  setUp(parent, doc, selector, data) {
    parent.node().appendChild(doc.node().querySelector(selector));
    this.eye = parent.select(selector)
                     .attr('transform', util.transl(this.x, this.y));

    this.data = data.map((d) => this.pos(d));
  }

  update(duration) {
    let startPos = this.data[0];
    this.eye.attr('transform', util.transl(startPos.x, startPos.y))
            .interrupt()
            .transition()
            .duration(duration)
            .ease(d3.easeLinear)
            .attrTween('transform', () => {
              // Custom interpolate to get eye to travel along function
              return (t) => {
                return util.interpolate(this.data, t);
              }
            });
  }

  pos(d) {
    return { x: this.x, y: this.y - this.yScale(d.y) };
  }
}
