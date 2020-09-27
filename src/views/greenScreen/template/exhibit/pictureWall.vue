<template>
<transition name="router-slid">
  <div class="one-pic">
    <div class="wrap" :class="{last:isLast}"   :style="{
        transform:`rotate(${rotate})`
      }">
      <img :class="{'last-image':isLast}" v-show="isShow" :src="path" alt="">
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
        const time = (this.ind + 1) * 1000
        if(newVal) {
          setTimeout(() => {
            this.isShow = true
            this.shake()
          }, (this.ind + 1) * 1000);
          }

        },
    },
    created() {

    },
    mounted() {
    },
    methods: {
      shake() {
        anime({
          delay:3000,
          targets: '.last-image',
          duration: 1500,
          translateX:[
            {value:0},
            {value:-138.8},
          ],
          translateY:[
            {value:0},
            {value:-78}
          ],
          width:[
            {value:520},
            {value:800}
          ],
          height:[
            {value:292},
            {value:450}
          ],
          rotate:[
            {value:0},
            {value:5}
          ]
          // keyframes:[
          //   {width:520,height:292,translateX:0,translateY:0,rotate:0},
          //   {width:800,height:450,translateX:-138.8,translateY:-78,rotate:5}
          // ],
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
}
// 这里必须给图片添加一个默认高度，否则会导致显示问题
.last-image{
  height:292px ;
}
</style>
