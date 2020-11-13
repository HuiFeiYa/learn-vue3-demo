<template>
  <div>
    <canvas
      ref="canvas"
      width="400"
      height="400"
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
    this.scale()
  },
  methods: {
    scale() {
      const canvas = this.$refs.canvas
      const ctx = canvas.getContext('2d')
      const point = {w:20,h:20}
      const initImageData = ctx.getImageData(0,0,this.canvas.width,this.canvas.height)
      const shape = {
        x:200,
        y:100,
        w:60,
        h:80
      }
      const {x,y,w,h} = shape
      ctx.strokeStyle = 'blue'
      ctx.beginPath()
      ctx.rect(x,y,w,h)
      ctx.stroke()
      let isIn = false
      let diffX = 0
      let diffY = 0
      canvas.addEventListener('mousedown',function(e){
        const {clientX,clientY} = e
        const { x,y } = shape
        isIn = ctx.isPointInPath(clientX,clientY)
        diffX = clientX - x
        diffY = clientY - y
      })
      function drawControls() {
      const {x,y,w,h} = shape
      const pointList = [
          [x,y],[x+w,y],[x+w,y+h],[x,y+h]
        ]
      ctx.beginPath()
            // 绘制控制点
      function drawControlsPoint(list) {
        const { w,h } = point
        list.forEach(([x,y])=>{
          ctx.rect(x-w/2,y-h/2,w,h)
        })
      }
      // 连接各个绘制点
      function connectCtrolPoint(list) {
        list.forEach(([x,y],index)=>{
          if(index === 0) {
            ctx.moveTo(x,y)
          }
          ctx.lineTo(x,y)
        })
        ctx.closePath()
        ctx.strokeStyle = 'blue'
        ctx.stroke()
      }
      drawControlsPoint(pointList)
      connectCtrolPoint(pointList)
      }
      canvas.addEventListener('mousemove',function(e){
        if(isIn){
          const {w,h} = shape
          const {clientX,clientY} = e
          shape.x = clientX - diffX
          shape.y = clientY - diffY
          ctx.putImageData(initImageData,0,0)
          // 这里需要使用 beginPath 去重新定义一段 path
          ctx.beginPath()
          ctx.rect(clientX -  diffX,clientY-diffY,w,h)
          ctx.stroke()
          drawControls()
        }
      })
      canvas.addEventListener('mouseup',function(e){
        isIn = false
      })
    },
    two() {
        const canvas = this.$refs.canvas
        const ctx = canvas.getContext('2d')
        const pathList = [
              {
                type:'rect',
                x:100,
                y:100,
                w:30,
                h:50
              },
              {
                type:'rect',
                x:200,
                y:100,
                w:40,
                h:40
              }
            ]
        pathList.forEach(shape=>{
          const { x,y,w,h } = shape
          ctx.beginPath()
          ctx.rect(x,y,w,h)
          ctx.stroke()
        })
        function judgeIsPointInPath(e) {
          const {clientX,clientY} = e
          // 默认未选中
          let index = -1
          pathList.forEach((shape,i)=>{
            const { x,y,w,h } = shape
            ctx.beginPath()
            ctx.rect(x,y,w,h)
            ctx.stroke()
            if(ctx.isPointInPath(clientX,clientY)){
              index = i
            }
          })
          return index
        }
        canvas.addEventListener('mousedown',function (e) {
          const index = judgeIsPointInPath(e)
          console.log('index',index)
          switch (index) {
            case 1:
              alert('选中图形2')
              break;
          
            case 0:
              alert('选中图形1')
              break
            default:
              alert('未选中图形')
          }
        })

    },
    one() {
      const ctx = this.ctx
      const initImageData = ctx.getImageData(0,0,this.canvas.width,this.canvas.height)
      const w=50;
      const h=50
      ctx.rect(100,100,w,h)
      ctx.fillStyle = 'red'
      ctx.fill()
      let isIn = false
      this.canvas.addEventListener('mousedown',function(e){
        const {clientX,clientY} = e
        isIn = ctx.isPointInPath(clientX,clientY)
        
      })
      this.canvas.addEventListener('mousemove',function(e){
        const {clientX,clientY} = e
        if(isIn){
          ctx.putImageData(initImageData,0,0)
          // 这里需要使用 beginPath 去重新定义一段 path
          ctx.beginPath()
          ctx.rect(clientX - w/2,clientY-h/2,50,50)
          ctx.fill()
        }
      })
      this.canvas.addEventListener('mouseup',function(e){
        isIn = false
      })
    },
    path2d() {
            // ctx.save()
    const path1 = new Path2D()
      const ctx = this.ctx
      ctx.fillStyle = 'red'
      // ctx.translate(100,100)
      // path1.rect(0,0,50,100)
      path1.rect(100,100,50,100)
      ctx.rotate(30*Math.PI / 180)
      ctx.fill(path1)
      // ctx.restore()
    const path2 = new Path2D()
      // ctx.translate(200,100)
      // path2.arc(0,0,40,Math.PI*2,0)
      path2.arc(200,100,40,Math.PI*2,0)
      ctx.fillStyle = 'green'
      ctx.fill(path2)
      this.canvas.addEventListener('click',function(e){
        const {clientX,clientY} = e
        console.log('path1',ctx.isPointInPath(path1,clientX,clientY))
        console.log('path2',ctx.isPointInPath(path2,clientX,clientY))
      })
    },
    init() {
      const ctx = this.ctx
          ctx.beginPath()
      ctx.fillStyle = 'red'
      ctx.rect(100,100,50,100)
      ctx.stroke()
      ctx.beginPath()
      ctx.arc(200,100,40,Math.PI*2,0)
      ctx.fillStyle = 'green'
      ctx.fill()
      this.canvas.addEventListener('click',function(e){
        const {clientX,clientY} = e
        const isPointInPath = ctx.isPointInPath(clientX,clientY)
        console.log('isPointInPath',isPointInPath)
      })
    },
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
