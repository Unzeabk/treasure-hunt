import { createStore } from "vuex";
import state from "./game.state";
import mutations from "./game.mutations";

const store = createStore({
  namespaced: true,
  state,
  mutations,
});

export default store;
