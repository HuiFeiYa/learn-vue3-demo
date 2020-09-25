<template>
  <div>
    <svg width='250' version='1.1' xmlns='http://www.w3.org/2000/svg' viewBox="50 60 75 70">
        
        <path
         d="m 69.396426,84.364287 h 8.4836 q 3.4544,0 5.9436,2.54 2.4892,2.4892 2.4892,5.9436 v 21.132803 q 0,3.4544 -2.4892,5.9944 -2.4892,2.4892 -5.9436,2.4892 h -8.4836 q -3.4544,0 -5.9944,-2.4892 -2.4892,-2.4892 -2.4892,-5.9944 V 92.847887 q 0,-3.5052 2.4892,-5.9944 2.54,-2.4892 5.9944,-2.4892 z m 0.1016,30.327603 q 0.3048,1.7272 1.3208,2.6416 1.0668,0.9144 2.794,0.9144 1.778,0 2.9972,-1.27 1.27,-1.27 1.27,-2.9972 V 99.604287 Z m 8.3312,-22.606003 q -0.9144,-3.5052 -4.2164,-3.5052 -1.7272,0 -2.9972,1.27 -1.2192,1.2192 -1.2192,2.9972 v 14.376403 z"

         id="Number-3" class="number3" fill="none" stroke="none" />
      <path
         d="m 94.845638,84.364287 h 25.400002 v 4.2164 l -12.7,8.4836 h 4.2672 q 3.6576,0 6.0452,2.794 2.3876,2.794003 2.3876,5.689603 v 8.4328 q 0,3.5052 -2.4892,5.9944 -2.4892,2.4892 -5.9436,2.4892 h -8.4836 q -7.467602,0 -8.483602,-8.4836 h 4.2672 q 0.3048,4.2672 4.216402,4.2672 h 4.2164 q 1.778,0 2.9972,-1.2192 1.27,-1.27 1.27,-3.048 v -8.4328 q 0,-1.016 -1.0668,-2.6416 -1.0668,-1.6256 -3.2004,-1.6256 h -8.432802 v -4.216403 l 12.700002,-8.4836 H 94.845638 Z"
         id="Number-4" class="number3" fill="none" stroke="none" />
    </svg>
  </div>
</template>

<script>
  import anime from 'animejs/lib/anime.es.js'
  export default {
    name: '',
    props:{
      isMove:{
        type:Boolean,
        default:false
      }
    },
    data() {
      return {
      }
    },
    mounted() {
      
    },
    watch:{
      isMove(newVal){
        console.log('newVal2',newVal)
        if(newVal) {
          this.draw()
        }
      }
    },
    methods: {
      draw() {
              const letterTime = 1000

      const lineDrawing = anime({
        targets: '.number3',
        // Anime 提供了 strokeDashoffset 这个属性，它会自动计算 path 的长度然后来设置 path 的 stroke-dasharry 和 stroke-dashoffset 的值
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutCubic',
        duration: letterTime,
        delay: function(el, i) {
          // el.setAttribute('fill','red')
          return letterTime * i
        },
        begin: function(anim) {
          const letters = document.querySelectorAll('.number3')
          let i
          for (i = 0; i < letters.length; ++i) {
            letters[i].setAttribute('stroke', '#777')
            letters[i].setAttribute('stroke-width', 2)
            document.getElementById('index1').setAttribute('fill','none')
            document.getElementById('index2').setAttribute('fill','none')
          }
        },
        update: function(anim) {
          if(anim.currentTime >= 1 * letterTime) {
            document.getElementById('Number-3').setAttribute('fill','#f66')
          }
          if(anim.currentTime >= 2 *letterTime) {
            document.getElementById('Number-4').setAttribute('fill','#f66')
          }
        },
        loop:true,
        direction: 'alternate'
      })
      lineDrawing.restart()
      }
    }
  }
</script>

<style lang='less' scoped>

</style>
