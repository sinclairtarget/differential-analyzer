import * as d3 from 'd3';
import * as util from './util';

/*
 * The background for a chart/graph. Draws axes and grid lines.
 */
export default class ChartArea {
  constructor(x, y, dimensions, xScale, yScale) {
    this.x = x;
    this.y = y;
    this.dim = dimensions;
    this.xScale = xScale;
    this.yScale = yScale;

    this.group = null;
    this.panel = null;
    this.plot = null;
  }

  setUp(parent) {
    this.group = parent.append('g')
                       .attr('transform', util.transl(this.x, this.y))
                       .attr('class', 'chart-area');

    this.panel = this.group
                     .append('g')
                     .attr('transform', util.transl(this.dim.margin.left,
                                                    this.dim.margin.top))
                     .attr('class', 'panel');

    this.plot = this.panel
                    .append('g')
                    .attr('transform', util.transl(this.dim.padding.left,
                                                   this.dim.padding.top))
                    .attr('class', 'plot');
  }

  drawAxes() {
    let xAxis = d3.axisBottom(this.xScale);
    let yAxis = d3.axisLeft(this.yScale);

    let plotHeight = this.dim.plotHeight();

    this.panel
        .append('g')
        .attr('transform', util.transl(this.dim.padding.left,
                                       this.dim.padding.top + plotHeight))
        .attr('class', 'axis')
        .call(xAxis);

    this.panel
        .append('g')
        .attr('transform', util.transl(this.dim.padding.left,
                                       this.dim.padding.top))
        .attr('class', 'axis')
        .call(yAxis);
  }

  drawGrid() {
    let xGrid = d3.axisBottom(this.xScale)
                  .tickSize(-this.dim.plotHeight(), 0, 0)
                  .tickFormat('');

    let yGrid = d3.axisLeft(this.yScale)
                  .tickSize(-this.dim.plotWidth(), 0, 0)
                  .tickFormat('');

    this.plot.append('g')
             .attr('transform', util.transl(0, this.dim.plotHeight()))
             .attr('class', 'grid')
             .call(xGrid);

    this.plot.append('g')
             .attr('class', 'grid')
             .call(yGrid);
  }

  drawTitle(titleText) {
    this.title = this.panel.append('text')
                           .attr('x', this.dim.plotWidth() / 2 +
                                      this.dim.margin.left + this.dim.padding.left)
                           .attr('y', this.dim.panelHeight() + 14)
                           .attr('text-anchor', 'middle')
                           .attr('class', 'chart-title')
                           .text(titleText);
  }
}
