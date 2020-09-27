<template>
<div>
    <div ref="container" class="container">
      <div class="title">
        <Title></Title>
      </div>
      <div class="stage">
        <!-- 一组 -->
        <div class="flex" style="marginTop:40px">
          <div>
            <img class="default" src="./images/img.jpg" alt="">
          </div>
          <Numberfal :isMove="isChangeNumber1"></Numberfal>
        </div>
        <div class="flex" style="marginTop:20px">
          <div>
            <img class="default" src="./images/house.jpg" alt="">
          </div>
          <Number2 :isMove="isChangeNumber2"></Number2>
        </div>
        <div class="flex space-between" style="marginTop:20px">
          <Number3 :isMove="isChangeNumber3"></Number3>
          <div>
            <img class="default" src="./images/boat.jpg" alt="">
          </div>
        </div>
        <div class="picture-wall">
          <PictureWall v-for="(item,index) in picWallList" :ind="index" :key="index" :rotate="item.rotate" :path="item.path" :isLast="index === picWallList.length - 1" :isEnd="isEnd1"></PictureWall>
          <Cat v-if='isShowCat'></Cat>
        </div>
      </div>
      <div class="footer"></div>
    </div>
      <div style="position:fixed;top:0;right:0;" @click="scroll">button</div>
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
    import anime from 'animejs/lib/anime.es.js'
    import { scrollSmoothTo,scrollSmoothTo1 } from './scroll.js'
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
        isEnd1:false,
        isShowCat:false,
        picWallList:[
          {
            path:'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7c578cb3102b47aebe9981aac3513eb8~tplv-k3u1fbpfcp-zoom-1.image',
            rotate: '10deg'
          },
          {
            path:'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6cc6b09ff29845dab17d4a39e6ea6274~tplv-k3u1fbpfcp-zoom-1.image',
            rotate: '0deg'
          },
          {
            path:'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f0abd0efffb64c449b04e4becce7ca8f~tplv-k3u1fbpfcp-zoom-1.image',
            rotate: '-15deg'
          },
          {
            path:'https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6d0c670c91704fa09bb376d055792c9e~tplv-k3u1fbpfcp-zoom-1.image',
            rotate: '15deg'
          },
          {
            path:'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0aace209129145a7b5ec21f68b756ed1~tplv-k3u1fbpfcp-zoom-1.image',
            rotate: '-25deg'
          },
          {
            path:'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c113287e50f34bcba68938557e51913f~tplv-k3u1fbpfcp-zoom-1.image',
            rotate: '20deg'
          },
          {
            path:'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6b9df2af66a940fabe2e7f0fa59c690b~tplv-k3u1fbpfcp-zoom-1.image',
            rotate: '-5deg'
          },
        ]
      }
    },
    mounted() {
      this.listener()
    },
    methods: {
      scroll() {
        setTimeout(() => {
          scrollSmoothTo(document.documentElement,450)
          setTimeout(() => {
            scrollSmoothTo1(document.documentElement,1424.54541015625)
          }, 500);
        }, 1000);
      },
      listener() {
        const _this = this
        document.addEventListener('scroll',event=>{
          // console.log('top',document.documentElement.scrollTop,_this.isEnd1)
          if(document.documentElement.scrollTop > 350) {
            this.isChangeNumber1 = true
          }
          if(document.documentElement.scrollTop > 660) {
            this.isChangeNumber2 = true
          }
          if(document.documentElement.scrollTop > 930) {
            this.isChangeNumber3 = true
          }
          if(document.documentElement.scrollTop > 1221) {
            this.isChangeNumber4 = true
          }
          if(document.documentElement.scrollTop >= 1424.54541015625) {
            _this.isEnd1 = true
            const length = _this.picWallList.length
            setTimeout(() => {
              _this.isShowCat = true
            },length * 1000);
            setTimeout(() => {
              _this.isShowCat = false
            }, 1000 * (length + 3));
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
  // animation: move_container 10s  forwards;
}

.stage{
  display: flex;
  flex-direction: column;
  padding-bottom:474px;
  background:linear-gradient(to bottom,#2980B9, #eee,#FFFFFF);
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
.footer{
  height: 500px;
  background-color: #000;
}
</style>
