import "../scss/main.scss";

import * as d3 from 'd3';
import Chart from './chart';
import * as machine from './machine';

const CHART_WIDTH = 426;
const CHART_HEIGHT = 240;

const ANIMATION_PERIOD_MS = 15000;

const app = window.app = {
  root: null,
  input: new Chart(0, 0, CHART_WIDTH, CHART_HEIGHT, [0, 100], [0, 10]),
  output: new Chart(CHART_WIDTH, 0, CHART_WIDTH, CHART_HEIGHT, [0, 100], [0, 600]),
  F_data: null
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

  this.F_data = machine.stream_of_x(160).map(x => {
    return { x: x, y: F(x) }
  });
  this.input.drawCurve(this.F_data);

  app.reset();
};

app.reset = function() {
  console.log('Reset!');
  let f_data = machine.integrate(this.F_data);
  this.output.drawCurve(f_data, ANIMATION_PERIOD_MS);

  window.setTimeout(() => { app.reset(); }, ANIMATION_PERIOD_MS);
};

window.onload = (ev) => {
  console.log('Document loaded!');
  app.start();
};
