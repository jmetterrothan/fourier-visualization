export const waveTypes = {
  square: n => 4 / (n * Math.PI),
  pulse: () => 0.1125,
  triangle: (n) => {
    if (!(n % 2)) return 0;
    return (n % 4 === 1 ? 1 : -1) / (n * n);
  },
  sawtooth: n => (n % 2 === 1 ? -1 : 1) / (n + 1),
};

export const colors = [
  [252, 92, 101],
  [253, 150, 68],
  [254, 211, 48],
  [38, 222, 129],
  [43, 203, 186],
  [69, 170, 242],
  [75, 123, 236],
  [165, 94, 234],
  [119, 140, 163],
];
