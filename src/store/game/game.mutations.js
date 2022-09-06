import { cards } from "@/cards";

const INITIAL_TIMER = 5000;
const TIMER_DELTA = 350;

const generateGame = () => {
  const shuffled = cards.sort(() => 0.5 - Math.random());

  let selected = shuffled.slice(0, 10);

  selected.forEach((e) => e.sort(() => 0.5 - Math.random()));

  return selected;
};

export default {
  newGame: (state) => {
    state.isGame = true;
    state.game = generateGame();
    state.levelTimer = INITIAL_TIMER;
  },

  checkUpLevel: (state) => {
    ++state.openedLevels;
  },

  resetGame: (state) => {
    state.level = 0;
    state.levelTimer = 0;
    state.isGame = false;
    state.openedLevels = 0;
    state.game = Array.from({ length: 10 }, () =>
      Array.from({ length: 3 }, () => 0)
    );
  },

  levelUp: (state) => {
    ++state.level;
    state.levelTimer -= TIMER_DELTA;
  },
};
