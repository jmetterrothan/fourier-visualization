// @ts-nocheck

let t = 0;

const wave = [];

// fourier series

export const waveTypes = {
  pulse: () => 0.1,
  square: n => 4 / (n * Math.PI),
  sawtooth: () => 0, // TODO: fix
  triangle: (n) => {
    if (!(n % 2)) return 0;
    return (n % 4 === 1 ? 1 : -1) / (n * n);
  },
};

const colors = [
  [252, 92, 101],
  [253, 150, 68],
  [254, 211, 48],
  [38, 222, 129],
  [43, 203, 186],
  [69, 170, 242],
  [75, 123, 236],
  [165, 94, 234],
  [209, 216, 224],
  [119, 140, 163],
];

const sketch1 = options => (ctx) => {
  ctx.setup = () => {
    ctx.createCanvas(options.width, options.height);
  };

  ctx.draw = () => {
    ctx.background(0);

    let x = 0;
    let y = 0;
    let px = 0;
    let py = 0;

    // center coord of the initial circle
    ctx.translate(350, options.height / 2);

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

    if (wave.length > 2048) {
      wave.pop();
    }

    // draw wave

    ctx.beginShape();
    ctx.strokeWeight(1);
    ctx.stroke(255);
    ctx.noFill();
    for (let i = 0, m = wave.length; i < m; i += 1) {
      ctx.vertex(i, wave[i]);
    }
    ctx.endShape();

    t -= options.step;
  };
};

export default sketch1;
