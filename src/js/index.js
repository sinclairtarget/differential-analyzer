import "../scss/main.scss";

import * as d3 from 'd3';
import InputChart from './input-chart';

const INPUT_CHART_WIDTH = 426;
const INPUT_CHART_HEIGHT = 240;

const app = window.app = {
  root: null,
  input: new InputChart(0, 0, INPUT_CHART_WIDTH, INPUT_CHART_HEIGHT)
};

app.start = function() {
  console.log('App started!');
  this.setUp();
};

app.setUp = function() {
  this.root = d3.select('#svg-box');
  this.input.setUp(this.root);
};

window.onload = (ev) => {
  console.log('Document loaded!');
  app.start();
};
