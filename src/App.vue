<template>
  <div class="sub-header-margin">
    <div class="content-wrap">
      <div class="content-container">
        <div class="ui-expander">
          <games-root />
          <app-footer />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import GamesRoot from "./components/GamesRoot.vue";
import AppFooter from "./components/AppFooter.vue";
</script>

<style scoped>
.sub-header-margin {
  position: static;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  display: flex;
  overflow: hidden;
  width: 100%;
  padding-right: 2.5vw;
  padding-left: 2.5vw;
  flex-direction: column;
  align-items: center;
  background-color: #172135;
  color: #fff;
  margin: 0 auto;
  padding-top: 2.5vw;
}

.content-wrap {
  display: flex;
  width: 100%;
  justify-content: flex-start;
}

.content-wrap {
  max-width: 1700px;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  align-content: flex-start;
}

.content-container {
  display: flex;
  width: 100%;
  max-width: 1700px;
  align-items: stretch;
}

.content-container .ui-expander {
  z-index: 2;
  display: flex;
  overflow: hidden;
  padding-right: 0;
  padding-left: 0;
  flex-direction: column;
  align-items: center;
  flex: 1;
}
</style>
