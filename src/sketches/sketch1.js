import * as P5 from 'p5';

const SK_WIDTH = 800;
const SK_HEIGHT = 300;

let t = 0;
const r = 64;
const wave = [];

const sketch = (ctx) => {
  ctx.setup = () => {
    ctx.createCanvas(SK_WIDTH, SK_HEIGHT);
  };

  ctx.draw = () => {
    ctx.background(0);

    // move to center
    const x1 = SK_WIDTH / 2;
    const y1 = SK_HEIGHT / 2;

    ctx.translate(x1, y1);
    ctx.stroke(255);
    ctx.noFill();
    ctx.ellipse(0, 0, r * 2);

    // polar coords to cartegian tf
    const x2 = r * Math.cos(t);
    const y2 = r * Math.sin(t);

    ctx.push();
    ctx.stroke(255);
    ctx.noFill();
    ctx.line(0, 0, x2, y2);
    ctx.translate(x2, y2);
    ctx.ellipse(0, 0, r);
    ctx.pop();

    wave.push(y2);

    for (let i = 0, n = wave.length; i < n; i += 1) {
      ctx.point(i, wave[i]);
    }

    t += 0.03;
  };
};

new P5(sketch, document.getElementById('sketch1'));
