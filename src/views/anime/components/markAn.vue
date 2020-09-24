<template>
  <div>
    <svg viewBox="0 0 1400 800">
      <title>Animated clip-path SVG</title>
      <defs>
        <clipPath id="cd-image-1">
          <circle id="cd-circle-1" cx="110" cy="400" r="60" />
        </clipPath>
      </defs>
      <image
        height="800px"
        width="1400px"
        clip-path="url(#cd-image-1)"
        xlink:href="https://static.wxb.com.cn/frontEnd/images/almighty/receiveSuccess.png"
      ></image>
    </svg>
  </div>
</template>

<script>
export default {
  name: '',

  data() {
    return {}
  },

  methods: {}
}
</script>

<style lang="less" scoped>
#cd-image-1 circle {
  animation: visible-clippath 1s linear forwards;
}
@keyframes visible-clippath {
  to {
    r: 1364;
  }
}
</style>
