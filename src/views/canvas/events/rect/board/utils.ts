
import { Shape,XYPosition,Direction,MouseDown,Boundary,Directions,CircleShape,RectShape,DobuleNumber } from './scaleConfig'
class BaseShape {
  x!: number;
  y!: number;
  fillStyle!: string;
  zIndex!: number;
  // 控制点的大小
  point = { w:20,h:20 }
  constructor(shape: Shape) {
    const { x,y,fillStyle,zIndex } = shape
    this.x = x 
    this.y = y
    this.fillStyle = fillStyle
    this.zIndex = zIndex
  }
  // 绘制控制点
  drawControlsPoint(list: DobuleNumber[],ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    const { w,h } = this.point
    list.forEach(([x,y])=>{
      ctx.rect(x-w/2,y-h/2,w,h)
    })
  }
  // 连接各个绘制点
  connectCtrolPoint(list: DobuleNumber[],ctx: CanvasRenderingContext2D) {
    const {w,h} = this.point
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
}
export class Circle extends BaseShape{
  r: number
  shape!: CircleShape
  constructor(shape: CircleShape){
    super(shape)
    const { r } = shape 
    this.r = r
    this.shape = shape
  }
  get controlPointPos(): DobuleNumber[]{
    const { r,x,y } = this
    return [
      [x-r,y-r],
      [x+r,y-r],
      [x+r,y+r],
      [x-r,y+r]
    ]
  }
  scale(state: State,loc: XYPosition) {
    // 通过矩形的两个对角计算出这个矩形的半径 r
    // 对角位置
    const { x:ax } = state.acrossCornersPoint
    // 取出x轴合理的范围，y轴按比例算。
    let x = 0
    if('minX' in state.boundary) {
      x = Math.max(state.boundary.minX,loc.x) 
    }
    if('maxX' in state.boundary) {
      x = Math.min(state.boundary.maxX,loc.x)
    }
    this.shape.r = Math.abs(x - ax) / 2
  }
  drawControls(ctx: CanvasRenderingContext2D) {
    this.drawControlsPoint(this.controlPointPos,ctx)
    this.connectCtrolPoint(this.controlPointPos,ctx)
  }
}

export class Rect extends BaseShape {
  w: number
  h: number
  shape: RectShape
  constructor(shape: RectShape){
    super(shape)
    const { w,h } = shape
    this.w = w
    this.h = h
    this.shape = shape
  }
  get controlPointPos(): DobuleNumber[]{
    const {w,h,x,y} = this
    return [
      [x,y],[x+w,y],[x+w,y+h],[x,y+h]
    ]
  }
  scale(state: State,loc: XYPosition) {
    const { x:ax,y:ay } = state.acrossCornersPoint
    const shape = this.shape
    let x = 0
    if('minX' in state.boundary) {
      x = Math.max(state.boundary.minX,loc.x) 
    }
    if('maxX' in state.boundary) {
      x = Math.min(state.boundary.maxX,loc.x)
    }
    // 当前矩形的宽度
    const width = Math.abs(x - ax) 
    const diffW = width - shape.w
    // 按中心点扩大，思路就是将增长平均分到原先 x,y 的两侧
    shape.x = shape.x - diffW/2
    shape.y = shape.y - diffW/2
    shape.w = width 
    shape.h = width 
  }
  drawControls(ctx: CanvasRenderingContext2D) {
    this.drawControlsPoint(this.controlPointPos,ctx)
    this.connectCtrolPoint(this.controlPointPos,ctx)
  }
}
export class State {
  // 当前选中第几个元素
  index = -1
  shapeList: Shape[] = []
  mouseDown!: MouseDown
  // 点击控制点的对角
  acrossCornersPoint!: XYPosition
  cursorPointer: Direction = 'default'
  // 是否触发 mousemove 事件，只有mousedown 后才会触发
  canMove=false
  boundary: Boundary = {
    minX:0,
    minY:0
  }
  constructor(shapeList: Shape[]){
    this.shapeList = shapeList
  }
  get isControlSize() {
    return this.cursorPointer !== 'default'
  }
  get currentShape() {
    return this.shapeList[this.index]
  }
  add(shape: Shape) {
    this.shapeList.push(shape)
  }
  select(index: number){
    this.index = index
  }
  updateMouseDown(pos: MouseDown){
    this.mouseDown = pos
  }
  updateCursorPointer(cursorPointer: Direction) {
    this.cursorPointer = cursorPointer
  }
  updateMoveStatus(canMove: boolean){
    this.canMove = canMove
  }
  updateAcrossCornersPoint(point: XYPosition){
    this.acrossCornersPoint = point
  }
  getBoundary() {
    // 判断当前角属于哪个角
    switch (this.cursorPointer) {
      // 如果当前控制点是西北角，那么对角的坐标就是 maxX 和 maxY
      case Directions.northWestern:
        this.boundary = {
          maxX:this.acrossCornersPoint.x,
          maxY:this.acrossCornersPoint.y
        }
        break;
      case Directions.northEstern:
        this.boundary = {
          minX:this.acrossCornersPoint.x,
          maxY:this.acrossCornersPoint.y
        }
        break;
      case Directions.southEstern:
        this.boundary = {
          minX:this.acrossCornersPoint.x,
          minY:this.acrossCornersPoint.y
        }
        break;
      case Directions.southWest:
        this.boundary = {
          maxX:this.acrossCornersPoint.x,
          minY:this.acrossCornersPoint.y
        }
        break;
    }
  }
}