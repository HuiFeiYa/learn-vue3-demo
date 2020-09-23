<template>
  <div>
    <h4>文案效果展示</h4>
    <div class="text-wrap">
      <div class="sup">
        anime base example
      </div>
      <div class="sub">photo in hangzhou</div>
    </div>
    <h4>背景色展示</h4>
    <div class="box"></div>
    <div class="circle"></div>
  </div>
</template>

<script>
import anime from 'animejs/lib/anime.es.js'
export default {
  name: '',

  data() {
    return {}
  },
  mounted() {
    this.single()
    this.text()
  },
  methods: {
    text() {
      anime({
        targets: ['.sup', '.sub'],
        duration: 4000,
        color: [
          {
            value: '#b92b27'
          },
          {
            value: '#1565C0'
          },
          {
            value: '#89253e'
          }
        ],
        easing: 'easeInOutSine',
        direction: 'alternate',
        loop: true
      })
    },
    single() {
      anime({
        targets: ['.box', '.circle'],
        // 分别设置多个元素 translateX 移动的值
        // translateX: (elm, index) => (index + 1) * 100,
        duration: 3000,
        delay: 600,
        easing: 'easeInOutSine',
        direction: 'alternate',
        loop: true
        // backgroundColor: [
        //   {
        //     value: '#C6FFDD'
        //   },
        //   {
        //     value: '#FBD786'
        //   },
        //   {
        //     value: '#f7797d'
        //   }
        // ],
      })
    }
  }
}
</script>

<style lang="less" scoped>
.sup {
  font-size: 50px;
  font-weight: bold;
  color: #b92b27;
}
.box {
  width: 100px;
  height: 100px;
  background-color: rgb(251, 21, 90);
}
.text-wrap {
  width: 700px;
  text-align: center;
}
.circle {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #ccc;
}
</style>
