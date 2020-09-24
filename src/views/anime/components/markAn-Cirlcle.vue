<template>
  <div>
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      width="600"
      height="600"
    >
      <!-- 蒙版 -->
      <defs>
        <linearGradient id="Gradient">
          <!-- #fff 表示不透明，#000 表示全透明 -->
          <stop offset="0" stop-color="#fff" stop-opacity="1"></stop>
          <stop offset="1" stop-color="#fff" stop-opacity="1"></stop>
        </linearGradient>
        <mask id="Mask">
          <rect
            x="0"
            y="0"
            width="400"
            height="400"
            fill="url(#Gradient)"
          ></rect>
        </mask>
      </defs>
      <!-- 裁剪的范围 100 x 100 的矩形大小 -->
      <defs>
        <clipPath id="cut-off-bottom">
          <rect x="0" y="0" width="100" height="100" />
        </clipPath>
      </defs>
      <!-- 被裁剪的对象，一个半径为 100 的圆 -->
      <circle
        fill="green"
        cx="100"
        cy="100"
        r="100"
        mask="url(#Mask)"
        clip-path="url(#circle2)"
      />
      <!-- 可以定义多个裁剪对象 -->
      <defs>
        <clipPath id="circle2">
          <rect x="100" y="100" width="40" height="40"></rect>
        </clipPath>
      </defs>
    </svg>

    <!-- <markC></markC> -->
  </div>
</template>

<script>
import markC from './components/markC'
export default {
  name: '',
  components: {
    // markC
  },
  data() {
    return {}
  },

  methods: {}
}
</script>

<style lang="less" scoped>
#circle2 rect {
  animation: visible-rect 3s linear forwards;
}
@keyframes visible-rect {
  to {
    width: 200px;
    height: 200px;
    x: 0;
    y: 0;
  }
}
</style>
