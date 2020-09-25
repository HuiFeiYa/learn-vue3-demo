<template>
  <div>
    <svg width='350' version='1.1' xmlns='http://www.w3.org/2000/svg' viewBox="20 80 100 100">
          <path
          
         class="number1 my-num1"
         d="m 39.158332,104.775 h 8.493125 q 3.472656,0 5.953125,2.50031 2.500312,2.50032 2.500312,5.95313 v 21.19312 q 0,3.43297 -2.500312,5.95313 -2.480469,2.50031 -5.953125,2.50031 h -8.493125 q -3.472656,0 -5.972969,-2.48047 -2.480469,-2.50031 -2.480469,-5.97297 v -21.19312 q 0,-3.47266 2.480469,-5.95313 2.500313,-2.50031 5.972969,-2.50031 z m 0.09922,30.30141 q 0.3175,1.76609 1.349375,2.65906 1.051718,0.89297 2.797968,0.89297 1.766094,0 2.996407,-1.25016 1.250156,-1.25015 1.250156,-2.95672 v -14.38672 z m 8.314531,-22.56235 q -0.873125,-3.4925 -4.167188,-3.4925 -1.74625,0 -2.996406,1.25016 -1.250156,1.23031 -1.250156,2.95672 V 127.635 Z"
          fill="none" stroke="none" id="index1"/>
      <path
         class="number1 my-num2"
         d="m 72.991923,142.875 v -29.64656 h -4.246562 v -4.20688 l 8.473281,-4.24656 h 4.226719 v 38.1 z"
         fill="none" stroke="none"
         id="index2" />
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
        if(newVal) {
          this.draw()
        }
      }
    },
    methods: {
      draw() {
              const letterTime = 1000

      const lineDrawing = anime({
        targets: '.number1',
        // Anime 提供了 strokeDashoffset 这个属性，它会自动计算 path 的长度然后来设置 path 的 stroke-dasharry 和 stroke-dashoffset 的值
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutCubic',
        duration: letterTime,
        delay: function(el, i) {
          // el.setAttribute('fill','red')
          return letterTime * i
        },
        begin: function(anim) {
          const letters = document.querySelectorAll('.number1')
          let i
          for (i = 0; i < letters.length; ++i) {
            letters[i].setAttribute('stroke', '#777')
            letters[i].setAttribute('stroke-width', 2)
            document.getElementById('index1').setAttribute('fill','none')
            document.getElementById('index2').setAttribute('fill','none')
          }
        },
        update: function(anim) {

          if(anim.currentTime >= 2.5 * letterTime) {
            document.getElementById('index1').setAttribute('fill','#f66')
          }
          if(anim.currentTime >= 4 *letterTime) {
            document.getElementById('index2').setAttribute('fill','#f66')
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
