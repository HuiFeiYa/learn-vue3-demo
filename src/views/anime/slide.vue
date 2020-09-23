<template>
  <div>
    <!-- <img src="./source/sunday.svg" alt="" /> -->
    <svg
      width="480"
      height="360"
      version="1.1"
      aria-hidden="true"
      class="svg-icon"
      xmlns="http://www.w3.org/2000/svg"
    >
      <use href="#icon-line"></use>
    </svg>
    <span @click="onClick">点击</span>
    <!-- <svg-icon iconClass="sunday"></svg-icon> -->
  </div>
</template>

<script>
import anime from 'animejs/lib/anime.es.js'
export default {
  name: '',

  data() {
    return {}
  },

  methods: {
    onClick() {
      const letterTime = 2000

      const lineDrawing = anime({
        targets: '.line1',
        // Anime 提供了 strokeDashoffset 这个属性，它会自动计算 path 的长度然后来设置 path 的 stroke-dasharry 和 stroke-dashoffset 的值
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutCubic',
        duration: letterTime,
        delay: function(el, i) {
          // el.setAttribute('fill','red')
          return letterTime * i
        },
        begin: function(anim) {
          const letters = document.querySelectorAll('.line1')
          console.log('letter', letters)
          let i
          for (i = 0; i < letters.length; ++i) {
            letters[i].setAttribute('stroke', '#000000')
            // letters[i].setAttribute('fill', 'red')
          }
        },
        update: function(anim) {
          // console.log('anim',anim)
          if (anim.currentTime >= letterTime) {
            document.querySelector('.line1').setAttribute('fill', '#000')
          }
        },

        autoplay: false
      })
      console.log('lineDrawing', lineDrawing)
      lineDrawing.restart()
    }
  }
}
</script>

<style lang="less" scoped></style>
