<template>
  <div @click="checkСhoice()" class="item-wrapper">
    <div class="treasure-item" :class="isOpened ? (isCorrect ? 'win' : 'lose') : ''">
      <div class="rocks"></div>
      <div class="chest-shadow-container">
        <div class="chest-shadow"></div>
        <div v-if="isOpened && isCorrect" class="win-glow"></div>
      </div>
      <div class="chest-wrap">
        <div :class="`${isOpened ? 'opened-chest' : 'chest'} ${isGolden ? 'golden-chest' : ''}`">
          <div v-if="isOpened" class="chest-top opened"></div>
          <div v-if="isOpened" class="chest-body opened"></div>
          <div v-if="isOpened && isCorrect" class="win-coins">
            <div class="coin-1"></div>
            <div class="coin-2"></div>
            <div class="coin-3"></div>
          </div>
          <div v-if="isOpened && !isCorrect" class="bomb"></div>
        </div>
      </div>
      <div class="glow"></div>
      <Transition name="slide-up">
        <div v-if="height <= level && isGame" class="item-label">
          <div class="text-task">
            {{ task }}
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  props: ["isGolden", "task", "height", "isCorrect"],
  data: () => ({
    isOpened: false,
  }),
  computed: mapState("game", ["level", "isGame", "openedLevels"]),
  methods: {
    ...mapMutations("game", ["levelUp", "resetGame", "checkUpLevel"]),
    checkСhoice() {
      if (!this.isGame) {
        return;
      }

      if (this.level != this.height) {
        return;
      }

      if (this.openedLevels == this.level + 1) {
        return;
      }

      this.isOpened = true;
	  
      this.checkUpLevel();

      setTimeout(() => {
        if (this.isCorrect) {
          this.levelUp();
        } else {
          this.resetGame();
        }
        this.isOpened = false;
      }, 700);
    },
  },
};
</script>

<style scoped>
.item-wrapper {
  width: 31.5%;
}

.treasure-item,
.item-wrapper {
  display: block;
  height: 100%;
}

.treasure-item {
  position: relative;
  width: 100%;
  border: 1px solid hsla(0, 0%, 100%, 0.1);
  background-color: #283753;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  font-size: 12px;
  -webkit-transition: all 0.25s;
  transition: all 0.25s;
}
.treasure-item.win {
  background-color: rgba(62, 207, 142, 0.4);
  border-color: #3ecf8e;
}

.treasure-item.lose {
  background-color: rgb(207 62 62 / 40%);
  border-color: #cf3e3e;
}

