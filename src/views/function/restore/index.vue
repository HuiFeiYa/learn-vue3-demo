<template>
  <div>
    <!-- <canvas ref="canvas" width="400" height="400"></canvas> -->
    <canvas ref="canvas" width="400" height="400" @mousemove="move"></canvas>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawSurfaceImageData: {}
    }
  },
  mounted() {
    this.init()
    this.draw()
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
