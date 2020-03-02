import "../scss/main.scss";

import * as d3 from 'd3';
import Chart from './chart';

const CHART_WIDTH = 426;
const CHART_HEIGHT = 240;

const app = window.app = {
  root: null,
  input: new Chart(0, 0, CHART_WIDTH, CHART_HEIGHT, (x) => 0.0035 * x ** 2),
  output: new Chart(CHART_WIDTH, 0, CHART_WIDTH, CHART_HEIGHT, (x) => -0.0035 * x ** 2 + 90)
};

app.start = function() {
  console.log('App started!');
  this.setUp();
};

app.setUp = function() {
  this.root = d3.select('#svg-box');
  this.input.setUp(this.root);
  this.output.setUp(this.root);
};

window.onload = (ev) => {
  console.log('Document loaded!');
  app.start();
};
