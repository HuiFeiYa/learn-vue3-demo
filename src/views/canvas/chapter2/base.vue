<template>
  <div>
    <canvas id="canvas" width="500" height="300"></canvas>
    <button @click="rect">基础的 rect</button>
    <button @click="line">line</button>
    <button @click="arc">arc</button>
    <button @click="arcTo">arcTo</button>
    <button @click="clip">clip</button>
    <button @click="rotate1">rotate1</button>
    <button @click="scale">scale</button>
    <button @click="gradient">gradient</button>
    <button @click="createPattern">createPattern</button>
    <button @click="shadow">shadow</button>
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
  },
  methods: {
    shadow() {
      const context = this.context
      context.shadowOffsetX = 10
      context.shadowOffsetY = 10
      context.shadowColor = 'red'
      context.shadowBlur = 10
      context.fillRect(10, 10, 100, 100)
      context.clearRect(40, 40, 60, 60)
    },
    createPattern() {
      const fillImg = new Image()
      const context = this.context
      fillImg.src =
        'https://static-zh.wxb.com.cn/karazhan/content/article/2020/10/17516d872f0.png'
      fillImg.onload = function() {
        const fillPattern = context.createPattern(fillImg, 'no-repeat')
        context.fillStyle = fillPattern
        context.fillRect(0, 0, 500, 300)
      }
    },
    gradient() {
      const context = this.context
      const gr = context.createLinearGradient(0, 0, 100, 100)
      gr.addColorStop(0, '#000')
      gr.addColorStop(0.5, 'red')
      gr.addColorStop(1, '#000')
      // 设置 fillRect 渐变
      context.fillStyle = gr
      context.fillRect(0, 0, 100, 100)

      // 设置边框渐变
      // context.strokeStyle = gr
      // context.lineWidth = 13
      // context.strokeRect(0, 0, 100, 100)
    },
    scale() {
      const context = this.context
      context.fillStyle = 'red'
      context.fillRect(100, 100, 50, 50)
      context.fillStyle = '#000'
      context.translate(125, 125)
      context.scale(2, 2)
      context.rotate((Math.PI / 180) * 60)
      context.globalAlpha = 0.3
      context.fillRect(-25, -25, 50, 50)
    },
    rotate1() {
      const context = this.context
      context.fillStyle = '#000'
      context.fillRect(100, 100, 50, 50)
      context.translate(125, 125)
      context.fillStyle = 'red'
      context.rotate((45 * Math.PI) / 180)
      context.fillRect(-25, -25, 50, 50)
    },
    rotate() {
      const context = this.context
      context.fillStyle = 'red'
      // 旋转
      context.rotate((45 * Math.PI) / 180)
      context.fillRect(100, 100, 50, 50)
    },
    clip() {
      const context = this.context
      context.fillStyle = '#000'
      context.rect(0, 0, 50, 50)
      context.clip()
      context.fillRect(10, 10, 200, 200)
    },
    rect() {
      const context = this.context
      context.fillStyle = '#000'
      context.strokeStyle = '#ff00ff'
      context.lineWidth = 2
      context.fillRect(20, 20, 200, 200)
      context.strokeRect(10, 10, 210, 210)
      context.clearRect(100, 100, 110, 110)
    },
    line() {
      const context = this.context
      context.strokeStyle = '#000'
      context.lineWidth = 10
      context.lineCap = 'square'
      context.beginPath()
      context.moveTo(20, 10)
      context.lineTo(100, 10)
      context.stroke()
      // context.closePath()
    },
    arc() {
      const context = this.context
      context.beginPath()
      context.strokeStyle = '#000'
      context.lineWidth = 5
      context.arc(100, 100, 50, 0, (90 * Math.PI) / 180, false)
      // context.arc(100, 100, 50, 0, 1, true)
      context.stroke()
      // context.closePath()
    },
    arcTo() {
      const context = this.context
      context.lineWidth = 5
      context.moveTo(0, 0)
      context.lineTo(100, 200)
      context.arcTo(300, 350, 100, 100, 20)
      context.stroke()
    }
  }
}
</script>

<style lang="less" scoped></style>
