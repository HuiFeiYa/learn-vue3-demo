<template>
  <div class="container">
    <svg
      width="500"
      height="500"
      viewBox="0 0 600 600"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      xml:space="preserve"
      xmlns:serif="http://www.serif.com/"
    >
      <defs>
        <clipPath id="Mask">
          <path
            fill="green"
            id="XMLID_2_"
            class="st0"
            d="M64,168c0,0-30-123,80-108s91,54,182,64s137-83,163-57s119,203-37,214s-205,89-299,22
	S64,168,64,168z"
          />
        </clipPath>
      </defs>
      <image
        id="_Image1"
        width="900px"
        height="600px"
        xlink:href="https://static.wxb.com.cn/frontEnd/images/almighty/receiveSuccess.png"
        clip-path="url(#Mask)"
      />
    </svg>
  </div>
</template>

<script>
import anime from 'animejs/lib/anime.es.js'
export default {
  name: '',

  data() {
    return {}
  },
  mounted() {
    const morph = anime({
      targets: 'path',
      d: [
        {
          value:
            'M64,168c0,0-30-123,80-108s91,54,182,64s95,10,121,36s161,110,5,121s-239,115.9-333,48.9S64,168,64,168z'
        }
      ],
      easing: 'easeInOutQuad',
      duration: 3000,
      direction: 'alternate',
      // rotate: '1turn',
      loop: true
    })
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.container {
  background-color: #eee;
}
</style>
