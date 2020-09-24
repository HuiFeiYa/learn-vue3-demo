<template>
  <div class="container">
    <div class="title">
      <Title></Title>
    </div>
    <div class="stage">
      <!-- 一组 -->
      <div>
        <img class="cross default" src="./images/img.jpg" alt="">
      </div>
      <div>
        <img class="vertical sub" src="./images/image_v1.jpg" alt="">
      </div>
      <div>
        <img class="vertical " src="./images/image_v1.jpg" alt="">
      </div>
      <div>
        <img class="cross middle" src="./images/img.jpg" alt="">
      </div>
      <div>
        <img class="cross default" src="./images/img.jpg" alt="">
      </div>
      <!-- 二组 -->
      <div>
        <img class="cross default" src="./images/img.jpg" alt="">
      </div>
      <div>
        <img class="vertical sub" src="./images/image_v1.jpg" alt="">
      </div>
      <div>
        <img class="vertical " src="./images/image_v1.jpg" alt="">
      </div>
      <div>
        <img class="cross middle" src="./images/img.jpg" alt="">
      </div>
      <div>
        <img class="cross default" src="./images/img.jpg" alt="">
      </div>
    </div>
  </div>
</template>

<script>
  import Title from './title.vue'
  export default {
    name: '',
    components:{
      Title
    },
    data() {
      return {
      }
    },

    methods: {}
  }
</script>
<style>
</style>
<style lang='less' scoped>

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
  margin-top:40px;
}
@keyframes move_pic {
  to {
    transform: translate3d(-2500px,0,0);
  }
}
</style>
