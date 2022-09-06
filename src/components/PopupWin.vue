<template>
  <div class="cover">
    <div class="final-win">
      <h3>Вы выиграли!</h3>
      <div class="bg"></div>
      <div class="profit"></div>
      <a @click="resetGame()" class="button">Закрыть</a>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  methods: mapMutations("game", ["resetGame"]),
};
</script>

<style scoped>
.cover {
  z-index: 20;
  width: 200%;
  height: 200%;
  background-color: rgba(0, 0, 0, 0.4);
  position: absolute;
  align-content: center;
  display: flex;
  pointer-events: all;
}

.cover .final-win {
  margin: auto;
  position: relative;
  z-index: 10;
  display: flex;
  width: 380px;
  padding: 40px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  background-color: #1c2941;
  background-image: url(~@/assets/images/glow.png);
  background-position: 50% 50%;
  background-size: cover;
  color: #fff;
  text-align: center;
}

@media screen and (max-width: 567px) {
  .cover .final-win {
    width: 100%;
    height: 100%;
    margin: 0;
  }
}

.cover .final-win .bg {
  background: url(~@/assets/images/final_win_chest.png) no-repeat 50%;
  background-size: contain;
  width: 200px;
  height: 200px;
}

.cover .final-win .button {
  padding: 0 20px;
  border: 1px solid transparent;
  border-radius: 6px;
  background-color: #59b2e1;
  box-shadow: 11px 11px 30px 0 transparent;
  transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1),
    box-shadow 0.2s ease;
  color: #fff;
  font-weight: 600;
  font-size: 12px;
  text-align: center;
  height: 40px;
  min-width: auto;
  flex: 0 0 auto;
  line-height: 40px;
  cursor: pointer;
  touch-action: manipulation !important;
  pointer-events: auto;
}

.cover .final-win .button:hover {
  background-image: linear-gradient(
    180deg,
    hsla(0, 0%, 100%, 0.1),
    hsla(0, 0%, 100%, 0.1)
  );
  box-shadow: 11px 11px 30px 0 rgba(0, 0, 0, 0.2);
  transform: translateY(-2px);
}

.cover .final-win .profit {
  display: flex;
  margin-bottom: 30px;
  margin-top: 30px;
}

.cover .final-win .profit .text {
  min-width: 110px;
}

.cover .final-win .profit .coin {
  background-image: url(~@/assets/images/coins.svg);
  width: 30px;
  height: 30px;
  background-repeat: no-repeat;
}
</style>
