// @ts-nocheck
import { waveTypes, colors } from '../utility';

// fourier series

const sketch1 = (ctx) => {
  let t = 0;
  const wave = [];
  let wave2 = [];

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
    height: () => 500,
    waveType: $waveType.value,
  };

  const change = () => {
    wave2 = [];
  };

  // Listen for changes
  $step.addEventListener('change', (e) => {
    e.preventDefault();
    options.step = Number(e.target.value);

    change();
  });

  $iterations.addEventListener('change', (e) => {
    e.preventDefault();
    options.iterations = Number(e.target.value);

    change();
  });

  $waveType.addEventListener('change', (e) => {
    e.preventDefault();
    options.waveType = e.target.value;

    change();
  });

  // First sketch init and run

  ctx.setup = () => {
    ctx.createCanvas(options.width(), options.height());
  };

  ctx.windowResized = () => {
    const w = options.width();
    const h = options.height();

    ctx.resizeCanvas(w, h);
  };

  ctx.draw = () => {
    ctx.background(10, 10, 20);

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

      if (i === 0) {
        ctx.stroke(r, v, b);
        ctx.strokeWeight(4);
        ctx.point(0, 0);
      }

      // circle
      ctx.stroke(r, v, b, 192);
      ctx.strokeWeight(2);
      ctx.noFill();
      ctx.ellipse(px, py, rad * 2);

      // line
      ctx.stroke(r, v, b, 128);
      ctx.strokeWeight(2);
      ctx.line(px, py, x, y);

      // point
      ctx.strokeWeight(4);
      ctx.point(x, y);
    }

    wave2.unshift({ x, y });
    wave.unshift(y);

    if (wave.length > maxWaveSamples) {
      wave.pop();
    }

    if (wave2.length > 1024) {
      wave2.pop();
    }

    // connected last circle center to the wave line
    ctx.stroke(255);
    ctx.strokeWeight(2);
    ctx.line(x, y, waveOffsetX, wave[0]);

    // draw wave

    ctx.beginShape();
    ctx.strokeWeight(2);
    ctx.stroke(255);
    ctx.noFill();
    for (let i = 0, m = wave.length; i < m; i += 1) {
      ctx.vertex(i + waveOffsetX, wave[i]);
    }
    ctx.endShape();

    ctx.beginShape();
    ctx.strokeWeight(2);
    ctx.stroke(255, 255, 255, 32);
    ctx.noFill();
    for (let i = 0, m = wave2.length; i < m; i += 1) {
      ctx.vertex(wave2[i].x, wave2[i].y);
    }
    ctx.endShape();

    t -= options.step;
  };
};

export default sketch1;
