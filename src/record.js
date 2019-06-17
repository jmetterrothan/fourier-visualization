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

        resolve(new Audio(url));
      });

      recorder.stop();
    });

    return { start, stop, recorder };
  } catch (e) {
    return null;
  }
};

export default record;
