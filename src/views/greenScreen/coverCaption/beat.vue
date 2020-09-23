<template>
  <div>
    <div class="wrapper">
      <span>B</span>
      <span>E</span>
      <span>A</span>
      <span>U</span>
      <span>T</span>
      <span>Y</span>
      <!-- Urban Slow Life -->
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({})
export default class Beat extends Vue {}
</script>
<style lang="less" scoped>
// @import url('https://fonts.googleapis.com/css2?family=Titan+One&display=swap');
/* latin-ext */
@font-face {
  font-family: 'Titan One';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: local('Titan One'), local('TitanOne'),
    url(https://fonts.gstatic.com/s/titanone/v8/mFTzWbsGxbbS_J5cQcjCmjgm-khyk-RW.woff2)
      format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,
    U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Titan One';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: local('Titan One'), local('TitanOne'),
    url(https://fonts.gstatic.com/s/titanone/v8/mFTzWbsGxbbS_J5cQcjClDgm-khykw.woff2)
      format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
    U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,
    U+FEFF, U+FFFD;
}
.wrapper {
  padding-top: 100px;
  font-size: 30px;
  width: 100vw;
  text-align: center;
  background-color: green;
  height: 500px;
  span {
    -webkit-text-stroke-width: 1.25px;
    -webkit-text-stroke-color: #000;
    font-size: 40px;
    text-shadow: 0 0px #f3c623, 0 0px #f2aaaa;
    transform: translate(0, 100%) rotate(4deg);
    animation: jump 2s ease-in-out infinite;
    display: inline-block;
    font-family: 'Titan One', cursive;
    color: #fff;
    @count: 1;
    .loop(@i) when (@count > 7) {
      &:nth-child@{i} {
        animation-delay: 120ms * $i;
      }
      .loop(@count + 1);
    }
  }
}
@keyframes jump {
  33% {
    text-shadow: 0 40px #f37121, 0 100px #f2aaaa;
  }
  50% {
    transform: translate(0, 0) rotate(-4deg);
    text-shadow: 0 0px #8fc0a9, 0 0px #84a9ac;
  }
  66.67% {
    text-shadow: 0 -40px #d54062, 0 -100px #8fc0a9;
  }
}
html {
  width: 100%;
  height: 100vh;
}
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  display: grid;
  place-items: center;
  overflow: hidden;
  background: #000;
}
@media screen and (max-height: 200px) {
  .wrapper {
    transform: scale(0.3, 0.3);
  }
}
@media screen and (max-width: 576px) {
  .wrapper {
    span {
      font-size: 50px;
    }
  }
}
</style>
