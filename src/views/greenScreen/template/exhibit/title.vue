<template>
  <div class="title">
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 800 450" version="1.1" style="width:800px;height: 450px;border-left:1px solid red;z-index: 33;position: relative;;">
  <defs>
    <linearGradient id="gradient" gradientUnits="userSpaceOnUse" gradientTransform="rotate(30)" x2="800" y2="0">
      <!-- 透明 -->
      <stop offset="0" stop-color="#FFFFFF" stop-opacity="0"/>
      <stop offset="0.25" stop-color="#FFFFFF" stop-opacity="0.25"/>
      <!-- 完全不透明 -->
      <stop offset="1" stop-color="#FFFFFF" stop-opacity="1"/>
    </linearGradient>
    <mask id="mask" maskUnits="userSpaceOnUse">
      <rect width="800" height="300" fill="url(#gradient)"/>
    </mask>
    <text id="txt" x="400" y="200" font-family="Arial Black" font-size="60" text-anchor="middle">ISUX AWESOME</text>
    <text id="txtsub" x="400" y="240" font-family="Arial Black" font-size="20" text-anchor="middle">ISUX AWESOME</text>
  </defs>
  <use xlink:href="#txt" fill="#FFDD00" mask="url(#mask)"/>
  <use xlink:href="#txtsub" fill="#FFDD00" mask="url(#mask)"/>
  </svg>
  <div class="bg" style="background:#1d1d1d;width:100%;height:450px;position: absolute;top:0;"></div>
  </div>
</template>

<script>
  export default {
    name: '',

    data() {
      return {
      }
    },
    mounted() {
      const script = document.createElement('script')
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/2.0.2/TweenMax.min.js'
      const s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(script, s);
      script.onload = function() {
              // 循环播放动画
        var tl = new TimelineMax({
          repeat: -1
        });

        // 获取svg中渐变的transform属性
        var gradient      = document.getElementById('gradient'),
            gradient_attr = gradient.getAttribute('gradientTransform');

        // 改变渐变transform的rotate属性
        for(var i = 0, l = 360; i <= l; i++) {
          tl.to(gradient, 0.01, {
            attr: {
              gradientTransform: 'rotate(' + -i + ')'
            },
            ease: Linear.easeInOut
          })
        }
      }
    },
    methods: {}
  }
</script>

<style lang='less' scoped>

</style>
