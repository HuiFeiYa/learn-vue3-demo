import State from './State'
import {Rect,Circle} from './shape/index'
import { Shape, MouseDown, XYPosition } from './types/index';
export default class Canvas{
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  imageData!: ImageData
  state: State
  constructor(state: State,parent = document.body, width = 1000, height = 1000) {
    this.canvas = document.createElement('canvas')
    this.canvas.width = width
    this.canvas.height = height
    this.state = state
    parent.appendChild(this.canvas)
    // ctx 可能是 null ,这里将他断言为 CanvasRenderingContext2D 类型
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
    this.getImageData()
    this.listen()
    // 开始设定选中第一个图形测试用
    this.state.updateIndex(0)
  }
  // 存储初始化的 canvas 图像
  getImageData() {
    this.imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height)
  }
  listen() {
    this.mouseDown()
    this.mouseMove()
    this.mouseUp()
  }
  mouseDown() {
    const canvas = this.canvas
    canvas.addEventListener('mousedown',e=>{
      const {x,y} = this.windowLocToCanvas(e)
      this.state.mouseDown = {x,y}
      // 点击的时候重新绘制图形判断点击点落在哪里
      this.state.isClick = true
      this.initDraw()
    })
  }
  mouseMove() {
    const canvas = this.canvas
    canvas.addEventListener('mousemove',e=>{
      const loc = this.windowLocToCanvas(e)
      const { isRotating,mouseDown:{ x, y } } = this.state
      // 判断当前物体是否处于旋转控制点
      if(isRotating) {
        this.calcRotateAngle(loc)
      }
    })
  }
  calcRotateAngle(loc: XYPosition){
    const { mouseDown:{x:mx,y:my} } = this.state
    const shape = this.state.currentShape
    const [cx,cy] = this.adaptShape(shape,this.state.index).centerPosition
    const { x,y } = loc
    const initDeg = Math.atan2(my-cy,mx-cx)
    const currentDeg = Math.atan2(y-cy,x-cx)
    this.state.updateAngle(currentDeg-initDeg)
    this.initDraw()
  }
  mouseUp() {
    const canvas = this.canvas
    canvas.addEventListener('mouseup',e=>{
      const loc = this.windowLocToCanvas(e)
      // 重置 clickPosition 的位置，当mousedown点击控制点的时候会去更新位置，其他时候默认为 default 
      this.state.clickPositin = 'default'
      if(this.state.isSelectShape){
        // 更新角度
        const { initDeg,rotateDeg } = this.state.currentShape
        this.state.currentShape.initDeg += rotateDeg
        this.state.currentShape.rotateDeg = 0
      }
    })
  }
  adaptShape(shape: Shape,index: number) {
    // if(shape.type === 'rect'){
      return new Rect(shape,this.state,index)
    // }else{
    //   return new Circle(shape)
    // }
  }
  windowLocToCanvas(e: MouseEvent) {
    const { clientX, clientY } = e
    const { top, left } = this.canvas.getBoundingClientRect()
    return {
      x: clientX - top,
      y: clientY - left
    }
  }
  initDraw() {
    const { ctx, imageData } = this
    // 将画面首次的图形重新填充到 canvas 上，由于后面绘制会产生很多 path ，但是在重置画面的时候不像绘制这些 path
    this.ctx.putImageData(imageData, 0, 0)
    for (const [index,shape] of this.state.shapeList.entries()) {
      this.adaptShape(shape,index).drawShape(ctx)
      this.adaptShape(shape,index).drawControls(ctx)
    }
  }
}
