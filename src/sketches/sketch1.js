const SK_WIDTH = window.innerWidth;
const SK_HEIGHT = 400;

let t = 0;

const wave = [];

// fourier series

const colors = [[255, 50, 0], [255, 255, 50], [50, 255, 50], [50, 255, 255], [50, 50, 255]];

const sketch1 = (ctx) => {
  ctx.setup = () => {
    ctx.createCanvas(SK_WIDTH, SK_HEIGHT);
  };

  ctx.draw = () => {
    ctx.background(0);

    let x = 0;
    let y = 0;
    let px = 0;
    let py = 0;

    // center coord of the initial circle
    ctx.translate(350, SK_HEIGHT / 2);

    for (let i = 0; i < 50; i += 1) {
      const n = i * 2 + 1;

      const rad = 100 * (4 / (n * Math.PI));

      // save previous position
      px = x;
      py = y;

      // polar coords to cartegian transformation
      x += rad * Math.cos(n * t);
      y += rad * Math.sin(n * t);

      const [r, v, b] = colors[i % colors.length];

      // circle
      ctx.stroke(r, v, b, 128);
      ctx.strokeWeight(1);
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

    t -= 0.01;
  };
};

export default sketch1;
