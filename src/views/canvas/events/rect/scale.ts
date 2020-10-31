import { Shape, RectShape, CircleShape } from './scaleConfig'
const shapeList: Shape[] = [
  {
    type: 'rect',
    x: 50,
    y: 50,
    w: 100,
    h: 100,
    fillStyle: 'green',
    // 表示当前图形的层级，用于重叠时候判断哪个在上面
    zIndex: 0
  },
  {
    type: 'circle',
    x: 250,
    y: 100,
    r: 50,
    fillStyle: 'red',
    zIndex: 1
  }
]
let pathIndex = -1
let pointInPathList: Shape[] = []
const ctrolPoint = {
  w: 20,
  h: 20
}
let isDragging = false
class Canvas {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  imageData!: ImageData
  constructor(parent = document.body, width = 500, height = 500) {
    this.canvas = document.createElement('canvas')
    this.canvas.width = width
    this.canvas.height = height
    parent.appendChild(this.canvas)
    // ctx 可能是 null ,这里将他断言为 CanvasRenderingContext2D 类型
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
    // this.imageData = this.ctx!.getImageData(0, 0, width, height)
    this.canvas.addEventListener('click', e => {
      const { x, y } = this.windowLocToCanvas(e)
      this.judgeIsPointInPath(x, y)
      // 每次点击都重新绘制图像，如果点落在图像上，并且不处于拖拽状态就绘制控制框
      if (pathIndex !== -1) {
        if(!isDragging){
          this.drawControls()
        }
      }else{
        this.initDraw()
      }
    })
    this.getImageData()
  }
  initDraw() {
    const { ctx, imageData } = this
    // 将画面首次的图形重新填充到 canvas 上，由于后面绘制会产生很多 path ，但是在重置画面的时候不像绘制这些 path
    this.ctx.putImageData(imageData, 0, 0)
    for (const shape of shapeList) {
      this.drawShap(shape)
    }
  }
  getImageData() {
    this.imageData = this.ctx!.getImageData(0, 0, this.canvas.width, this.canvas.height)
  }
  // 绘制控制点
  drawControls() {
    
    const shape = shapeList[pathIndex]
    const { type, x, y } = shape
    const { ctx } = this
    const { w: pw, h: ph } = ctrolPoint
    if (shape.type === 'rect') {
      const { w, h } = shape
      // 矩形的四个点 (x- pw/2,y-ph/2) (x+w-pw/2,y-ph/2) (x+w-pw/2,y+h-ph/2)(x-pw/2,y+h-ph/2)
      this.drawFourPoint([
        [x - pw / 2, y - ph / 2],
        [x + w - pw / 2, y - ph / 2],
        [x + w - pw / 2, y + h - ph / 2],
        [x - pw / 2, y + h - ph / 2]
      ])
      this.connectFourPoint([x,y],[
        [x + w, y],
        [x + w, y + h],
        [x, y + h]
      ])
    } else {
      const { r } = shape
      // (x-r,y-r) (x+r,y-r) (x+r,y+r) (x-r,y+r)
      this.drawFourPoint([
        [x-r-pw/2,y-r-ph/2],
        [x+r-pw/2,y-r-ph/2],
        [x+r-pw/2,y+r-ph/2],
        [x-r-pw/2,y+r-ph/2]
      ])
      this.connectFourPoint([x-r,y-r],[
        [x+r,y-r],
        [x+r,y+r],
        [x-r,y+r]
      ])
    }
    isDragging = true
  }
  // 绘制四个点
  drawFourPoint(list: [number,number][]) {
    const ctx = this.ctx
    ctx.beginPath()
    const { w: pw, h: ph } = ctrolPoint
    list.forEach(([x,y])=>{
      ctx.rect(x,y,pw,ph)
    })
  }
  // 连线四个点
  connectFourPoint(start: [number,number],list: [number,number][]) {
    const ctx = this.ctx
    ctx.moveTo(start[0], start[1])
    list.forEach(([x,y])=>{
      ctx.lineTo(x,y)
    })
    ctx.closePath()
    ctx.strokeStyle = 'blue'
    ctx.stroke()
  }
  // 找出点击的图像
  judgeIsPointInPath(x: number, y: number) {
    console.log('isDragging',isDragging)
    if (isDragging) {
      if(this.ctx.isPointInPath(x,y)){
        console.log('点击中')
      }else{
        console.log('未点击中')
        isDragging = false
        pathIndex = -1
        pointInPathList = []
      }
    } else {
      this.findPath(x, y)
      return this.findCoverOne()
    }
  }
  findPath(x: number, y: number) {
    // 遍历图形列表，找出点所在的所有图形
    shapeList.forEach((ele, index) => {
      this.drawShap(ele)
      if (this.ctx.isPointInPath(x, y)) {
        // 给图像添加上在列表位置的标记
        ele.pathIndex = index
        pointInPathList.push(ele)
      }
    })
  }
  findCoverOne() {
    if (pointInPathList.length === 0) {
      pathIndex = -1
    } else {
      pointInPathList.sort((a, b) => b.zIndex - a.zIndex)
      pathIndex = pointInPathList[0].pathIndex as number
    }
  }
  windowLocToCanvas(e: MouseEvent) {
    const { clientX, clientY } = e
    const { top, left } = this.canvas.getBoundingClientRect()
    return {
      x: clientX - top,
      y: clientY - left
    }
  }
  // 绘制图像
  drawShap(shape: Shape) {
    const { ctx } = this
    const { type } = shape
    // 在 interface 中使用了字面量定义类型，判断的时候可以借助字面量判断
    if (shape.type === 'rect') {
      this.drawRect(shape)
    }
    if (shape.type === 'circle') {
      this.drawCircle(shape)
    }
  }
  drawRect(shape: RectShape) {
    const ctx = this!.ctx
    const { x, y, fillStyle, w, h } = shape
    ctx.beginPath()
    ctx.rect(x, y, w, h)
    ctx.fillStyle = fillStyle
    ctx.fill()
  }
  drawCircle(shape: CircleShape) {
    const { x, y, fillStyle, r } = shape
    const { ctx } = this
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fillStyle = fillStyle
    ctx.fill()
  }
}

const instance = new Canvas()

instance.initDraw()