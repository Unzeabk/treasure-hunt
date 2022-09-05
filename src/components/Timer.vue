<template>
  <div
    :style="{
      width: `${percent}%`,
      height: height,
      opacity: show ? 1 : 0,
      'background-color': canSuccess ? color : failedColor,
    }"
    style="border-radius: 4px; transition: width 0.4s, opacity 0.4s"
    class="progress liner loading"
  />
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  data: () => ({
    percent: 0,
    show: false,
    canSuccess: true,
    duration: 0,
    height: "10px",
    color: "#59b2e1",
    failedColor: "red",
  }),

  methods: {
    ...mapMutations(["resetGame"]),
    start() {
      if (this.timer) {
        clearInterval(this.timer);
        this.percent = 100;
      }
      let d = 1000 / this.duration;
      this.timer = setInterval(() => {
        this.percent -= d;
        if (this.percent < 1) {
          this.finish();
        }
      }, 10);
    },
    finish() {
      this.percent = 0;
      this.canSuccess = false;
      this.pause();
      this.resetGame();
    },
    pause() {
      clearInterval(this.timer);
    },
  },

  computed: mapState(["levelTimer", "openedLevels"]),
  watch: {
    openedLevels() {
      this.pause();
    },
    levelTimer(duration) {
      console.log(this.openedLevels);

      if (duration == 0) {
        this.canSuccess = false;
        this.percent = 0;
        return;
      }

      if (this.openedLevels == 10) {
        this.show = false;
        return;
      }

      this.duration = duration;

      this.canSuccess = true;
      this.percent = 100;
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
}
</style>
