
import { Shape,XYPosition,Direction } from './scaleConfig'
class BaseShape {
  x!: number;
  y!: number;
  fillStyle!: string;
  zIndex!: number;
  constructor(shape: {[words: string]: any}) {
    const { x,y,fillStyle,zIndex } = shape
    this.x = x 
    this.y = y
    this.fillStyle = fillStyle
    this.zIndex = zIndex
  }
}
class Circle extends BaseShape{
  r: number
  constructor(shape: {[words: string]: any}){
    super(shape)
    const { r } = shape 
    this.r = r
  }
  // dragPointUpdate() {
    
  // }
}

export class State {
  // 当前选中第几个元素
  index = -1
  shapeList: Shape[] = []
  mouseDown!: XYPosition
  // 点击控制点的对角
  acrossCornersPoint!: XYPosition
  cursorPointer: Direction = 'default'
  constructor(shapeList: Shape[]){
    this.shapeList = shapeList
  }
  add(shape: Shape) {
    this.shapeList.push(shape)
  }
  select(index: number){
    this.index = index
  }
  updateMouseDown(pos: XYPosition){
    this.mouseDown = pos
  }
}