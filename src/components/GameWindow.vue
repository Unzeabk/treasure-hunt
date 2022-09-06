<template>
  <div class="treasure-window">
    <div :class="`overflow-content level-${level + 1}`">
      <div
        v-for="i in countLevels"
        class="row"
        :class="{ active: countLevels - level == i && isGame }"
        :key="i"
      >
        <div v-if="i == 1" class="final-bg"></div>
        <games-chest
          v-for="({ task, isCorrect }, j) in game[i - 1]"
          :task="task"
          :isCorrect="isCorrect"
          :isGolden="i == 1"
          :height="countLevels - i"
          :key="j"
        />
      </div>
    </div>
    <div class="treasure-shadow top"></div>
    <div class="treasure-shadow bottom"></div>
  </div>
</template>

<script>
import GamesChest from "./GamesChest.vue";
import { mapState } from "vuex";

export default {
  components: {
    GamesChest,
  },
  computed: mapState("game", ["level", "game", "isGame", "countLevels"]),
};
</script>

<style scoped>
.final-bg {
  display: block;
  background: url(~@/assets/images/final_bg_big.svg) no-repeat 50%;
  width: 100%;
  height: 150px;
  position: absolute;
  top: -210px;
  left: 0;
  z-index: -1;
}

@media screen and (max-width: 567px) {
  .final-bg {
    max-height: 90px;
  }
}

.treasure-window {
  position: relative;
  z-index: 4;
  overflow: hidden;
  width: 50%;
  height: 100%;
  background-position: 19px 241px;
  background-size: 600px;
  background-repeat: no-repeat;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  flex-grow: 0;
  flex-shrink: 0;
}

@media screen and (max-width: 567px) {
  .treasure-window {
    width: 90%;
    height: 85%;
    margin-top: 20px;
  }
}

.treasure-window .overflow-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease-in-out;
  will-change: transform;
  height: 330%;
  position: absolute;
  left: 0;
  bottom: 12%;
  transform: translate3d(0, 90%, 0);
}

@media screen and (max-width: 992px) {
  .treasure-window .overflow-content {
    height: 230%;
  }
}

@media screen and (max-width: 567px) {
  .treasure-window .overflow-content {
    height: 250%;
  }
}

.treasure-window .overflow-content.level-1 {
  transform: translateZ(0);
}

.treasure-window .overflow-content.level-2 {
  transform: translate3d(0, 10%, 0);
}

.treasure-window .overflow-content.level-3 {
  transform: translate3d(0, 20%, 0);
}

.treasure-window .overflow-content.level-4 {
  transform: translate3d(0, 30%, 0);
}

.treasure-window .overflow-content.level-5 {
  transform: translate3d(0, 40%, 0);
}

.treasure-window .overflow-content.level-6 {
  transform: translate3d(0, 50%, 0);
}

.treasure-window .overflow-content.level-7 {
  transform: translate3d(0, 60%, 0);
}

.treasure-window .overflow-content.level-8 {
  transform: translate3d(0, 70%, 0);
}

.treasure-window .overflow-content.level-9 {
  transform: translate3d(0, 80%, 0);
}

.treasure-window .overflow-content.level-10 {
  transform: translate3d(0, 90%, 0);
}

@media (max-width: 567px) {
  .treasure-window .overflow-content.level-1 {
    transform: translateZ(0);
  }

  .treasure-window .overflow-content.level-2 {
    transform: translate3d(0, 10%, 0);
  }

  .treasure-window .overflow-content.level-3 {
    transform: translate3d(0, 20%, 0);
  }

  .treasure-window .overflow-content.level-4 {
    transform: translate3d(0, 30%, 0);
  }

  .treasure-window .overflow-content.level-5 {
    transform: translate3d(0, 40%, 0);
  }

  .treasure-window .overflow-content.level-6 {
    transform: translate3d(0, 50%, 0);
  }

  .treasure-window .overflow-content.level-7 {
    transform: translate3d(0, 60%, 0);
  }

  .treasure-window .overflow-content.level-8 {
    transform: translate3d(0, 70%, 0);
  }

  .treasure-window .overflow-content.level-9 {
    transform: translate3d(0, 80%, 0);
  }

  .treasure-window .overflow-content.level-10 {
    transform: translate3d(0, 90%, 0);
  }
}

.treasure-window .treasure-shadow {
  top: auto;
  bottom: 0;
  width: 100%;
  height: 50px;
}

.treasure-window .treasure-shadow.bottom {
  position: absolute;
  bottom: 0;
  background-image: linear-gradient(180deg, rgba(28, 41, 65, 0), #1c2941);
}

.treasure-window .treasure-shadow.top {
  position: absolute;
  top: 0;
  background-image: linear-gradient(180deg, #172135, rgba(28, 41, 65, 0));
}

.treasure-window .row {
  display: flex;
  width: 100%;
  max-width: 100%;
  padding: 1%;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  background-color: #1c2941;
  height: 100%;
  position: relative;
  margin: 3% auto 0 auto;
  border: 1px solid hsla(0, 0%, 100%, 0.1);
  opacity: 0.3;
  cursor: default;
}

.treasure-window .row.active {
  opacity: 1;
  cursor: pointer;
  transition: opacity 0.2s ease-in;
}
</style>
