<template>
    <div>
      <!-- <canvas ref="canvas" width="500" height="500"></canvas> -->
    </div>
</template>
<script lang='ts'>
  import { Component, Vue } from 'vue-property-decorator'
  import { State } from '../rect/board/utils'
  import { Shape } from '../rect/board/scaleConfig'
  import Canvas  from  '../rect/board/version-1.1'
  @Component({})
  export default class Rotate extends Vue {
    $refs!: {
      canvas: HTMLCanvasElement;
    }
    canvas!: HTMLCanvasElement
    ctx!: CanvasRenderingContext2D 
    mounted() {
      this.init()
      // this.canvas = this.$refs.canvas
      // this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
      // this.rotateLine()
      // this.rotateRect()
      // this.drawManyShapes()
      // this.drawManyShapes1()
    }
    drawManyShapes() {
      // 绘制图形
      const ctx = this.ctx
      ctx.beginPath()
      ctx.rect(50,50,30,20)
      ctx.moveTo(65,60)
      ctx.lineTo(150,60)
      ctx.rect(135,50,30,20)
      ctx.stroke()
    }
    drawManyShapes1() {
      const ctx = this.ctx
      ctx.beginPath()
      ctx.translate(92.5,60)
      ctx.rotate(30*Math.PI/180)
      ctx.rect(-42.5,-10,30,20)
      ctx.moveTo(-27.5,0)
      ctx.lineTo(62.5,0)
      ctx.rect(48.5,-10,30,20)
      ctx.stroke()
    }
    // 旋转矩形
    rotateRect() {
      this.drawRect()
      this.drawAuxiliaryRect()
      this.drawAuxiliaryRect1()
    }
    drawRect() {
      const ctx = this.ctx
      ctx.beginPath()
      ctx.rect(100,50,30,20)
      ctx.strokeStyle = '#999'
      ctx.stroke()
    }
    drawAuxiliaryRect() {
      const ctx = this.ctx
      ctx.save()
      ctx.beginPath()
      // 分析原先的起点是(100,50),现在要按照(150,100) 为中心点旋转
      // ctx.translate 是从 (0,0) 开始偏移的
      ctx.translate(150,100)
      ctx.rotate(0 * Math.PI / 180)
      ctx.rect(0,0,30,20)
      ctx.strokeStyle = 'red'
      ctx.setLineDash([1,3])
      ctx.stroke()
      ctx.restore()
    }
    drawAuxiliaryRect1() {
      const ctx = this.ctx
      const deg = 90
      ctx.save()
      ctx.beginPath()
      ctx.translate(150,100)
      // 要以矩形的中心点作为选中的参考点
      // (100 + 30/2,50 + 20/2) = (115,60)  (150,100)
      ctx.rotate(deg * Math.PI / 180)
      ctx.strokeStyle = '#333'
      ctx.lineWidth = 2
      ctx.setLineDash([1,2])
      ctx.rect(0,-53,30,20)
      ctx.stroke()
      ctx.restore()
    }
    // 旋转线段
    rotateLine() {
      this.drawAuxiliary()
      this.drawLine()
      this.drawDashLine()
    }
    drawAuxiliary() {
      const ctx = this.ctx
      ctx.beginPath()
      ctx.arc(150,100,10,0,Math.PI*2)
      ctx.fillStyle = 'red'
      ctx.fill()
    }
    drawLine() {
      const ctx = this.ctx
      ctx.beginPath()
      ctx.moveTo(100,100)
      ctx.lineTo(200,100)
      ctx.stroke()
    }
    drawDashLine() {
      const ctx = this.ctx
      ctx.beginPath()
      ctx.save()
      ctx.translate(150,100)
      ctx.rotate(30 * Math.PI / 180)
      ctx.moveTo(-50,0)
      ctx.lineTo(50,0)
      ctx.setLineDash([1,4])
      ctx.strokeStyle = 'green'
      ctx.stroke()
      ctx.restore()
    }
    init() {
            const shapeList: Shape[] = [
      {
        type: 'rect',
        x: 150,
        y: 150,
        w: 100,
        h: 100,
        fillStyle: 'green',
        // 表示当前图形的层级，用于重叠时候判断哪个在上面
        zIndex: 0,
        rotateDeg:45
      },
            {
      type: 'circle',
      x: 300,
      y: 200,
      r: 50,
      fillStyle: 'red',
      zIndex: 1,
      rotateDeg:0
    }
    ]
    const state = new State(shapeList)
    const instance = new Canvas(state)
    instance.initDraw()
    }
  }
</script>
<style lang='less' scoped >

</style>