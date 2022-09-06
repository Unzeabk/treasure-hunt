<template>
  <div
    :style="{
      width: `${percent}%`,
      height: height,
      opacity: show ? 1 : 0,
      transition: lowTransition
        ? 'width 0.1s, opacity 0.4s'
        : 'width 0.4s, opacity 0.4s',
      'background-color': canSuccess ? color : failedColor,
    }"
    class="progress"
  />
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  data: () => ({
    percent: 0,
    show: false,
    lowTransition: false,
    canSuccess: true,
    duration: 0,
    height: "10px",
    color: "#59b2e1",
    failedColor: "red",
  }),
  methods: {
    ...mapMutations("game", ["resetGame"]),
    start() {
      if (this.timer) {
        clearInterval(this.timer);
        this.percent = 100;
      }
      this.lowTransition = true;
      let d = 1000 / this.duration;
      this.timer = setInterval(() => {
        this.percent -= d;
        if (this.percent < 1) {
          this.finish();
        }
      }, 10);
    },
    finish() {
      this.pause();
      this.resetGame();
    },
    pause() {
      clearInterval(this.timer);
    },
  },
  computed: mapState("game", ["levelTimer", "openedLevels", "countLevels"]),
  watch: {
    openedLevels() {
      this.pause();
    },
    levelTimer(duration) {
      if (duration == 0) {
        this.canSuccess = false;
        this.percent = 0;
        return;
      }

      if (this.openedLevels == this.countLevels) {
        this.show = false;
        return;
      }

      this.duration = duration;

      this.percent = 100;
      this.lowTransition = false;
      this.canSuccess = true;
      this.show = true;

      setTimeout(() => {
        this.start();
      }, 400);
    },
  },
};
</script>

<style scoped>
.progress {
  position: fixed;
  bottom: 0px;
  left: 0px;
  right: 0px;
  height: 4px;
  width: 0%;
  opacity: 1;
  z-index: 999999;
  border-radius: 4px;
}
</style>
