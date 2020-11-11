import { Shape, XYPosition, Direction, MouseDown, Boundary, Directions, CircleShape, RectShape, DobuleNumber } from './types/index';
export default class State {
    // 当前选中第几个元素
    index = -1
    shapeList: Shape[] = []
    // 是否触发 mousemove 事件，只有mousedown 后才会触发
    canMove=false
    // 用于判断是否点击了矩形,或者点击了控制点
    isClick=false
    clickPositin: Direction
    mouseDown: XYPosition
    constructor(shapeList: Shape[]){
      this.shapeList = shapeList
      this.clickPositin = 'default'
      this.mouseDown = { x:0,y:0 }
    }
    get currentShape() {
      return this.shapeList[this.index]
    }
    get isRotating() {
      return this.clickPositin === Directions.crosshair
    }
    // 当点击矩形的时候会更新选中的图形序号，可以通过序号是否存在判断是否选中图形
    get isSelectShape() {
      return this.index !== -1
    }
    updateShapePath(shapePath: Path2D) {
      const index = this.index
      if(index === -1) {
        console.error('updateShapePath时未找到指定图形')
      }
      this.shapeList[index].shapePath = shapePath
    }
    updateControlPathList(controlPathList: Path2D[]){
      const index = this.index
      if(index === -1) {
        console.error('updateControlPathList时未找到指定图形')
      }
      this.shapeList[index].controlPathList = controlPathList
    }
    updateIndex(index: number){
      this.index = index 
    }
    // 每次move的时候都会执行该函数，如果使用 this.shapeList[this.index].rotateDeg 作为基础值，该值本身随时改变，而且移动1度都会执行累加角度操作，会导致角度错误
    // 这里将默认角度都设置为0，这样不会出现该情况
    updateAngle(angle: number){
      this.shapeList[this.index].rotateDeg = angle 
    }
}
// shapePath controlPathList