import * as P5 from 'p5';

const sketch = (ctx) => {
  ctx.setup = () => {
    ctx.createCanvas(800, 400);
  };

  ctx.draw = () => {
    ctx.background(0);
  };
};

new P5(sketch, document.getElementById('sketch1'));
