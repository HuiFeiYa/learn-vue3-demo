import { CircleShape } from '../types/index'
import BaseShape from './BaseShape'
export default class Circle extends BaseShape{
  r: number
  shape!: CircleShape
  fillStyle: string;
  constructor(shape: CircleShape){
    super(shape)
    const { r, fillStyle } = shape 
    this.r = r
    this.shape = shape
    this.fillStyle = fillStyle
  }
  drawShape(ctx: CanvasRenderingContext2D) {
    const { x, y, fillStyle, r } = this.shape
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fillStyle = fillStyle
    ctx.fill()
  }
  drawControls(ctx: CanvasRenderingContext2D) {
    const { x, y, fillStyle, r } = this.shape 
  }
}