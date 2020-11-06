import { BaseShape } from '../rect/board/utils';
import { ImageShape } from '../rect/board/scaleConfig'
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

class Img extends BaseShape{
  shape: ImageShape
  constructor(shape: ImageShape){
    super(shape)
    this.shape = shape
  }
  drawShape(ctx: CanvasRenderingContext2D){
    const {x,y,w,h,src} = this.shape
    const img = new Image()
    img.src = src
    img.onload = function (e) {
      ctx.drawImage(img,x,y,w,h)
    }
  }
}

const img: ImageShape= {
  x:150,
  y:50,
  centerX:190,
  centerY:105,
  w:80,
  h:110,
  zIndex:0,
  type:'image',
  src:'../img/foot1.png'
}
const imgInstance = new Img(img)
const canvasInstance = new Canvas()
