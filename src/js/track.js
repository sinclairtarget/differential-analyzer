import * as d3 from 'd3';
import Chart from './chart';
import Eye from './eye';
import * as util from './util';

const CHART_WIDTH = 400;
const CHART_HEIGHT = 260;
const FUDGE = 10;

// Represents the track or conveyor the input and output charts are mounted
// on.
export default class Track {
  constructor(x, y, inputYInterval, outputYInterval) {
    this.x = x;
    this.y = y;
    this.input = new Chart(0, 0, CHART_WIDTH, CHART_HEIGHT,
                           [0, 100], inputYInterval, 'f(x)');
    this.output = new Chart(CHART_WIDTH, 0, CHART_WIDTH, CHART_HEIGHT,
                            [0, 100], outputYInterval, 'F(x)');

    this.baseGroup = null;
    this.chartGroup = null;

    this.inputEye = new Eye(CHART_WIDTH - this.output.dim.margin.left -
                            this.output.dim.padding.left,
                            -8, inputYInterval, this.input.dim.plotHeight());
    this.outputEye = new Eye(2 * CHART_WIDTH - this.output.dim.padding.left,
                             -8, outputYInterval, this.output.dim.plotHeight());
  }

  setUp(parent) {
    this.baseGroup = parent.insert('g', ':first-child')
                           .attr('transform', util.transl(this.x, this.y));

    let [x, y] = this.startCoord();
    this.chartGroup = this.baseGroup.append('g')
                                    .attr('transform', util.transl(x, y))
                                    .attr('class', 'track');

    this.input.setUp(this.chartGroup);
    this.output.setUp(this.chartGroup);

    this.inputEye.setUp(this.baseGroup, parent, 'g.input-eye');
    this.outputEye.setUp(this.baseGroup, parent, 'g.output-eye');
  }

  update(inputData, outputData, duration) {
    let [startX, startY] = this.startCoord();
    let [endX, endY] = this.endCoord();
    this.chartGroup.attr('transform', util.transl(startX, startY))
                   .interrupt()
                   .transition()
                   .duration(duration)
                   .ease(d3.easeLinear)
                   .attr('transform', util.transl(endX, endY));

    this.input.drawCurve(inputData);
    this.output.drawCurve(outputData, duration);
    this.inputEye.update(inputData, duration);
    this.outputEye.update(outputData, duration);
  }

  startCoord() {
    return [CHART_WIDTH - this.output.dim.margin.left
            - this.output.dim.padding.left - FUDGE,
           0];
  }

  endCoord() {
    return [this.output.dim.margin.left
            + this.output.dim.padding.left + FUDGE,
           0];
  }
}
