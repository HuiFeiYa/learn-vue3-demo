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
        <!-- <Numberfal :isMove="isChangeNumber1"></Numberfal> -->
        <Number2 :isMove="isChangeNumber2"></Number2>
      </div>
      <div class="flex space-between">
        <Number3 :isMove="isChangeNumber3"></Number3>
        <div>
          <img class="default" src="./images/img.jpg" alt="">
        </div>
      </div>
      <div class="flex space-between">
        <Number4 :isMove="isChangeNumber4"></Number4>
        <div>
          <img class="default" src="./images/img.jpg" alt="">
        </div>
      </div>
      <div class="picture-wall">
        <PictureWall v-for="(item,index) in picWallList" :ind="index" :key="index" :rotate="item.rotate" :path="item.path" :isLast="index === picWallList.length - 1"></PictureWall>
      </div>
    </div>
  </div>
</template>

<script>
  import Title from './title.vue'
  import Numberfal from './numeral'
  import PictureWall from './pictureWall'
  import Cat from './cat'
  import Number2 from './components/Num2'
  import Number3 from './components/Num3'
  import Number4 from './components/num4'
  export default {
    name: '',
    components:{
      Title,
      Numberfal,
      PictureWall,
      Cat,
      Number2,
      Number3,
      Number4
    },
    data() {
      return {
        isChangeNumber1:false,
        isChangeNumber2:false,
        isChangeNumber3:false,
        isChangeNumber4:false,
        picWallList:[
          {
            path:'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7c578cb3102b47aebe9981aac3513eb8~tplv-k3u1fbpfcp-zoom-1.image',
            rotate: '10deg'
          },
          {
            path:'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c113287e50f34bcba68938557e51913f~tplv-k3u1fbpfcp-zoom-1.image',
            rotate: '0deg'
          },
          {
            path:'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7c578cb3102b47aebe9981aac3513eb8~tplv-k3u1fbpfcp-zoom-1.image',
            rotate: '-15deg'
          },
          {
            path:'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c113287e50f34bcba68938557e51913f~tplv-k3u1fbpfcp-zoom-1.image',
            rotate: '15deg'
          },
          {
            path:'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7c578cb3102b47aebe9981aac3513eb8~tplv-k3u1fbpfcp-zoom-1.image',
            rotate: '-25deg'
          },
          {
            path:'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c113287e50f34bcba68938557e51913f~tplv-k3u1fbpfcp-zoom-1.image',
            rotate: '20deg'
          },
          {
            path:'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7c578cb3102b47aebe9981aac3513eb8~tplv-k3u1fbpfcp-zoom-1.image',
            rotate: '-5deg'
          },
        ]
      }
    },
    mounted() {
      this.listener()
    },
    methods: {
      listener() {
        document.addEventListener('scroll',event=>{
          // console.log('top',document.documentElement.scrollTop)
          if(document.documentElement.scrollTop > 80) {
            this.isChangeNumber1 = true
          }
          if(document.documentElement.scrollTop > 100) {
            this.isChangeNumber2 = true
          }
          if(document.documentElement.scrollTop > 120) {
            this.isChangeNumber3 = true
          }
          if(document.documentElement.scrollTop > 150) {
            this.isChangeNumber4 = true
          }
        })
      },
      
    }
  }
</script>
<style>
</style>
<style lang='less' scoped>
.space-between{
  justify-content: space-between;
}
.picture-wall{
  position: relative;
  background-color: #f6f6f6;
}


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
  padding-bottom:474px;
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
