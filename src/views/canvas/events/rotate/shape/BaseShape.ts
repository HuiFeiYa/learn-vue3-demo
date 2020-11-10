import { Shape } from '../types/index'
export default class BaseShape {
  x!: number;
  y!: number;
  zIndex?: number;
  rotateDeg = 0
  // 旋转控制点距离边的距离
  rotateY= 80
  // 控制点的大小
  point = { w:20,h:20 }
  constructor(shape: Shape) {
    const { x,y,zIndex,rotateDeg } = shape
    this.x = x 
    this.y = y
    this.zIndex = zIndex
    this.rotateDeg = rotateDeg || 0
  }
}