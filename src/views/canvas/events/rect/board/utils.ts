
import { Shape,XYPosition,Direction,MouseDown,Boundary,Directions,CircleShape,RectShape } from './scaleConfig'
class BaseShape {
  x!: number;
  y!: number;
  fillStyle!: string;
  zIndex!: number;
  constructor(shape: Shape) {
    const { x,y,fillStyle,zIndex } = shape
    this.x = x 
    this.y = y
    this.fillStyle = fillStyle
    this.zIndex = zIndex
  }
}
export class Circle extends BaseShape{
  r: number
  constructor(shape: CircleShape){
    super(shape)
    const { r } = shape 
    this.r = r
  }
  getControlPointPos(): [number,number][]{
    const { r,x,y } = this
    return [
      [x-r,y-r],
      [x+r,y-r],
      [x+r,y+r],
      [x-r,y+r]
    ]
  }
}

export class Rect extends BaseShape {
  w: number
  h: number
  constructor(shape: RectShape){
    super(shape)
    const { w,h } = shape
    this.w = w
    this.h = h
  }
  getControlPointPos(): [number,number][]{
    const {w,h,x,y} = this
    return [
      [x,y],[x+w,y],[x+w,y+h],[x,y+h]
    ]
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
  // 控制点的大小
  point = { w:20,h:20 }
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