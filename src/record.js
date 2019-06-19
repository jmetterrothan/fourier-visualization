// @ts-nocheck

const record = async () => {
  const chunks = [];
  let recorder;
  let stream = null;

  try {
    stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
    recorder = new MediaRecorder(stream);

    recorder.addEventListener('dataavailable', (e) => {
      chunks.push(e.data);
    });

    const start = () => {
      recorder.start();
    };

    const stop = () => new Promise((resolve) => {
      recorder.addEventListener('stop', () => {
        const blob = new Blob(chunks);
        const url = URL.createObjectURL(blob);

        resolve(url);
      });

      recorder.stop();
    });

    return { start, stop, recorder };
  } catch (e) {
    return null;
  }
};

export const Recorder = ($b, $h) => {
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

export default record;
