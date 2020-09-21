<template>
  <div class="container">
    <div class="stage">
      <!-- <div class="css-selector-demo"></div> -->
      <svg
        width="500"
        height="500"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      ></svg>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import anime from 'animejs/lib/anime.es.js'
console.log('anime', anime)
@Component({})
export default class BorderAnimation extends Vue {
  mounted() {
    anime({
      targets: ['css-selector-demo'],
      points: '64 128 8.574 96 8.574 32 64 0 119.426 32 119.426 96',
      baseFrequency: 0,
      scale: 1,
      loop: true,
      direction: 'alternate',
      easing: 'easeInOutExpo'
    })
  }
}
</script>
<style lang="less" scoped>
.stage {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 640px;
  height: 360px;
  border: 3px solid red;
}
.container {
  background: green;
  height: 600px;
}
.css-selector-demo {
  width: 40px;
  height: 40px;
  background-color: #f66;
}
</style>
