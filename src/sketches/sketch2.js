// @ts-nocheck
import P5 from 'p5';

import 'p5/lib/addons/p5.sound';

import { colors } from '../utility';

const sketch2 = changeSound => (ctx) => {
  let fft;
  let fft2;
  let sound;
  let ready = false;
  let loading = false;

  // ui listeners

  const $loader = document.getElementById('loader');
  const $toggle = document.getElementById('toggle');

  const setLoading = (b) => {
    if (b) {
      $loader.classList.add('loading');
    } else {
      $loader.classList.remove('loading');
    }
    loading = b;
  };

  const playSound = (loop = false) => {
    $toggle.classList.add('show');
    $toggle.classList.add('playing');
    if (loop) {
      sound.loop();
    } else {
      sound.play();
    }
  };

  const pauseSound = () => {
    $toggle.classList.remove('playing');
    sound.pause();
  };

  const stopSound = () => {
    sound.stop();
    sound = undefined;
    $toggle.classList.remove('show');
  };

  $toggle.addEventListener('click', (e) => {
    e.preventDefault();
    if (sound) {
      if (sound.isPlaying()) {
        pauseSound();
      } else {
        playSound();
      }
    }
  });

  // p5 specific

  const options = {
    width: () => window.innerWidth,
    height: () => 750,
  };

  ctx.preload = () => {
    changeSound.subscribe({
      next: ({ type, payload }) => {
        switch (type) {
          case 'RECORD_START':
            setLoading(true);
            break;

          case 'RECORD_END':
            setLoading(true);

            if (sound) {
              // stop previous sound if any exists
              stopSound();
            }

            ready = false;
            fft = new P5.FFT(0.95, 64);
            fft2 = new P5.FFT(0.5, 1024);

            // load and play sound when ready
            sound = ctx.loadSound(payload.url, () => {
              setLoading(false);
              ready = true;
              sound.amp(0.75);
              playSound(true);
            });
            break;

          default:
            setLoading(false);
        }
      },
    });
  };

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

    if (!ready) {
      return;
    }

    const [r, v, b] = colors[5];

    // spectrum
    const spectrum = fft.analyze();

    ctx.noStroke();
    ctx.fill(r, v, b, 64);

    for (let i = 0; i < spectrum.length; i += 1) {
      const x = ctx.map(i, 0, spectrum.length, 0, ctx.width); // map value within bounds
      const h = -ctx.height / 2 + ctx.map(spectrum[i], 0, 255, ctx.height / 2, 0);

      ctx.rect(x + 2, ctx.height, ctx.width / spectrum.length - 4, h);
    }

    // wave
    const waveform = fft2.waveform();

    ctx.noFill();
    ctx.beginShape();
    ctx.stroke(r, v, b);
    ctx.strokeWeight(2);

    for (let i = 0; i < waveform.length; i += 1) {
      const x = ctx.map(i, 0, waveform.length, 0, ctx.width);
      const y = ctx.map(waveform[i], -1, 1, 0, ctx.height / 2);
      ctx.vertex(x, y + ctx.height / 2);
    }

    ctx.endShape();
  };
};

export default sketch2;