.treasure-item.win .win-glow {
  width: 150px;
  height: 150px;
  display: block !important;
  opacity: 1 !important;
  -webkit-animation: infinite-spin 8s infinite linear;
  animation: infinite-spin 8s infinite linear;
}
.treasure-item.win .win-coins {
  display: block !important;
  -webkit-animation: coins 0.25s linear forwards;
  animation: coins 0.25s linear forwards;
}
.treasure-item.lose .bomb {
  display: block !important;
  -webkit-animation: bomb-open 0.25s ease-out forwards;
  animation: bomb-open 0.25s ease-out forwards;
}
.treasure-item.key .key {
  display: block !important;
  -webkit-animation: key-open 0.15s ease-out forwards;
  animation: key-open 0.15s ease-out forwards;
}
.treasure-item:hover {
  -webkit-transform: scale(1.075);
  transform: scale(1.075);
}
.treasure-item:hover .glow {
  -webkit-transform: translate3d(-15em, -15em, 0) scaleX(1) rotateX(0deg)
    rotateY(0deg) rotate(-45deg) skew(0deg, 0deg);
  transform: translate3d(-15em, -15em, 0) scaleX(1) rotateX(0deg) rotateY(0deg)
    rotate(-45deg) skew(0deg, 0deg);
}
.treasure-item:hover .chest-wrap .chest {
  -webkit-transform: translate3d(3px, -5px, 0) rotate(25deg);
  transform: translate3d(3px, -5px, 0) rotate(25deg);
}
.treasure-item .rocks {
  display: block;
  width: 100%;
  height: 5.833em;
  background: url(~@/assets/images/rocks.svg) no-repeat 50%;
  margin-right: 0.417em;
  position: absolute;
  bottom: -2.333em;
}
.treasure-item .win-glow {
  background: url(~@/assets/images/white-glow.svg) no-repeat 50%;
  background-size: contain;
  margin-bottom: 50px;
  -webkit-transition: all 0.25s;
  transition: all 0.25s;
}
.treasure-item .win-coins,
.treasure-item .win-glow {
  display: none;
  width: 100%;
  height: 100%;
  position: absolute;
  opacity: 0;
}
.treasure-item .win-coins {
  bottom: 29%;
  left: 7%;
  z-index: 2;
  font-size: 14px;
}
@media (max-width: 567px) {
  .treasure-item .win-coins {
    font-size: 8px;
  }
}
.treasure-item .win-coins .coin-1 {
  display: block;
  width: 35%;
  height: 35%;
  background: url(~@/assets/images/coin-1.svg) no-repeat 50%;
  position: absolute;
  top: 37%;
  left: 29%;
  -webkit-transform: rotate(15deg);
  transform: rotate(15deg);
  -webkit-animation: coin-1 0.25s linear forwards;
  animation: coin-1 0.25s linear forwards;
}
.treasure-item .win-coins .coin-2 {
  display: block;
  width: 35%;
  height: 35%;
  background: url(~@/assets/images/coin-2.svg) no-repeat 50%;
  position: absolute;
  top: 39%;
  left: -4%;
  -webkit-animation: coin-2 0.35s linear forwards;
  animation: coin-2 0.35s linear forwards;
}
.treasure-item .win-coins .coin-3 {
  display: block;
  width: 35%;
  height: 35%;
  background: url(~@/assets/images/coin-1.svg) no-repeat 50%;
  position: absolute;
  top: 0.45em;
  left: 1.2em;
  -webkit-transform: rotate(80deg);
  transform: rotate(80deg);
  -webkit-animation: coin-3 0.45s ease-out forwards;
  animation: coin-3 0.45s ease-out forwards;
}
.treasure-item .bomb {
  display: none;
  width: 60%;
  height: 60%;
  z-index: 2;
  background: url(~@/assets/images/bomb.svg) no-repeat 50%;
  position: absolute;
  opacity: 0;
  -webkit-transform: rotate(0deg);
  transform: rotate(0deg);
  font-size: 14px;
}
@media (max-width: 567px) {
  .treasure-item .bomb {
    font-size: 8px;
  }
}
.treasure-item .key {
  display: none;
  width: 4em;
  height: 4em;
  z-index: 2;
  background: url(~@/assets/images/reverse-key.svg) no-repeat 50%;
  position: absolute;
  opacity: 0;
  -webkit-transform: rotate(0deg);
  transform: rotate(0deg);
  font-size: 14px;
}
@media (max-width: 567px) {
  .treasure-item .key {
    font-size: 8px;
  }
}
.treasure-item .glow {
  -webkit-transform: translateZ(0) scaleX(1) rotateX(0deg) rotateY(0deg)
    rotate(-45deg) skew(0deg, 0deg);
  transform: translateZ(0) scaleX(1) rotateX(0deg) rotateY(0deg) rotate(-45deg)
    skew(0deg, 0deg);
  background-color: hsla(0, 0%, 100%, 0.1);
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  position: absolute;
  right: -10.333em;
  bottom: -5em;
  z-index: 5;
  width: 25.667em;
  height: 5.167em;
  -webkit-transition: all 0.35s;
  transition: all 0.35s;
}
.treasure-item .chest-shadow-container {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2.8em;
}
.treasure-item .chest-shadow {
  position: relative;
  bottom: 0.833em;
  width: 5em;
  height: 1.667em;
  border-radius: 50%;
  background-color: #000;
  opacity: 0.35;
  -webkit-filter: blur(0.333em);
  filter: blur(0.333em);
  -webkit-transform: rotate(10deg);
  transform: rotate(10deg);
}
.treasure-item .chest-shadow.opened {
  -webkit-animation: chest-shadow-open 0.55s linear forwards;
  animation: chest-shadow-open 0.55s linear forwards;
}
.treasure-item .chest-wrap {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
  bottom: 5%;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  font-size: 18px;
  -ms-touch-action: manipulation !important;
  touch-action: manipulation !important;
  pointer-events: auto;
}
.treasure-item .chest-wrap .chest {
  display: block;
  width: 50%;
  height: 50%;
  background: url(~@/assets/images/chest.svg) no-repeat 50%;
  -webkit-transform: rotate(10deg);
  transform: rotate(10deg);
  -webkit-transition: all 0.25s;
  transition: all 0.25s;
}
.treasure-item .chest-wrap .chest.golden-chest {
  background: url(~@/assets/images/golden-chest.svg) no-repeat 50% !important;
}
.treasure-item .chest-wrap .chest.opened {
  -webkit-animation: chest-open 0.15s ease-in-out forwards;
  animation: chest-open 0.15s ease-in-out forwards;
}
.treasure-item .chest-wrap .opened-chest {
  display: block;
  width: 50%;
  height: 50%;
  position: relative;
}
.treasure-item .item-label {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  text-align: center;
  position: absolute;
  bottom: 5px;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.treasure-item .item-label .icon-coins {
  display: inline-block;
  width: 20px;
  height: 20px;
  background: url(~@/assets/images/coins.svg) no-repeat 50%;
  background-size: contain;
  margin-right: 5px;
}
.treasure-item .item-label .icon-bust {
  display: inline-block;
  width: 20px;
  height: 20px;
  background: url(~@/assets/images/bomb.svg) no-repeat top;
  background-size: contain;
  margin-right: 5px;
}
.treasure-item .item-label .icon-key {
  display: inline-block;
  width: 20px;
  height: 20px;
  background: url(~@/assets/images/key.svg) no-repeat 50%;
  background-size: contain;
  margin-right: 5px;
}
.treasure-item .item-label .text-task {
  display: inline-block;
  font-size: 14px;
  background: #172133;
  padding: 4px 6px;
  border-radius: 6px;
  font-weight: 600;
  text-transform: capitalize;
}
.treasure-item .item-label .text-bust,
.treasure-item .item-label .text-key {
  display: inline-block;
  font-size: 12px;
  font-weight: 600;
  padding-right: 4px;
  padding-left: 4px;
  border-radius: 4px;
  color: #fff;
  text-transform: uppercase;
  margin-top: 2px;
}
.treasure-item .item-label .text-bust {
  background-color: #283753;
}
.treasure-item .item-label .text-key {
  background-color: #f7bf39;
}
@media (max-width: 567px) {
  .treasure-item {
    font-size: 10px;
  }
}
.chest-top {
  display: block;
  width: 100%;
  height: 100%;
  background: url(~@/assets/images/chest-top.svg) no-repeat 50%;
  -webkit-transform: rotate(-10deg) translate3d(0, 5%, 0);
  transform: rotate(-10deg) translate3d(0, 5%, 0);
  position: absolute;
  bottom: 37%;
  left: 27%;
  z-index: 1;
  opacity: 0;
}
.chest-top.golden {
  background: url(~@/assets/images/golden-chest-top.svg) no-repeat 50% !important;
}
.chest-top.opened {
  -webkit-animation: chest-top-open 0.1s ease-in-out forwards;
  animation: chest-top-open 0.1s ease-in-out forwards;
}
.chest-body {
  display: block;
  width: 100%;
  height: 100%;
  background: url(~@/assets/images/chest-body.svg) no-repeat 50%;
  -webkit-transform: rotate(20deg);
  transform: rotate(20deg);
  position: absolute;
  bottom: -17%;
  left: -6%;
  opacity: 0;
}
.chest-body.golden {
  background: url(~@/assets/images/golden-chest-body.svg) no-repeat 50% !important;
}
.chest-body.opened {
  -webkit-animation: chest-body-open 0.1s ease-in-out forwards;
  animation: chest-body-open 0.1s ease-in-out forwards;
}
@-webkit-keyframes chest-open {
  0% {
    -webkit-transform: scale(1) translate3d(0, -5% em, 0) rotate(10deg);
    transform: scale(1) translate3d(0, -5% em, 0) rotate(10deg);
  }
  30% {
    -webkit-transform: scale(0.7) translate3d(0, -5% em, 0) rotate(5deg);
    transform: scale(0.7) translate3d(0, -5% em, 0) rotate(5deg);
  }
  70% {
    -webkit-transform: scale(0.7) translate3d(0, -5% em, 0) rotate(5deg);
    transform: scale(0.7) translate3d(0, -5% em, 0) rotate(5deg);
  }
  to {
    -webkit-transform: scale(1) translate3d(0, -5% em, 0) rotate(10deg);
    transform: scale(1) translate3d(0, -5% em, 0) rotate(10deg);
  }
}
@keyframes chest-open {
  0% {
    -webkit-transform: scale(1) translate3d(0, -5% em, 0) rotate(10deg);
    transform: scale(1) translate3d(0, -5% em, 0) rotate(10deg);
  }
  30% {
    -webkit-transform: scale(0.7) translate3d(0, -5% em, 0) rotate(5deg);
    transform: scale(0.7) translate3d(0, -5% em, 0) rotate(5deg);
  }
  70% {
    -webkit-transform: scale(0.7) translate3d(0, -5% em, 0) rotate(5deg);
    transform: scale(0.7) translate3d(0, -5% em, 0) rotate(5deg);
  }
  to {
    -webkit-transform: scale(1) translate3d(0, -5% em, 0) rotate(10deg);
    transform: scale(1) translate3d(0, -5% em, 0) rotate(10deg);
  }
}
@-webkit-keyframes chest-top-open {
  0% {
    opacity: 1;
    -webkit-transform: rotate(21deg) translateZ(0);
    transform: rotate(21deg) translateZ(0);
  }
  to {
    opacity: 1;
    -webkit-transform: rotate(21deg) translateZ(0);
    transform: rotate(21deg) translateZ(0);
  }
}
@keyframes chest-top-open {
  0% {
    opacity: 1;
    -webkit-transform: rotate(21deg) translateZ(0);
    transform: rotate(21deg) translateZ(0);
  }
  to {
    opacity: 1;
    -webkit-transform: rotate(21deg) translateZ(0);
    transform: rotate(21deg) translateZ(0);
  }
}
@-webkit-keyframes chest-body-open {
  0% {
    opacity: 1;
    -webkit-transform: rotate(20deg);
    transform: rotate(20deg);
  }
  to {
    opacity: 1;
    -webkit-transform: rotate(20deg);
    transform: rotate(20deg);
  }
}
@keyframes chest-body-open {
  0% {
    opacity: 1;
    -webkit-transform: rotate(20deg);
    transform: rotate(20deg);
  }
  to {
    opacity: 1;
    -webkit-transform: rotate(20deg);
    transform: rotate(20deg);
  }
}
@-webkit-keyframes infinite-spin {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(1turn);
    transform: rotate(1turn);
  }
}
@keyframes infinite-spin {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(1turn);
    transform: rotate(1turn);
  }
}
@-webkit-keyframes coins {
  0% {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes coins {
  0% {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@-webkit-keyframes coin-1 {
  0% {
    top: 57%;
    left: 9%;
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    top: 46%;
    left: 35%;
    -webkit-transform: rotate(-10deg);
    transform: rotate(-10deg);
  }
}
@keyframes coin-1 {
  0% {
    top: 57%;
    left: 9%;
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    top: 46%;
    left: 35%;
    -webkit-transform: rotate(-10deg);
    transform: rotate(-10deg);
  }
}
@-webkit-keyframes coin-2 {
  0% {
    top: 45%;
    left: -8%;
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    top: 39%;
    left: -4%;
    -webkit-transform: rotate(30deg);
    transform: rotate(30deg);
  }
}
@keyframes coin-2 {
  0% {
    top: 45%;
    left: -8%;
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    top: 39%;
    left: -4%;
    -webkit-transform: rotate(30deg);
    transform: rotate(30deg);
  }
}
@-webkit-keyframes coin-3 {
  0% {
    top: 15%;
    left: 20%;
    -webkit-transform: rotate(50deg);
    transform: rotate(50deg);
  }
  to {
    top: 3%;
    left: 20%;
    -webkit-transform: rotate(80deg);
    transform: rotate(80deg);
  }
}
@keyframes coin-3 {
  0% {
    top: 15%;
    left: 20%;
    -webkit-transform: rotate(50deg);
    transform: rotate(50deg);
  }
  to {
    top: 3%;
    left: 20%;
    -webkit-transform: rotate(80deg);
    transform: rotate(80deg);
  }
}
@-webkit-keyframes chest-shadow-open {
  0% {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 0.35;
  }
  70% {
    -webkit-transform: scale(0.65);
    transform: scale(0.65);
    bottom: 1.533em;
    opacity: 0.15;
  }
  to {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 0.35;
  }
}
@keyframes chest-shadow-open {
  0% {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 0.35;
  }
  70% {
    -webkit-transform: scale(0.65);
    transform: scale(0.65);
    bottom: 1.533em;
    opacity: 0.15;
  }
  to {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 0.35;
  }
}
@-webkit-keyframes bomb-open {
  0% {
    opacity: 0;
    top: 5%;
    left: 10%;
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    opacity: 1;
    top: -15%;
    left: 15%;
    -webkit-transform: rotate(-25deg);
    transform: rotate(-25deg);
  }
}
@keyframes bomb-open {
  0% {
    opacity: 0;
    top: 5%;
    left: 10%;
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    opacity: 1;
    top: -15%;
    left: 15%;
    -webkit-transform: rotate(-25deg);
    transform: rotate(-25deg);
  }
}
@-webkit-keyframes key-open {
  0% {
    opacity: 0;
    top: 0.8em;
    left: 2em;
    -webkit-transform: rotate(10deg);
    transform: rotate(10deg);
  }
  to {
    opacity: 1;
    top: -1.2em;
    left: 1.5em;
    -webkit-transform: rotate(30deg);
    transform: rotate(30deg);
  }
}
@keyframes key-open {
  0% {
    opacity: 0;
    top: 0.8em;
    left: 2em;
    -webkit-transform: rotate(10deg);
    transform: rotate(10deg);
  }
  to {
    opacity: 1;
    top: -1.2em;
    left: 1.5em;
    -webkit-transform: rotate(30deg);
    transform: rotate(30deg);
  }
}
</style>
