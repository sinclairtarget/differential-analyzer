import * as d3 from 'd3';
import * as util from './util';
import Dimensions from './dimensions';
import ChartArea from './chart-area';

const MARGIN = {
  top: 20,
  right: 40,
  bottom: 0,
  left: 0
};

const PADDING = {
  top: 20,
  right: 0,
  bottom: 40,
  left: 20
};

export default class Chart {
  constructor(x, y, width, height, xInterval, yInterval, title) {
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

    this.title = title;

    this.area = new ChartArea(this.x, this.y, this.dim,
                              this.xScale, this.yScale);
    this.path = null;
  }

  setUp(parent) {
    this.area.setUp(parent);
    this.area.drawGrid();
    this.area.drawAxes();
    this.area.drawTitle(this.title);
  }

  // Expects data to be a list of objects with x, y properties
  drawCurve(data, animDuration = 0) {
    let curveFunc = d3.line()
                      .curve(d3.curveBasis)
                      .x((d) => this.xScale(d.x))
                      .y((d) => this.yScale(d.y));

    let dataToPlot = this.clipData(data, this.xInterval, this.yInterval);

    if (this.path == null) {
      this.path = this.area.plot.append('path')
                                .attr('d', curveFunc(dataToPlot))
                                .attr('class', 'curve');
    }

    if (animDuration > 0) {
      let len = this.path.node().getTotalLength();
      this.path.attr('stroke-dasharray', len + ' ' + len)
               .attr('stroke-dashoffset', len - 7)
               .interrupt()
               .transition()
               .duration(animDuration)
               .ease(d3.easeLinear)
               .attr('stroke-dashoffset', 0);
    }
  }

  clipData(data, xInterval, yInterval) {
    return data.filter(d => {
      return d.y >= yInterval[0] && d.y <= yInterval[1]
        && d.x >= xInterval[0] && d.x <= xInterval[1]
    });
  }
}
