<template>
  <div class="games-root">
    <div class="game-canvas-wrapper">
      <div class="game-canvas inner">
        <div class="game-frame">
          <div class="app-treasure">
            <Transition name="slide-up">
              <popup-win v-if="level == countLevels" />
            </Transition>
            <div class="treasure-canvas">
              <div class="treasure-wrapper">
                <div class="treasure-map">
                  <div class="map-wrapper">
                    <div v-for="i in countLevels" :key="i">
                      <div v-if="i == level + 1 && isGame" :class="`treasure-map-item tr-${i} active`">
                        <div class="image active"></div>
                      </div>
                      <div v-else-if="i < level + 1" :class="`treasure-map-item tr-${i} passed`">
                        <div class="image passed"></div>
                      </div>
                      <div v-else-if="i == countLevels" :class="`treasure-map-item tr-${i}`">
                        <div class="image last"></div>
                      </div>
                      <div v-else :class="`treasure-map-item tr-${i}`">
                        <div class="image"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <game-window />
                <div class="treasure-facts">
                  <div class="facts-wrapper">
                    <div class="fact-item">
                      <div class="fact-thumb-label">До сокровищ осталось</div>
                      <div class="fact-label chest-counter">
                        {{ countLevels - level }} {{ chestModify() }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="action-selector">
                <div class="button-wrap">
                  <button @click="newGame()" class="play-button" :disabled="isGame">
                    {{ buttonText() }}
                  </button>
                </div>
              </div>
            </div>
            <timer />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GameWindow from "./GameWindow.vue";
import PopupWin from "./PopupWin.vue";
import Timer from "./Timer.vue";
import { mapMutations, mapState } from "vuex";

export default {
  components: {
    GameWindow,
    PopupWin,
    Timer,
  },
  computed: mapState("game", ["level", "isGame", "countLevels"]),
  methods: {
    ...mapMutations("game", ["newGame"]),
    chestModify() {
      if (5 > this.countLevels - this.level && this.countLevels - this.level > 1) {
        return "Сундука";
      }

      if (this.countLevels - this.level == 1) {
        return "Сундук";
      }

      return "Сундуков";
    },
    buttonText() {
      if (this.isGame) {
        return "выберите третий лишний";
      }

      return "Начать игру";
    },
  },
};
</script>

<style scoped>
.games-root {
  width: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  flex: none;
}

.games-root {
  display: flex;
}

.game-canvas-wrapper {
  display: flex;
  width: 100%;
  height: auto;
  min-height: calc(100vh - 125px);
  margin-bottom: 25px;
  position: relative;
  margin-left: auto;
  margin-right: auto;
  touch-action: manipulation !important;
  pointer-events: none;
}

@media screen and (max-width: 992px) {
  .game-canvas-wrapper {
    min-height: calc(100vh - 80px);
    width: 100%;
  }
}

@media screen and (max-width: 567px) {
  .game-canvas-wrapper {
    min-height: calc(85vh - 80px);
    width: 100%;
  }
}

.game-canvas-wrapper .inner {
  position: relative;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.game-canvas {
  display: flex;
  width: 100%;
  position: relative;
  border-width: 1px;
  border-color: hsla(0, 0%, 100%, 0.1);
  border-radius: 6px;
  background-color: #1c2941;
  overflow: hidden;
  margin-top: 20px;
  flex-direction: column;
  justify-content: space-between;
}

@media (max-width: 567px) {
  .game-canvas {
    margin-top: 0;
  }
}

.game-frame {
  flex: 1;
}

.canvas-controls,
.game-frame {
  width: 100%;
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}

.action-selector {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  position: relative;
  z-index: 50;
  margin-top: -60px;
  height: 30%;
}

@media screen and (max-width: 991px) {
  .action-selector {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    height: 35%;
    margin-top: -50px;
  }
}

@media screen and (max-width: 567px) {
  .action-selector {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    height: 17%;
    justify-content: flex-start;
  }
}

.button-wrap {
  display: flex;
  align-items: center;
  height: 90%;
}

@media screen and (max-width: 992px) {
  .button-wrap {
    width: auto;
    height: 60%;
    justify-content: center;
  }
}

@media screen and (max-width: 567px) {
  .button-wrap {
    width: 100%;
    height: auto;
  }
}

.play-button {
  display: flex;
  width: calc(26vw + 20vh);
  height: calc(3vw + 3vh);
  margin-right: 2%;
  margin-left: 2%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  background-color: #59b2e1;
  box-shadow: 4px 4px 15px 0 rgba(89, 178, 225, 0.3);
  text-transform: uppercase;
  transition: background-image 0.2s ease-in-out;
  border: none;
  color: #fff;
  cursor: pointer;
  transition: all 0.25s;
  letter-spacing: normal;
  font-size: calc(0.45vw + 1.2vh);
  font-weight: 600;
  font-family: Titillium Web;
  touch-action: manipulation !important;
  pointer-events: auto;
}

@media (max-width: 992px) {
  .play-button {
    width: calc(17vw + 28vh);
    height: calc(5vw + 3vh);
    font-size: calc(1vw + 0.6vh);
  }
}

@media (max-width: 567px) {
  .play-button {
    width: calc(20vw + 30vh);
    height: calc(6vw + 4vh);
    font-size: calc(0.7vw + 1.2vh);
  }
}

.play-button:disabled {
  background: hsla(0, 0%, 100%, 0.5);
  box-shadow: 4px 4px 15px 0 rgba(0, 0, 0, 0.15);
  cursor: not-allowed;
}

.play-button:hover {
  background-image: linear-gradient(
    180deg,
    hsla(0, 0%, 100%, 0.1),
    hsla(0, 0%, 100%, 0.1)
  );
  transform: translateY(-2px);
}

.app-treasure {
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  flex-basis: 80%;
  transform: translateZ(0);
}
.treasure-canvas,
.app-treasure {
  position: relative;
  display: flex;
  max-width: 100%;
  height: 100%;
}

.treasure-canvas {
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  z-index: 0;
  font-size: 14px;
  background: url(~@/assets/images/bg.png) no-repeat 50%;
  background-size: cover;
}

@media (max-width: 992px) {
  .treasure-canvas {
    background-image: url(~@/assets/images/bg_tablet.png);
    background-size: cover;
  }
}

@media (max-width: 567px) {
  .treasure-canvas {
    background: none;
  }
}

.treasure-wrapper {
  display: flex;
  align-items: center;
}

.treasure-wrapper {
  width: 100%;
  max-width: 100%;
  height: 40em;
  flex: 1;
  border-radius: 10px;
  position: relative;
}

@media (max-width: 567px) {
  .treasure-wrapper {
    align-items: flex-start;
  }
}

.treasure-map {
  display: flex;
  width: 100%;
  height: 100%;
}

@media screen and (max-width: 992px) {
  .treasure-map {
    display: none;
  }
}

@media screen and (max-height: 680px) {
  .treasure-map {
    opacity: 0;
  }
}

.treasure-map .map-wrapper {
  display: flex;
  margin: auto;
  width: 100%;
  max-width: 17.857em;
  height: 375px;
  position: relative;
  background-image: url(~@/assets/images/map.svg);
  background-position: 50% 50%;
  background-size: contain;
  background-repeat: no-repeat;
  margin-top: 10%;
}

@media (max-width: 1200px) {
  .treasure-map .map-wrapper {
    display: none;
  }
}

.treasure-map .map-wrapper .treasure-map-item {
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: center;
  width: 37px;
  height: 37px;
  border-style: dashed;
  border-width: 1px;
  border-color: hsla(0, 0%, 100%, 0.3);
  border-radius: 30px;
  background-color: #1c2941;
}

.treasure-map .map-wrapper .treasure-map-item.active {
  border-color: #59b2e1;
  transition: color 0.3s ease-in;
  background-color: #407197;
}

.treasure-map .map-wrapper .treasure-map-item.passed {
  border-color: #fff;
}

.treasure-map .map-wrapper .treasure-map-item .image {
  width: 100%;
  height: 100%;
  background-image: url(~@/assets/images/map_icon_white.svg);
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: 50%;
  opacity: 0.5;
}

.treasure-map .map-wrapper .treasure-map-item .image.active {
  background-image: url(~@/assets/images/map_icon_blue.svg);
  opacity: 1;
  transition: opacity 0.1s ease-in;
}

.treasure-map .map-wrapper .treasure-map-item .image.passed {
  background-image: url(~@/assets/images/map_icon_white_open.svg);
  opacity: 1;
  transition: opacity 0.1s ease-in;
}

.treasure-map .map-wrapper .treasure-map-item .image.last {
  background-image: url(~@/assets/images/map_icon_yellow.svg);
}

.treasure-map .map-wrapper .treasure-map-item.tr-1 {
  left: 13px;
  top: 334px;
  width: 42px;
  height: 42px;
}

.treasure-map .map-wrapper .treasure-map-item.tr-2 {
  left: 93px;
  top: 317px;
}

.treasure-map .map-wrapper .treasure-map-item.tr-3 {
  left: 133px;
  top: 265px;
}

.treasure-map .map-wrapper .treasure-map-item.tr-4 {
  left: 184px;
  top: 189px;
}

.treasure-map .map-wrapper .treasure-map-item.tr-5 {
  left: 110px;
  top: 184px;
}

.treasure-map .map-wrapper .treasure-map-item.tr-6 {
  left: 53px;
  top: 237px;
}

.treasure-map .map-wrapper .treasure-map-item.tr-7 {
  left: 41px;
  top: 171px;
}

.treasure-map .map-wrapper .treasure-map-item.tr-8 {
  left: 47%;
  top: 34%;
}

.treasure-map .map-wrapper .treasure-map-item.tr-9 {
  left: 32px;
  top: 59px;
}

.treasure-map .map-wrapper .treasure-map-item.tr-10 {
  left: 76px;
  top: 0;
  width: 42px;
  height: 42px;
  border-color: rgba(252, 195, 16, 0.5);
}

.treasure-facts {
  display: block;
  width: 100%;
  height: 100%;
}

@media (max-width: 992px) {
  .treasure-facts {
    display: none;
  }
}

.treasure-facts .facts-wrapper {
  height: 100%;
  margin-top: 50%;
}

.treasure-facts .facts-wrapper,
.treasure-facts .facts-wrapper .fact-item {
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: column;
}

.treasure-facts .facts-wrapper .fact-item {
  margin-top: 6%;
  margin-bottom: 6%;
  height: 15%;
}

.treasure-facts .facts-wrapper .fact-item .fact-thumb-label {
  display: block;
  bottom: 0;
  left: 0;
  width: 100%;
  text-transform: uppercase;
  color: hsla(0, 0%, 100%, 0.5);
  font-size: calc(0.7vw + 0.7vh);
  letter-spacing: 1px;
  text-align: center;
}

.treasure-facts .facts-wrapper .fact-item .fact-thumb {
  margin-bottom: 4%;
  display: block;
  width: 47%;
  height: 100%;
  background: url(~@/assets/images/glow.png) no-repeat 50%;
  background-size: 81%;
  position: relative;
}

.treasure-facts .facts-wrapper .fact-item .fact-thumb .icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 100%;
  margin: 0 auto;
}

.treasure-facts .facts-wrapper .fact-item .fact-thumb .icon.final-prize {
  background: url(~@/assets/images/coins_2.svg) no-repeat 50%;
}

.treasure-facts .facts-wrapper .fact-item .fact-thumb .icon.chest-counter {
  background: url(~@/assets/images/golden-chest.svg) no-repeat 50%;
  transform: rotate(20deg);
}

.treasure-facts .facts-wrapper .fact-item .fact-label {
  text-align: center;
}

.treasure-facts .facts-wrapper .fact-item .fact-label.final-prize {
  padding-top: 2%;
  color: #fcc310;
  font-weight: 700;
  font-size: calc(1.7vw + 0.7vh);
  text-shadow: -2px 2px 0 rgba(216, 114, 17, 0.79);
}

.treasure-facts .facts-wrapper .fact-item .fact-label.chest-counter {
  padding-top: 2%;
  color: #80bfe0;
  font-weight: 700;
  font-size: calc(1.7vw + 0.7vh);
  text-shadow: -2px 2px 0 #2977a0;
}
</style>
