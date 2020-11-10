import { RectShape,DobuleNumber,Shape } from '../types/index'
import BaseShape from './BaseShape'
import State from '../State'
export default class Rect extends BaseShape{
  w: number
  h: number
  shape: RectShape
  fillStyle: string;
  constructor(shape: RectShape,state: State){
    super(shape,state)
    const { w,h,fillStyle } = shape
    this.w = w
    this.h = h
    this.shape = shape
    this.fillStyle = fillStyle
  }
  get controlPointPos(): DobuleNumber[]{
    const {w,h,x,y} = this
    return [
      [x,y],[x+w,y],[x+w,y+h],[x,y+h]
    ]
  }
  get centerPosition(): DobuleNumber{
    const { x,y,w,h } = this
    return [(x*2 +w)/2,(y*2+h)/ 2]
  }
  // 找到旋转轴和 topL 、topR 的连线
  get referencePoint(): DobuleNumber {
    const [cx,cy] = this.centerPosition
    return [cx,cy-this.h/2]
  }
  drawShape(ctx: CanvasRenderingContext2D) {
    const { x, y, fillStyle, w, h,rotateDeg } = this.shape
    const path = new Path2D()
    if(rotateDeg) {
      ctx.save()
      ctx.beginPath()
      ctx.translate(x+w/2,y+h/2)
      ctx.rotate(rotateDeg*Math.PI/180)
      path.rect(-w/2, -h/2, w, h)
      ctx.fillStyle = fillStyle
      ctx.fill(path)
      ctx.restore()
    }else{
      ctx.beginPath()
      path.rect(x, y, w, h)
      ctx.fillStyle = fillStyle
      ctx.fill(path)
    }
  }
  drawControls(ctx: CanvasRenderingContext2D) {
    const { rotateDeg } = this.shape
    if(rotateDeg) {
      ctx.save()
      ctx.beginPath()
      const [cx,cy] = this.centerPosition
      ctx.translate(cx,cy)
      ctx.rotate(rotateDeg * Math.PI / 180)
      const list: DobuleNumber[] = this.controlPointPos.map(item=>{
        const [x,y] = item
        return [x-cx,y-cy]
      })
      this.drawControlsPoint(list,ctx)
      this.connectCtrolPoint(list,ctx)
      this.drawRotateControl(ctx)
      this.connectRotateControl(ctx)
      ctx.stroke()
      ctx.restore()
    }else{
      ctx.save()
      ctx.beginPath()
      this.drawControlsPoint(this.controlPointPos,ctx)
      this.connectCtrolPoint(this.controlPointPos,ctx)
      this.drawRotateControl(ctx)
      this.connectRotateControl(ctx)
      ctx.stroke()
    }
  }
  // 绘制控制点
  drawControlsPoint(list: DobuleNumber[],ctx: CanvasRenderingContext2D) {
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
  }
  rotateControlStart(pos: DobuleNumber) {
    const [cx,cy] = pos
    const { w,h } = this.point
    return [cx-w/2,cy-h/2-this.rotateY]
  }
  rotateControlCenter(pos: DobuleNumber) {
    const [cx,cy] = pos
    return [cx,cy - this.rotateY]
  }
  drawRotateControl(ctx: CanvasRenderingContext2D) {
    const { rotateDeg } = this.shape
    const [x,y] = this.rotateControlStart(this.referencePoint)
    const {w,h} = this.point
    if(rotateDeg){
      const [cx,cy] = this.centerPosition
      // 绘制旋转控制点
      ctx.rect(x-cx,y-cy,w,h) 
    }else{
      // 绘制旋转控制点
      ctx.rect(x,y,w,h) 
    }
  }
  connectRotateControl(ctx: CanvasRenderingContext2D) {
    const { rotateDeg } = this.shape
    const [x,y] = this.rotateControlCenter(this.referencePoint)
    const [cx,cy] = this.centerPosition
    if(rotateDeg) {
      ctx.moveTo(x-cx,y-cy)
      ctx.lineTo(x-cx,y+this.rotateY - cy)
    }else{
      const [x,y] = this.rotateControlCenter(this.referencePoint)
      ctx.moveTo(x,y)
      ctx.lineTo(x,y+this.rotateY)
    }
  }
}