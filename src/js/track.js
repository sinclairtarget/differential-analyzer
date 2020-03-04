import * as d3 from 'd3';
import Chart from './chart';
import * as util from './util';

const CHART_WIDTH = 400;
const CHART_HEIGHT = 240;
const FUDGE = 10;

// Represents the track or conveyor the input and output charts are mounted
// on.
export default class Track {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.input = new Chart(0, 0, CHART_WIDTH, CHART_HEIGHT,
                           [0, 100], [0, 10]);
    this.output = new Chart(CHART_WIDTH, 0, CHART_WIDTH, CHART_HEIGHT,
                            [0, 100], [0, 600]);
    this.group = null;
  }

  setUp(parent) {
    this.group = parent.append('g')
                       .attr('transform', this.startCoord())
                       .attr('class', 'track');

    this.input.setUp(this.group);
    this.output.setUp(this.group);
  }

  update(inputData, outputData, duration) {
    this.group.attr('transform', this.startCoord())
              .interrupt()
              .transition()
              .duration(duration)
              .ease(d3.easeLinear)
              .attr('transform', this.endCoord());

    this.input.drawCurve(inputData);
    this.output.drawCurve(outputData, duration);
  }

  startCoord() {
    return util.transl(this.x + CHART_WIDTH - this.output.dim.margin.left
                       - this.output.dim.padding.left - FUDGE,
                       this.y);
  }

  endCoord() {
    return util.transl(this.x + this.output.dim.margin.left
                       + this.output.dim.padding.left + FUDGE,
                       this.y);
  }
}
