import { BaseShape } from '../rect/board/utils';
import { Shape } from '../rect/board/scaleConfig'
class Canvas {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  constructor(width=500,height=500,parent=document.body){
    this.canvas = document.createElement('canvas')
    this.canvas.width = width
    this.canvas.height = height
    parent.appendChild(this.canvas)
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
  }

}
new Canvas()

class Img extends BaseShape{
  constructor(shape: Shape){
    super(shape)
  }
}

const img: Shape= {
  x:150,
  y:50,
  centerX:190,
  centerY:105,
  w:80,
  h:110,
  zIndex:0,
  type:'rect',
  fillStyle:'none'
}
new Img(img)