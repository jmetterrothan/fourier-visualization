// @ts-nocheck

import * as P5 from 'p5';
import 'babel-polyfill';

import { waveTypes } from './utility';
import sketch1 from './sketches/sketch1';

const $sketch1 = document.getElementById('sketch1');
const $step = document.querySelector('input[name="step"]');
const $iterations = document.querySelector('input[name="iterations"]');
const $waveType = document.querySelector('select[name="waveType"]');

// Create wave type select element
Object.keys(waveTypes).forEach((waveType) => {
  const $option = document.createElement('option');
  $option.value = waveType;
  $option.text = waveType;
  $waveType.appendChild($option);
});

const options = {
  step: Number($step.value),
  iterations: Number($iterations.value),
  width: () => window.innerWidth,
  height: () => 400,
  waveType: $waveType.value,
};

// Listen for changes
$step.addEventListener('change', (e) => {
  e.preventDefault();
  options.step = Number(e.target.value);
});

$iterations.addEventListener('change', (e) => {
  e.preventDefault();
  options.iterations = Number(e.target.value);
});

$waveType.addEventListener('change', (e) => {
  e.preventDefault();
  options.waveType = e.target.value;
});

// First sketch init and run
new P5(sketch1(options), $sketch1);
