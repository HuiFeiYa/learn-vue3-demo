<template>
  <div style="text-algin:center">
    <img class="box" src="./images/img.jpg" alt="">
  </div>
</template>

<script>
  import anime from 'animejs/lib/anime.es.js'
  export default {
    name: '',

    data() {
      return {
      }
    },
    mounted() {
      // this.shake()
    },
    methods: {
      shake() {
        anime({
          delay:2000,
          targets: '.box',
          duration: 1500,
          keyframes:[
            // {translateX:80,duration:2600},设置dom的过渡时间
            {translateX:90},
            {translateX:110},
            {translateX:90},
            {translateX:110},
            {translateX:90},
            {translateX:110},
            {translateX:90},
            {translateX:100},
            {width:700,translateX:0},
            {width:600,translateX:100},
            {width:750,translateX:0},
            {width:600,translateX:100},
            {width:800,translateX:0},
          ]
        })
      }
    }
  }
</script>

<style lang='less' scoped>
.box{
  width:600px;
  transform: translateX(100px);
}
</style>
