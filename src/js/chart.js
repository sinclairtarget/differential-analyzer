import * as d3 from 'd3';
import * as util from './util';
import Dimensions from './dimensions';
import ChartArea from './chart-area';

const MARGIN = {
  top: 12,
  right: 12,
  bottom: 12,
  left: 12
};

const PADDING = {
  top: 20,
  right: 0,
  bottom: 20,
  left: 20
};

export default class Chart {
  constructor(x, y, width, height, xInterval, yInterval) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.dim = new Dimensions(this.width, this.height, MARGIN, PADDING);

    this.xInterval = xInterval;
    this.yInterval = yInterval;

    this.xScale = d3.scaleLinear()
                    .domain(this.xInterval)
                    .range([0, this.dim.plotWidth()]);

    this.yScale = d3.scaleLinear()
                    .domain(this.yInterval)
                    .range([this.dim.plotHeight(), 0]);

    this.area = new ChartArea(this.x, this.y, this.dim,
                              this.xScale, this.yScale);
  }

  setUp(parent) {
    this.area.setUp(parent);
    this.area.drawGrid();
    this.area.drawAxes();
  }

  // Expects data to be a list of objects with x, y properties
  drawCurve(data) {
    let curveFunc = d3.line()
                      .curve(d3.curveBasis)
                      .x((d) => this.xScale(d.x))
                      .y((d) => this.yScale(d.y));

    let dataToPlot = this.cullData(data, this.xInterval, this.yInterval);
    this.area.plot.append('path')
                  .attr('d', curveFunc(dataToPlot))
                  .attr('class', 'curve');
  }

  cullData(data, xInterval, yInterval) {
    return data.filter(d => {
      return d.y >= yInterval[0] && d.y <= yInterval[1]
        && d.x >= xInterval[0] && d.x <= xInterval[1]
    });
  }
}
