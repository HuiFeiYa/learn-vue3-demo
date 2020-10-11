<template>
  <div>
    <canvas id="canvas" width="500" height="300" fillStyle="#fff">
      your browser dose not support html5 canvas
    </canvas>
    <button @click="drawBg">绘制背景</button>
    <button @click="drawText">绘制文字</button>
    <button @click="drawImage">绘制图像</button>
    <button @click="guess">猜字母</button>
    <button @click="screenShot">screenShot</button>
    <button @click="globalAlphaInit">初始化globalAlpha动画</button>
    <button @click="globalAlpha">开始globalAlpha动画</button>
  </div>
</template>

<script>
export default {
  name: '',

  data() {
    return {
      number: 0,
      alpha: 0.25
    }
  },
  mounted() {
    this.canvas = document.getElementById('canvas')
    this.context = this.canvas.getContext('2d')
  },
  methods: {
    globalAlphaInit() {
      const context = this.context
      context.globalAlpha = this.alpha
      context.fillStyle = '#000'
      context.fillRect(0, 0, 640, 480)
      // context.drawImage('')
    },
    globalAlpha() {
      let alpha = this.alpha
      setInterval(() => {
        if (this.fadeIn) {
          alpha += 0.01
          if (alpha >= 1) {
            alpha = 1
            this.fadeIn = false
          }
        } else {
          alpha -= 0.01
          if (alpha < 0) {
            alpha = 0
            this.fadeIn = true
          }
        }
        console.log('alpha', alpha)
        // 需要清除之前画布上的内容，然后重新绘制新的透明度的画面
        this.context.clearRect(0, 0, 640, 480)
        this.context.globalAlpha = alpha
        this.context.fillStyle = '#000'
        this.context.fillRect(0, 0, 640, 480)
      }, 20)
    },
    screenShot() {
      const url = this.canvas.toDataURL()
      console.log('url', url)
      window.open(url)
    },
    eventKeyPress(e) {
      const keyCode = e.keyCode
      const context = this.context
      context.clearRect(0, 0, 500, 300)
      if (keyCode > 60) {
        context.fillText('太大了', 195, 80)
      } else if (keyCode < 60) {
        context.fillText('太小了', 195, 80)
      } else {
        context.fillText('恭喜你猜对了', 195, 80)
      }
      this.number++
      context.fillText(`一共猜了${this.number} 次`, 195, 130)
      console.log('keydown', keyCode)
    },
    guess() {
      window.addEventListener('keydown', this.eventKeyPress, true)
      this.context.font = '20px sans-serif'
      this.context.textBaseline = 'top'
      this.context.fillText('按下键盘开始猜字母', 195, 80)
    },
    drawBg() {
      this.context.fillStyle = '#ffffaa'
      this.context.fillRect(0, 0, 500, 300)
    },
    drawText() {
      this.context.fillStyle = '#000'
      this.context.font = '20px sans-serif'
      this.context.textBaseline = 'top'
      this.context.fillText('hello world', 195, 80)
    },
    drawImage() {
      const context = this.context
      const img = new Image()
      img.onload = function() {
        context.drawImage(img, 0, 0)
      }
      img.src =
        'https://static-zh.wxb.com.cn/customer/form/2020/9/174c429845f.png'
    }
  }
}
</script>

<style lang="less" scoped></style>
