import "../scss/main.scss";

import * as d3 from 'd3';
import SVGInject from '@iconfu/svg-inject';
import * as machine from './machine';
import Track from './track';
import Turntable from './turntable';
import Wheel from './wheel';

const ANIMATION_PERIOD_MS = 15000;
const LOOP_DELAY_MS = 1000;

const INPUT_Y_INTERVAL = [0, 10];
const OUTPUT_Y_INTERVAL = [0, 600];

const app = window.app = {
  root: null,
  track: new Track(0, 280, INPUT_Y_INTERVAL, OUTPUT_Y_INTERVAL),
  turntable: new Turntable(0, -138, INPUT_Y_INTERVAL),
  wheel: new Wheel(),
  f_data: null,
  F_data: null
};

function f(x) {
  return 5 * Math.sin((Math.PI/25) * x) + 5;
}

app.start = function() {
  // Inject the SVG directly into the document so we can style it
  SVGInject(document.querySelector('img.injectable'), {
    makeIdsUnique: false,
    afterInject: () => {
      this.setUp();
    },
    onFail: () => {
      console.error('Failed to inject SVG.');
    }
  });
};

app.setUp = function() {
  this.root = d3.select('#diagram');

  this.f_data = machine.stream_of_x(100).map(x => {
    return { x: x, y: f(x) }
  });

  this.F_data = machine.integrate(this.f_data);

  this.track.setUp(this.root, this.f_data, this.F_data);
  this.turntable.setUp(this.root, this.f_data);
  this.wheel.setUp(this.root);
  app.update(this.f_data, this.F_data);
};

app.update = function(inputData, outputData) {
  this.track.update(inputData, outputData, ANIMATION_PERIOD_MS);
  this.turntable.update(ANIMATION_PERIOD_MS);
  this.wheel.update(outputData, ANIMATION_PERIOD_MS);

  window.setTimeout(() => {
    app.update(inputData, outputData);
  }, ANIMATION_PERIOD_MS + LOOP_DELAY_MS);
};

window.onload = (ev) => {
  app.start();
};
