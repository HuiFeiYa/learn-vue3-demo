<template>
  <div>
    <canvas
      ref="canvas"
      width="400"
      height="400"
      @click="onCanvasClick"
    ></canvas>
  </div>
</template>

<script>
const box = {
  x: 20,
  y: 20,
  w: 100,
  h: 100,
  control: {
    cw: 20,
    ch: 20
  }
}
export default {
  name: '',

  data() {
    return {}
  },
  mounted() {
    const canvas = this.$refs.canvas
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.initRect()
    canvas.addEventListener('mousemove', this.canvasMove)
  },
  methods: {
    initRect() {
      const { x, y, w, h } = box
      this.ctx.beginPath()
      this.ctx.rect(x, y, w, h)
      this.ctx.stroke()
    },
    canvasMove(e) {
      const isIn = this.ctx.isPointInPath(e.clientX, e.clientY)
      if (isIn) {
        const pos = this.judgePostion(e)
        const cursorMap = {
          1: 'nw-resize',
          2: 'ne-resize',
          3: 'se-resize',
          4: 'sw-resize',
          5: 'move'
        }
        this.canvas.style.cursor = cursorMap[pos]
      } else {
        this.canvas.style.cursor = 'default'
      }
    },
    // 判断当前点击的 canvas位置位于什么位置，区分四个框控制框
    judgePostion(e) {
      const { clientX, clientY } = e
      const {
        x,
        y,
        w,
        h,
        control: { cw, ch }
      } = box
      if (clientX < x) {
        if (clientY < y + ch / 2) {
          console.log('1')
          return 1
        } else {
          console.log('4')
          return 4
        }
      }
      if (clientX > x + w) {
        if (clientY < y + ch / 2) {
          console.log('2')
          return 2
        } else {
          console.log('3')
          return 3
        }
      }
      if (clientY < y) {
        if (clientX < cw / 2 + x) {
          console.log('1')
          return 1
        } else {
          console.log('2')
          return 2
        }
      }
      if (clientY > y + h) {
        if (clientX < cw / 2 + x) {
          console.log('4')
          return 4
        } else {
          console.log('3')
          return 3
        }
      }
      console.log('5')
      return 5
    },
    onCanvasClick(e) {
      const isIn = this.ctx.isPointInPath(e.clientX, e.clientY)
      /**
       * 判断是否在路径中，注意这里的路径矩形和四个角的矩形的路径属于同一个路径
       * 如果要区分点击的是这四个角还是矩形需要根据点击的位置进行判断
       * 这里不考虑 canvas的 offsetTop offsetLeft 分析最简单的情况
       */
      if (isIn) {
        this.drawControl()
        this.judgePostion(e)
      } else {
        const canvas = this.$refs.canvas
        this.ctx.clearRect(0, 0, canvas.width, canvas.height)
        this.initRect()
      }
    },
    drawControl() {
      const { x, y, w, h } = box
      this.drawSingle(x, y)
      this.drawSingle(x + w, y)
      this.drawSingle(x + w, y + h)
      this.drawSingle(x, y + h)
    },
    drawSingle(x, y) {
      const { cw, ch } = box.control
      this.ctx.rect(x - cw / 2, y - ch / 2, cw, ch)
      this.ctx.stroke()
    }
  }
}
</script>

<style lang="less" scoped></style>
