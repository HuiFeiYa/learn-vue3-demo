<template>
  <div>
    <canvas id="canvas" width="500" height="300"></canvas>
    <button @click="text">text</button>
    <button @click="save">save</button>
    <button @click="imageData">imageData</button>
  </div>
</template>

<script>
export default {
  name: '',

  data() {
    return {}
  },
  mounted() {
    this.canvas = document.getElementById('canvas')
    this.context = this.canvas.getContext('2d')
    // this.drawImage()
  },
  methods: {
    imageData() {
      const ctx = this.context
      const fillImg = new Image()
      fillImg.src =
        'https://static-zh.wxb.com.cn/karazhan/content/article/2020/10/17516d872f0.png'
      // 报错 Uncaught DOMException: Failed to execute 'getImageData' on 'CanvasRenderingContext2D': The canvas has been tainted by cross-origin data
      // 跨域问题使用添加 crossOrigin 属性
      fillImg.crossOrigin = 'anonymous'
      fillImg.onload = function() {
        ctx.drawImage(fillImg, 10, 10)

        const imageData = ctx.getImageData(20, 120, 20, 20)
        console.log('imageData', imageData)
        ctx.putImageData(imageData, 150, 150)
      }
    },
    save() {
      const ctx = this.context
      //初始的样式（绘制状态）并绘制矩形
      ctx.fillStyle = '#FA6900'
      ctx.shadowOffsetX = 5
      ctx.shadowOffsetY = 5
      ctx.shadowBlur = 4
      ctx.shadowColor = 'rgba(204, 204, 204, 0.5)'
      ctx.fillRect(0, 0, 15, 150)
      ctx.save() //保存上述设置的绘制状态

      //重新定义新的绘制状态，并绘制矩形
      ctx.fillStyle = '#E0E4CD'
      ctx.shadowOffsetX = 10
      ctx.shadowOffsetY = 10
      ctx.shadowBlur = 4
      ctx.shadowColor = 'rgba(204, 204, 204, 0.5)'
      ctx.fillRect(30, 0, 30, 150)

      //绘制完之后，恢复到初始的绘制状态，继续进行绘画。并绘制圆形，并不会恢复初始状态下绘制的矩形。
      // ctx.restore()
      ctx.beginPath()
      ctx.arc(305, 75, 8, 0, Math.PI * 2, true)
      ctx.closePath()
      ctx.fill()

      ctx.restore()
      ctx.beginPath()
      ctx.arc(305, 135, 8, 0, Math.PI * 2, true)
      ctx.closePath()
      ctx.fill()
    },
    text() {
      const context = this.context
      const message = '这里是文本'
      context.font = 'italic bold 24px serif'
      context.fillStyle = '#f66'
      const metrics = context.measureText(message)
      console.log('metrics', metrics)
      context.fillText(message, 100, 100)
      context.strokeStyle = '#333'
      context.strokeText('storkeText', 220, 100)
    },
    drawImage() {
      const context = this.context
      const img = new Image()
      img.src =
        'https://static-zh.wxb.com.cn/karazhan/content/article/2020/10/17516d872f0.png'
      img.onload = function() {
        context.drawImage(img, 0, 0)
        context.drawImage(img, 50, 130, 60, 60, 200, 10, 120, 120)
        // context.drawImage(img, 0, 0, 300, 150)
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
