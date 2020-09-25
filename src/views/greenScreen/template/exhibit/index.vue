<template>
  <div ref="container" class="container">
    <div class="title">
      <Title></Title>
    </div>
    <div class="stage">
      <div class="picture-wall">
        <PictureWall v-for="(item,index) in picWallList" :ind="index" :key="index" :rotate="item.rotate" :path="item.path"></PictureWall>
      </div>
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
    </div>
  </div>
</template>

<script>
  import Title from './title.vue'
  import Numberfal from './numeral'
  import PictureWall from './pictureWall'
  export default {
    name: '',
    components:{
      Title,
      Numberfal,
      PictureWall
    },
    data() {
      return {
        isChangeNumber1:false,
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
          {
            path:'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c113287e50f34bcba68938557e51913f~tplv-k3u1fbpfcp-zoom-1.image',
            rotate: '-15deg'
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
        })
      }
    }
  }
</script>
<style>
</style>
<style lang='less' scoped>
.picture-wall{
  position: relative;
  height: 600px;
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
