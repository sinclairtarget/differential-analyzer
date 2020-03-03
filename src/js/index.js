import "../scss/main.scss";

import * as d3 from 'd3';
import Chart from './chart';
import * as machine from './machine';

const CHART_WIDTH = 426;
const CHART_HEIGHT = 240;

const app = window.app = {
  root: null,
  input: new Chart(0, 0, CHART_WIDTH, CHART_HEIGHT, [0, 100], [0, 10]),
  output: new Chart(CHART_WIDTH, 0, CHART_WIDTH, CHART_HEIGHT, [0, 100], [0, 600])
};

function F(x) {
  return 5 * Math.sin((Math.PI/25) * x) + 5;
}

app.start = function() {
  console.log('App started!');
  this.setUp();
};

app.setUp = function() {
  this.root = d3.select('#svg-box');
  this.input.setUp(this.root);
  this.output.setUp(this.root);

  let F_data = machine.stream_of_x(160).map(x => {
    return { x: x, y: F(x) }
  });
  this.input.drawCurve(F_data);

  let f_data = machine.integrate(F_data);
  this.output.drawCurve(f_data);
};

window.onload = (ev) => {
  console.log('Document loaded!');
  app.start();
};
