import * as d3 from 'd3';
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

export default class InputChart {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.dim = new Dimensions(this.width, this.height, MARGIN, PADDING);
    this.area = new ChartArea(this.x, this.y, this.dim,
                              X_INTERVAL, Y_INTERVAL);
  }

  setUp(parent) {
    this.area.setUp(parent);
  }
}
