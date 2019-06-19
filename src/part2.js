// @ts-nocheck
import P5 from 'p5';
import { Subject } from 'rxjs';

import { Recorder } from './record';
import sketch2 from './sketches/sketch2';

import fallbackSoundPath from './assets/sound/test.mp4';

const changeSound = new Subject();

const $fallbackSound = document.getElementById('fallbackSound');
const $record = document.getElementById('record');
const $hint = document.getElementById('record-hint');

const rec = Recorder($record, $hint);

const toggle = async () => {
  if (!rec.isRecording()) {
    rec.start();
    changeSound.next({ type: 'RECORD_START', payload: {} });
  } else {
    const soundUrl = await rec.stop();
    if (soundUrl) {
      changeSound.next({ type: 'RECORD_END', payload: { url: soundUrl } });
    } else {
      changeSound.next({ type: 'RECORD_FAILED', payload: {} });
    }
  }
};

$fallbackSound.addEventListener('click', () => {
  changeSound.next({ type: 'RECORD_END', payload: { url: fallbackSoundPath } });
});

$record.addEventListener('click', toggle);

new P5(sketch2(changeSound), document.getElementById('sketch2'));
