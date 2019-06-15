// @ts-nocheck

import { waveTypes, colors } from '../utility';

let t = 0;

const wave = [];

// fourier series

const sketch1 = options => (ctx) => {
  ctx.setup = () => {
    ctx.createCanvas(options.width(), options.height());
  };

  ctx.windowResized = () => {
    const w = options.width();
    const h = options.height();

    ctx.resizeCanvas(w, h);
  };

  ctx.draw = () => {
    ctx.background(0);

    let x = 0;
    let y = 0;
    let px = 0;
    let py = 0;

    const maxRadius = Math.max(100 * waveTypes[options.waveType](1), 100);

    const previewOffsetX = maxRadius * 2.5;
    const waveOffsetX = maxRadius * 2.5;

    // number of points displayed
    const maxWaveSamples = ctx.width - previewOffsetX - waveOffsetX;

    // place cursor in the center of the initial circle
    ctx.translate(previewOffsetX, ctx.height / 2);

    for (let i = 0; i < options.iterations; i += 1) {
      const n = i * 2 + 1;

      const rad = 100 * waveTypes[options.waveType](n);

      // save previous position
      px = x;
      py = y;

      // polar coords to cartegian transformation
      x += rad * Math.cos(n * t);
      y += rad * Math.sin(n * t);

      const [r, v, b] = colors[i % colors.length];

      // circle
      ctx.stroke(r, v, b, 128);
      ctx.strokeWeight(2);
      ctx.noFill();
      ctx.ellipse(px, py, rad * 2);

      // line
      ctx.stroke(r, v, b);
      ctx.strokeWeight(1);
      ctx.line(px, py, x, y);

      // point
      ctx.strokeWeight(4);
      ctx.point(x, y);
    }

    wave.unshift(y);

    if (wave.length > maxWaveSamples) {
      wave.pop();
    }

    // connected last circle center to the wave line
    ctx.stroke(255);
    ctx.strokeWeight(1);
    ctx.line(x, y, waveOffsetX, wave[0]);

    // draw wave

    ctx.beginShape();
    ctx.strokeWeight(1);
    ctx.stroke(255);
    ctx.noFill();
    for (let i = 0, m = wave.length; i < m; i += 1) {
      ctx.vertex(i + waveOffsetX, wave[i]);
    }
    ctx.endShape();

    t -= options.step;
  };
};

export default sketch1;
