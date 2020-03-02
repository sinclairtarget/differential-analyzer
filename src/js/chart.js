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

const X_INTERVAL = [0, 160];
const Y_INTERVAL = [0, 90];

export default class Chart {
  constructor(x, y, width, height, f) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.f = f;
    this.dim = new Dimensions(this.width, this.height, MARGIN, PADDING);

    this.xScale = d3.scaleLinear()
                    .domain(X_INTERVAL)
                    .range([0, this.dim.plotWidth()]);

    this.yScale = d3.scaleLinear()
                    .domain(Y_INTERVAL)
                    .range([this.dim.plotHeight(), 0]);

    this.area = new ChartArea(this.x, this.y, this.dim,
                              this.xScale, this.yScale);
  }

  setUp(parent) {
    this.area.setUp(parent);
    this.area.drawGrid();
    this.area.drawAxes();
    this.drawCurve(this.area.plot,
                   this.calcData(X_INTERVAL, Y_INTERVAL, this.f));
  }

  drawCurve(plot, data) {
    let curveFunc = d3.line()
                      .curve(d3.curveBasis)
                      .x((d) => this.xScale(d.x))
                      .y((d) => this.yScale(d.y));

    plot.append('path')
        .attr('d', curveFunc(data))
        .attr('class', 'curve');
  }

  calcData(xInterval, yInterval, f) {
    let [start, stop] = xInterval;
    let raw = util.range(start, stop).map((x) => { return {x: x, y: f(x)}; });
    return raw.filter(d => d.y >= yInterval[0] && d.y <= yInterval[1]);
  }
}
