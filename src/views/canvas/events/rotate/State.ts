import { Shape,XYPosition,Direction,MouseDown,Boundary,Directions,CircleShape,RectShape,DobuleNumber } from './types/index'
export default class State {
    // 当前选中第几个元素
    index = -1
    shapeList: Shape[] = []
    mouseDown!: MouseDown
    // 是否触发 mousemove 事件，只有mousedown 后才会触发
    canMove=false
    constructor(shapeList: Shape[]){
      this.shapeList = shapeList
    }
    updateShapePath(shapePath: CanvasPath) {
      const index = this.index
      if(index === -1) {
        console.error('updateShapePath时未找到指定图形')
      }
      this.shapeList[index].shapePath = shapePath
    }
    updateControlPathList(controlPathList: CanvasPath[]){
      const index = this.index
      if(index === -1) {
        console.error('updateControlPathList时未找到指定图形')
      }
      this.shapeList[index].controlPathList = controlPathList
    }
}
// shapePath controlPathList