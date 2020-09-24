<template>
  <div ref="container" class="container">
    <div class="title">
      <Title></Title>
    </div>
    <div class="stage">
      <!-- 一组 -->
      <div class="flex">
        <div>
          <img class="default" src="./images/img.jpg" alt="">
        </div>
        <Numberfal :isMove="isChangeNumber1"></Numberfal>
      </div>
      <div class="flex">
        <div>
          <img class="default" src="./images/img.jpg" alt="">
        </div>
        <Numberfal :isMove="isChangeNumber1"></Numberfal>
      </div>
      <div class="flex">
        <div>
          <img class="default" src="./images/img.jpg" alt="">
        </div>
        <Numberfal :isMove="isChangeNumber1"></Numberfal>
      </div>
      <div class="flex">
        <div>
          <img class="default" src="./images/img.jpg" alt="">
        </div>
        <Numberfal :isMove="isChangeNumber1"></Numberfal>
      </div>
    </div>
  </div>
</template>

<script>
  import Title from './title.vue'
  import Numberfal from './numeral'
  export default {
    name: '',
    components:{
      Title,
      Numberfal
    },
    data() {
      return {
        isChangeNumber1:false
      }
    },
    mounted() {
      this.listener()
    },
    methods: {
      listener() {
        console.log('1')
        document.addEventListener('scroll',event=>{
          console.log('top',document.documentElement.scrollTop)
          if(document.documentElement.scrollTop > 80) {
            this.isChangeNumber1 = true
          }
        })
      }
    }
  }
</script>
<style>
</style>
<style lang='less' scoped>
.flex{
  display: flex;
}
.container{
  background-color: #f6f6f6;
  width:800px;
  position: absolute;
  left:50%;
  transform: translateX(-50%);
}
.stage{
  display: flex;
  flex-direction: column;
  // animation: move_pic 12s linear forwards;
}
.cross{
  width:400px;
}
.vertical{
  width:300px;
}
.sub{
  margin-top:120px;
}
.middle{
  margin-top:222px;
}
.default{
  width:500px;
}
@keyframes move_pic {
  to {
    transform: translate3d(-2500px,0,0);
  }
}
</style>
