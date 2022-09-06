import { createStore } from "vuex";
import app from "./app";
import game from "./game";

const store = createStore({
  strict: process.env.NODE_ENV !== "production",
  modules: {
    app,
    game,
  },
});

export default store;
