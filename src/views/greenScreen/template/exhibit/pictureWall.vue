<template>
<transition name="router-slid">
  <div class="one-pic">
    <div class="wrap"   :style="{
        transform:`rotate(${rotate})`
      }">
      <img   v-show="isShow" :src="path" alt="">
    </div>
  </div>
</transition>
</template>

<script>
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
      }
    },
    data() {
      return {
        isShow:false
      }
    },
    created() {
      setTimeout(() => {
        this.isShow = true
        console.log('执行')
      }, (this.ind + 1) * 1000);
    },
    methods: {}
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
    width: 600px;
    height: 337px;
    display: inline-block;
  }
  // transform: rotate(30deg);
  img{
    width:600px;
    vertical-align: middle;
    position: relative;
    z-index: 9999;
  }
}
</style>
