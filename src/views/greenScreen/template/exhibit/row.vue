<template>
  <div class="container">
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
    <div class="caption">
      <div>
        <img class="word" src="./images/word1.png" alt="">
      </div>
      <div>
        <img class="word" src="./images/word1.png" alt="">
      </div>
      <div>
        <img class="word" src="./images/word1.png" alt="">
      </div>
      <div>
        <img class="word" src="./images/word1.png" alt="">
      </div>
      <div>
        <img class="word" src="./images/word1.png" alt="">
      </div>
      <div>
        <img class="word" src="./images/word1.png" alt="">
      </div>
      <div>
        <img class="word" src="./images/word1.png" alt="">
      </div>
      <div>
        <img class="word" src="./images/word1.png" alt="">
      </div>
      <div>
        <img class="word" src="./images/word1.png" alt="">
      </div>
      <div>
        <img class="word" src="./images/word1.png" alt="">
      </div>
      <div>
        <img class="word" src="./images/word1.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: '',

    data() {
      return {
      }
    },

    methods: {}
  }
</script>
<style>
img{
  margin-left:160px;
}
</style>
<style lang='less' scoped>
.caption{
  position: absolute;
  top:100px;
  display: flex;
  animation: move_word 40s linear forwards;
  transform:translate3d(0px,0,0);
}
@keyframes move_word {
  to {
    transform:translate3d(-3000px,0,0);
  }
}
.word{
  width:500px;
  margin-right: 300px;
}
.container{
  position: absolute;
  width:16000px;
  height: 100%;
  background-color: #f6f6f6;
}
.stage{
  position: absolute;
  z-index: 10;
  margin-top:100px;
  // background-color: rgba(255,0,0,0.1);
  display: flex;
  transform: translate3d(0px, 0px, 0px);
  animation: move_pic 12s linear forwards;
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
