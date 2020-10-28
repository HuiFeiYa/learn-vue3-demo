<template>
  <div>
    <!-- <canvas ref="canvas" width="400" height="400"></canvas> -->
    <canvas
      ref="canvas"
      width="400"
      height="400"
      @mousemove="clearMousePos"
      @mousedown="mousedown"
      @mouseup="mouseup"
    ></canvas>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawSurfaceImageData: {},
      isDragging: false,
      lastX: '',
      lastY: ''
    }
  },
  mounted() {
    this.init()
    this.initClearMouse()
    // this.noClearClip()
    // this.clip()
    // this.drawLine()
    // this.draw()
    // this.draw1()
  },
  methods: {
    init() {
      this.canvas = this.$refs.canvas
      this.ctx = this.canvas.getContext('2d')
      this.drawSurfaceImageData = this.ctx.getImageData(
        0,
        0,
        this.canvas.width,
        this.canvas.height
      )
    },
    initClearMouse() {
      const { canvas, ctx } = this
      /*** 给 canvas 绘制一些图形 ***/

      this.grid(10, 10)
      ctx.fillRect(50, 50, 100, 100)
    },
    clearMousePos(e) {
      if (!this.isDragging) return
      const { lastX, lastY } = this
      const { clientX, clientY } = e
      // lastY 会更小
      console.log(`last:(${lastX},${lastY}) e:(${clientX},${clientY})`)
      const { ctx } = this
      /***** 开始使用橡皮擦  ****/
      // 绘制橡皮擦头
      this.clear()
      // ctx.save()
      // ctx.beginPath()
      // // 将上次绘制的内容 r+2 擦拭掉
      // ctx.arc(lastX, lastY, 12, 0, Math.PI * 2)
      // ctx.clip()
      // // 开始填充 canvas 将 clip 的内容映出来。
      // this.grid()
      // ctx.restore()
      this.moveShape(clientX, clientY)
      // 将上一次移动的路径位置记录下来，下一次使用橡皮擦的时候将上一次 move 绘制的图案清除掉
      this.lastX = clientX
      this.lastY = clientY
    },
    clear() {
      const { ctx, lastX, lastY } = this
      ctx.save()
      ctx.beginPath()
      // 将上次绘制的内容 r+2 擦拭掉
      ctx.arc(lastX, lastY, 12, 0, Math.PI * 2)
      ctx.clip()
      // 开始填充 canvas 将 clip 的内容映出来。
      this.grid()
      ctx.restore()
    },
    moveShape(x, y) {
      const ctx = this.ctx
      ctx.beginPath()
      ctx.arc(x, y, 10, 0, Math.PI * 2)
      ctx.strokeStyle = 'red'
      ctx.stroke()
      ctx.beginPath()
      ctx.arc(x, y, 1, 0, Math.PI * 2)
      ctx.fillColor = 'red'
      ctx.fill()
    },
    grid(stepX, stepY) {
      const { canvas, ctx } = this
      const w = canvas.width
      const h = canvas.height
      ctx.save()
      ctx.strokeStyle = '#aaa'
      ctx.fillStyle = '#fff'
      ctx.fillRect(0, 0, w, h)
      ctx.lineWidth = 0.5
      // 列
      for (let x = stepX; x < w; x += stepX) {
        ctx.beginPath()
        ctx.moveTo(x, stepY)
        ctx.lineTo(x, h - stepY)
        ctx.stroke()
      }
      // 行
      for (let y = stepY; y < h; y += stepY) {
        ctx.beginPath()
        ctx.moveTo(stepX, y)
        ctx.lineTo(w - stepX, y)
        ctx.stroke()
      }
      ctx.restore()
    },
    noClearClip() {
      const { canvas, ctx } = this
      ctx.fillRect(100, 100, 200, 200)
      ctx.save()
      ctx.beginPath()
      ctx.arc(150, 150, 30, 0, Math.PI * 2)
      ctx.clip()
      ctx.save()
      ctx.strokeStyle = 'red'
      ctx.fillStyle = '#fff'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.restore()
      ctx.restore()
    },
    mouseup(e) {
      this.isDragging = false
      this.clear()
    },
    mousedown(e) {
      const { clientX, clientY } = e
      this.lastX = clientX
      this.lastY = clientY
      this.isDragging = true
    },
    clip() {
      const ctx = this.ctx
      ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
      this.ctx.save()
      // 剪切的第一部分
      this.ctx.arc(100, 100, 30, 0, Math.PI * 2)
      this.ctx.clip()
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.ctx.restore()
      // clip 之后绘制图形
      this.ctx.beginPath()
      this.ctx.moveTo(0, 0)
      this.ctx.lineWidth = 5
      this.ctx.strokeStyle = 'red'
      this.ctx.lineTo(100, 100)
      this.ctx.stroke()
      // 剪切的第二部分
      // this.ctx.beginPath()
      // this.ctx.rect(120, 50, 50, 60)
      // this.ctx.clip()
      // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    },
    drawLine() {
      const ctx = this.ctx

      ctx.arc(100, 100, 73, -Math.PI / 2, 0, false)
      ctx.moveTo(100, 173)
      ctx.arc(100, 100, 73, Math.PI / 2, Math.PI, false)
      ctx.strokeStyle = 'red'
      ctx.stroke()
      ctx.beginPath()
      ctx.setLineDash([2, 5])
      ctx.strokeStyle = 'green'
      ctx.arc(100, 100, 73, Math.PI, (3 * Math.PI) / 2, false)
      ctx.moveTo(173, 100)
      ctx.arc(100, 100, 73, 0, Math.PI / 2, false)
      ctx.stroke()
    },
    draw1() {
      this.ctx.moveTo(0, 0)
      this.ctx.lineTo(100, 100)
      this.ctx.stroke()
      this.ctx.lineTo(200, 150)
      this.ctx.stroke()
      this.ctx.putImageData(this.drawSurfaceImageData, 0, 0)
      this.ctx.beginPath()
      this.ctx.moveTo(0, 0)
      this.ctx.lineTo(100, 20)
      this.ctx.stroke()
    },
    draw() {
      this.ctx.moveTo(0, 0)
      this.ctx.lineTo(100, 100)
      this.ctx.stroke()
      this.ctx.lineTo(200, 150)
      this.ctx.stroke()
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.ctx.beginPath()
      this.ctx.moveTo(0, 0)
      this.ctx.lineTo(100, 20)
      this.ctx.stroke()
    },
    move(e) {
      const { x, y } = this.windowToCanvasLoc(e.clientX, e.clientY)
      // this.ctx.putImageData(this.drawSurfaceImageData, 0, 0)
      // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.ctx.beginPath()
      this.ctx.moveTo(0, 0)
      this.ctx.lineTo(x, y)
      this.ctx.stroke()
    },
    windowToCanvasLoc(x, y) {
      const canvasLoc = this.canvas.getBoundingClientRect()
      // 获取当前canvas相对于窗口左上角的位置
      const { top, left } = canvasLoc
      // console.log('canvas loc',top,left)
      return {
        x: x - left,
        y: y - top
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
