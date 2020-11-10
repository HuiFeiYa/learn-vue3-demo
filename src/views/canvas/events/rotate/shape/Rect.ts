import { RectShape } from '../types/index'
import BaseShape from './BaseShape'
export default class Rect extends BaseShape{
  w: number
  h: number
  shape: RectShape
  fillStyle: string;
  constructor(shape: RectShape){
    super(shape)
    const { w,h,fillStyle } = shape
    this.w = w
    this.h = h
    this.shape = shape
    this.fillStyle = fillStyle
  }
  drawShape(ctx: CanvasRenderingContext2D) {
    const { x, y, fillStyle, w, h,rotateDeg } = this.shape
    if(rotateDeg) {
      ctx.save()
      ctx.beginPath()
      ctx.translate(x+w/2,y+h/2)
      ctx.rotate(rotateDeg*Math.PI/180)
      ctx.rect(-w/2, -h/2, w, h)
      ctx.fillStyle = fillStyle
      ctx.fill()
      ctx.restore()
    }else{
      ctx.beginPath()
      ctx.rect(x, y, w, h)
      ctx.fillStyle = fillStyle
      ctx.fill()
    }
  }
}