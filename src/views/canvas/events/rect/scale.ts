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
class Canvas {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  imageData: ImageData
  constructor(parent = document.body, width = 500, height = 500) {
    this.canvas = document.createElement('canvas')
    this.canvas.width = width
    this.canvas.height = height
    parent.appendChild(this.canvas)
    // ctx 可能是 null ,这里将他断言为 CanvasRenderingContext2D 类型
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
    this.imageData = this.ctx!.getImageData(0, 0, width, height)
  }
  initDraw() {
    const { ctx, imageData } = this
    // 将画面首次的图形重新填充到 canvas 上，由于后面绘制会产生很多 path ，但是在重置画面的时候不像绘制这些 path
    ctx?.putImageData(imageData, 0, 0)
    for (const shape of shapeList) {
      this.drawShap(shape)
    }
  }
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
