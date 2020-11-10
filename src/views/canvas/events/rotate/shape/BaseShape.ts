import { Shape } from '../types/index'
import State from '../State'
export default class BaseShape {
  x!: number;
  y!: number;
  zIndex?: number;
  rotateDeg = 0
  // 旋转控制点距离边的距离
  rotateY= 80
  // 控制点的大小
  point = { w:20,h:20 }
  state: State
  constructor(shape: Shape,state: State) {
    const { x,y,zIndex,rotateDeg } = shape
    this.x = x 
    this.y = y
    this.zIndex = zIndex
    this.rotateDeg = rotateDeg || 0
    this.state = state
  }
}