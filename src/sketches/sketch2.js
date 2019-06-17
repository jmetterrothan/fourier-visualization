// @ts-nocheck
import P5 from 'p5';

import record from '../record';

const sketch2 = (ctx) => {
  const options = {
    width: () => window.innerWidth,
    height: () => 500,
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
  };
};

new P5(sketch2, document.getElementById('sketch2'));

const Recorder = ($b, $h) => {
  const $btn = $b;
  const $hint = $h;

  let manager;

  $btn.classList.add('idle');
  $hint.innerHTML = "Appuyer pour commencer l'enregistrement";

  return {
    isRecording: () => manager && manager.recorder.state === 'recording',
    start: async () => {
      if (manager) {
        return;
      }

      $btn.classList.remove('idle');
      $btn.classList.add('busy');
      $hint.innerHTML = "Appuyer pour terminer l'enregistrement";

      manager = await record();
      manager.start();
    },
    stop: async () => {
      if (!manager) {
        return null;
      }

      $btn.classList.add('idle');
      $btn.classList.remove('busy');
      $hint.innerHTML = "Appuyer pour commencer l'enregistrement";

      const sound = await manager.stop();
      manager = null;

      return sound;
    },
  };
};

const $record = document.getElementById('record');
const $hint = document.getElementById('record-hint');

const rec = Recorder($record, $hint);

// mobile

const start = async () => {
  if (!rec.isRecording()) {
    rec.start();
  }
};

const end = async () => {
  if (rec.isRecording()) {
    const sound = await rec.stop();
    if (sound) {
      sound.play();
    }
  }
};

$record.addEventListener('touchstart', start);
$record.addEventListener('touchend', end);

// pc

const toggle = async () => {
  if (!rec.isRecording()) {
    rec.start();
  } else {
    const sound = await rec.stop();
    if (sound) {
      sound.play();
    }
  }
};

$record.addEventListener('click', toggle);
