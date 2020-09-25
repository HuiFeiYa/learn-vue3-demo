<template>
<transition name="router-slid">
  <div class="one-pic">
    <div class="wrap" :class="{last:isLast}"   :style="{
        transform:`rotate(${rotate})`
      }">
      <img :class="{'last-image':isLast}"  v-show="isShow" :src="path" alt="">
    </div>
  </div>
</transition>
</template>

<script>
  import anime from 'animejs/lib/anime.es.js'
  export default {
    name: '',
    props:{
      rotate:{
        type:String,
        default:'10deg'
      },
      path:{
        type:String,
        default:''
      },
      ind:{
        type:Number,
        default: 0
      },
      isLast:{
        type:Boolean,
        default:false
      },
      isEnd:{
        type:Boolean,
        default:false
      }
    },
    data() {
      return {
        isShow:false
      }
    },
    watch:{
      isEnd(newVal) {
        if(newVal) {
          setTimeout(() => {
            this.isShow = true
          }, (this.ind + 1) * 1000);
           this.shake()
          }

        }
    },
    created() {

    },
    mounted() {
      // this.shake()
    },
    methods: {
      shake() {
        anime({
          delay:1000 * (this.ind + 1),
          targets: '.last-image',
          duration: 1500,
          keyframes:[
            {width:800,translateX:-138.8,translateY:-78,rotate:5,height:450}
          ]
        })
      }
    }
  }
</script>

<style lang='less' scoped>

.one-pic{
  position: absolute;
  top:100px;
  left:50%;
  transform: translateX(-50%);
  text-align: center;
  
  .wrap{
    border:3px solid #eee;
    width: 520px;
    height: 292px;
    display: inline-block;
  }
  // transform: rotate(30deg);
  img{
    width:520px;
    vertical-align: middle;
    position: relative;
    z-index: 9999;
  }
  .last{
    border:none;
  }
}
</style>
