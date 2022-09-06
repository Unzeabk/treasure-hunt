export default {
  level: 0,
  levelTimer: 0,
  isGame: false,
  openedLevels: 0,
  game: Array.from({ length: 10 }, () => Array.from({ length: 3 }, () => 0)),
  countLevels: 10,
};
