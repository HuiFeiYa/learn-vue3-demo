import { RectShape,DobuleNumber,Shape,Directions,Direction } from '../types/index'
import BaseShape from './BaseShape'
import State from '../State'
export default class Rect extends BaseShape{
  w: number
  h: number
  shape: RectShape
  fillStyle: string;
  constructor(shape: RectShape,state: State,index: number){
    super(shape,state,index)
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
  get totalAngle() {
    const { initDeg,rotateDeg } = this.shape
    return initDeg + rotateDeg
  }
  get controlPointPosWidthText(): {pos: DobuleNumber;cursor: Direction}[]{
    const direction: Direction[] = [Directions.northWestern,Directions.northEstern,Directions.southEstern,Directions.southWest]
    const [cx,cy] = this.centerPosition
    const { totalAngle } = this
    return this.controlPointPos.map(([x,y],index)=>{
      const list: DobuleNumber = [x-cx,y-cy]
      return {
        // 旋转和非旋转的只有坐标不一样，其他都一样 
        pos: totalAngle?[x-cx,y-cy]:[x,y],
        cursor:direction[index]
      }
    })
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
    const { x, y, fillStyle, w, h } = this.shape
    const { totalAngle } = this
    const path = new Path2D()
    const isPointInPath = false
    if(totalAngle) {
      ctx.save()
      ctx.beginPath()
      ctx.translate(x+w/2,y+h/2)
      ctx.rotate(totalAngle)
      path.rect(-w/2, -h/2, w, h)
      ctx.fillStyle = fillStyle
      ctx.fill(path)
      // 当用户点击的时候判断是否点击到矩形位置,这里必须放在 restore 之前
      this.judgeIsPointInPath(ctx,path,Directions.move)
      ctx.restore()
    }else{
      ctx.beginPath()
      path.rect(x, y, w, h)
      ctx.fillStyle = fillStyle
      // 当用户点击的时候判断是否点击到矩形位置
      this.judgeIsPointInPath(ctx,path,Directions.move)
      ctx.fill(path)
    }
  }
  judgeIsPointInPath(ctx: CanvasRenderingContext2D,path: Path2D,direct: Direction){
    const {x,y} = this.state.mouseDown
    if(ctx.isPointInPath(path,x,y)){
      this.state.clickPositin = direct
      // 更新当前选中的图形序号
      this.state.updateIndex(this.index)
      this.state.isClick = true
    }
  }
  drawControls(ctx: CanvasRenderingContext2D) {
    // 如果未选中图形，则不绘制选择框
    // if(this.state.index === this.index && this.state.isClick) {}
    const { totalAngle } = this
    if(totalAngle) {
      ctx.save()
      ctx.beginPath()
      const [cx,cy] = this.centerPosition
      ctx.translate(cx,cy)
      ctx.rotate(totalAngle)
      const list: DobuleNumber[] = this.controlPointPos.map(item=>{
        const [x,y] = item
        return [x-cx,y-cy]
      })
      this.drawControlsPoint(this.controlPointPosWidthText,ctx)
      this.connectCtrolPoint(list,ctx)
      this.drawRotateControl(ctx)
      this.connectRotateControl(ctx)
      ctx.stroke()
      ctx.restore()
    }else{
      ctx.beginPath()
      this.drawControlsPoint(this.controlPointPosWidthText,ctx)
      this.connectCtrolPoint(this.controlPointPos,ctx)
      this.drawRotateControl(ctx)
      this.connectRotateControl(ctx)
    }
  }
  // 绘制控制点
  drawControlsPoint(list: {pos: DobuleNumber;cursor: Direction}[],ctx: CanvasRenderingContext2D) {
    const { w,h } = this.point
    list.forEach(({pos,cursor})=>{
      const [x,y] = pos
      const path = new Path2D()
      ctx.strokeStyle = 'blue'
      path.rect(x-w/2,y-h/2,w,h)
      this.judgeIsPointInPath(ctx,path,cursor)
      ctx.stroke(path)
    })
  }
  // 连接各个绘制点
  connectCtrolPoint(list: DobuleNumber[],ctx: CanvasRenderingContext2D) {
    const {w,h} = this.point
    list.forEach(([x,y],index)=>{
      if(index === 0) {
        ctx.beginPath()
        ctx.moveTo(x,y)
      }
      ctx.lineTo(x,y)
    })
    ctx.closePath()
    ctx.strokeStyle = 'blue'
    ctx.stroke()
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
    const { totalAngle } = this
    const [x,y] = this.rotateControlStart(this.referencePoint)
    const {w,h} = this.point
    const path = new Path2D()
    if(totalAngle){
      const [cx,cy] = this.centerPosition
      // 绘制旋转控制点
      path.rect(x-cx,y-cy,w,h) 
    }else{
      // 绘制旋转控制点
      path.rect(x,y,w,h) 
    }
    ctx.stroke(path)
    this.judgeIsPointInPath(ctx,path,Directions.crosshair)
  }
  connectRotateControl(ctx: CanvasRenderingContext2D) {
    const { totalAngle } = this
    const [x,y] = this.rotateControlCenter(this.referencePoint)
    const [cx,cy] = this.centerPosition
    ctx.beginPath()
    if(totalAngle) {
      ctx.moveTo(x-cx,y-cy)
      ctx.lineTo(x-cx,y+this.rotateY - cy)
    }else{
      const [x,y] = this.rotateControlCenter(this.referencePoint)
      ctx.moveTo(x,y)
      ctx.lineTo(x,y+this.rotateY)
    }
    ctx.stroke()
  }
}