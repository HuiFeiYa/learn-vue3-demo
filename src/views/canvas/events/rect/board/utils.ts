
import { Shape,XYPosition,Direction,MouseDown,Boundary,Directions,CircleShape,RectShape,DobuleNumber } from './scaleConfig'
export class BaseShape {
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
  // 绘制控制点
  drawControlsPoint(list: DobuleNumber[],ctx: CanvasRenderingContext2D) {
    // ctx.beginPath()
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
    // ctx.stroke()
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
}
export class Circle extends BaseShape{
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
  // 按照(topL,topR,bottomR,bottomL) 的顺序返回
  get controlPointPos(): DobuleNumber[]{
    const { r,x,y } = this
    return [
      [x-r,y-r],
      [x+r,y-r],
      [x+r,y+r],
      [x-r,y+r]
    ]
  }
  get centerPosition() {
    const {x,y} = this
    return [x,y]
  }
  get referencePoint(): DobuleNumber {
    const [cx,cy] = this.centerPosition
    return [cx,cy-this.r]
  }
  scale(state: State,loc: XYPosition) {
    // 通过矩形的两个对角计算出这个矩形的半径 r
    // 对角位置
    const { x:ax } = state.acrossCornersPoint
    // 取出x轴合理的范围，y轴按比例算。
    let x = 0
    if('minX' in state.boundary) {
      x = Math.max(state.boundary.minX,loc.x) 
    }
    if('maxX' in state.boundary) {
      x = Math.min(state.boundary.maxX,loc.x)
    }
    this.shape.r = Math.abs(x - ax) / 2
  }
  drawControls(ctx: CanvasRenderingContext2D) {


    this.drawControlsPoint(this.controlPointPos,ctx)
    this.connectCtrolPoint(this.controlPointPos,ctx)
    this.drawRotateControl(ctx)
    this.connectRotateControl(ctx)

  }
  drawRotateControl(ctx: CanvasRenderingContext2D) {
    const [x,y] = this.rotateControlStart(this.referencePoint)
    const {w,h} = this.point
    // 绘制旋转控制点
    ctx.rect(x,y,w,h) 
  }
  connectRotateControl(ctx: CanvasRenderingContext2D) {
    const [x,y] = this.rotateControlCenter(this.referencePoint)
    ctx.moveTo(x,y)
    ctx.lineTo(x,y+this.rotateY)
  }
  drawShape(ctx: CanvasRenderingContext2D) {
    const { x, y, fillStyle, r } = this.shape
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fillStyle = fillStyle
    ctx.fill()
  }
}

export class Rect extends BaseShape {
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
  get controlPointPos(): DobuleNumber[]{
    const {w,h,x,y} = this
    const { rotateDeg } = this.shape
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
  scale(state: State,loc: XYPosition) {
    const { x:ax,y:ay } = state.acrossCornersPoint
    const shape = this.shape
    let x = 0
    if('minX' in state.boundary) {
      x = Math.max(state.boundary.minX,loc.x) 
    }
    if('maxX' in state.boundary) {
      x = Math.min(state.boundary.maxX,loc.x)
    }
    // 当前矩形的宽度
    const width = Math.abs(x - ax) 
    const diffW = width - shape.w
    // 按中心点扩大，思路就是将增长平均分到原先 x,y 的两侧
    shape.x = shape.x - diffW/2
    shape.y = shape.y - diffW/2
    shape.w = width 
    shape.h = width 
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
export class State {
  // 当前选中第几个元素
  index = -1
  shapeList: Shape[] = []
  mouseDown!: MouseDown
  // 点击控制点的对角
  acrossCornersPoint!: XYPosition
  cursorPointer: Direction = 'default'
  // 是否触发 mousemove 事件，只有mousedown 后才会触发
  canMove=false
  boundary: Boundary = {
    minX:0,
    minY:0
  }
  pointerInPathList: Shape[] = []
  constructor(shapeList: Shape[]){
    this.shapeList = shapeList
  }
  get isInControl() {
    return this.cursorPointer !== 'default'
  }
  get currentShape() {
    return this.shapeList[this.index]
  }
  get isRotate() {
    return this.cursorPointer === Directions.crosshair
  }
  add(shape: Shape) {
    this.shapeList.push(shape)
  }
  select(index: number){
    this.index = index
  }
  resetPointerInPathList() {
    this.pointerInPathList = []
  }
  pushPointerInPathList(ele: Shape){
    this.pointerInPathList.push(ele)
  }
  // 判断点击落在哪个控制点上，找到对应的 cursor
  judegeDraggingPosition(loc: XYPosition,ele: Rect | Circle){
    const fourPoint = ele.controlPointPos
    const {x,y} = loc
    const isInRectLeftTop = x > fourPoint[0][0] && y>fourPoint[0][1]  
    const isInRectRightTop = x < fourPoint[1][0] && y> fourPoint[1][1]
    const isInRectRightBottom = x < fourPoint[2][0] && y< fourPoint[2][1]
    const isInRectLeftBottom = x> fourPoint[3][0] && y< fourPoint[3][1]
    const { w,h } = ele.point
    const rotateY = ele.rotateY
    // 获取旋转点的参考,是中线点，
    const [referX,referY] = ele.referencePoint
    // 判断当前点击点是否在四个控制点中
    const pointerMap: {isIn: boolean;pointer: Direction}[]= [
      {
        isIn:x < fourPoint[0][0] && y<(fourPoint[0][1]+h/2) && y>(fourPoint[0][1]-h/2)|| y<fourPoint[0][1] && x< (fourPoint[0][0] + w/2)   ,
        pointer:Directions.northWestern
      },
      {
        isIn:x > fourPoint[1][0] && y<(fourPoint[1][1]+h/2) || y<fourPoint[1][1] && x > (fourPoint[1][0] - w/2),
        pointer:Directions.northEstern
      },
      {
        isIn:x > fourPoint[2][0] && y>(fourPoint[2][1]-h/2) || y>fourPoint[2][1] && x> (fourPoint[2][0] - w/2),
        pointer:Directions.southEstern
      },
      {
        isIn:x < fourPoint[3][0] && y>(fourPoint[3][1]-h/2) || y>fourPoint[3][1] && x< (fourPoint[0][0] + w/2),
        pointer:Directions.southWest
      },
      {
        // 由于是中心点要处理
        isIn:x>(referX-w/2) && x < (referX+w/2) && y>(referY-h/2-rotateY) && y<(referY - rotateY+h/2),
        pointer:Directions.crosshair
      }
    ]
    for(const item of pointerMap){
      const { isIn,pointer } = item
      if(isIn) {
        this.updateCursorPointer(pointer)
        break
      }
    }
    return isInRectLeftTop && isInRectRightTop && isInRectRightBottom && isInRectLeftBottom
  }
  updateMouseDown(loc: XYPosition){
    const {x,y} = this.shapeList[this.index]
    // 计算点击点距离初始时的 x,y 的距离，用于后面根据 x,y 来计算位置用
    this.mouseDown = { diffX:loc.x - x,diffY:loc.y-y,x:loc.x,y:loc.y }
  }
  updateCursorPointer(cursorPointer: Direction) {
    this.cursorPointer = cursorPointer
  }
  updateMoveStatus(canMove: boolean){
    this.canMove = canMove
  }
  updateAcrossCornersPoint(point: XYPosition){
    this.acrossCornersPoint = point
  }
  findReferencePoint(ele: Rect | Circle){
      // 矩形的顺序从左上逆时针旋转
      const indexMap = {
        [Directions.northWestern]:0,
        [Directions.northEstern]:1,
        [Directions.southEstern]:2,
        [Directions.southWest]:3,
        [Directions.crosshair]:-2,
        'default':-1
      }
      let referencePoint
      // 找到该图形的四个点
      const fourPoint = ele.controlPointPos
      // 找到当前点击的控制点，参照点是这个点的对角
      const index = indexMap[this.cursorPointer]
      if(index === -2){
        this.updateCursorPointer(Directions.crosshair)
        return 
      }
      if(index !== -1){
        referencePoint = fourPoint[index]
        // 对角的坐标，由于是四边形所以相隔两个位置
        const acrossCornersIndex = (index + 2) % 4
        const acrossCorners = fourPoint[acrossCornersIndex]
        this.updateAcrossCornersPoint({
          x:acrossCorners[0],
          y:acrossCorners[1]
        })
      }else{
        console.error('未找到控制点')
      }
  }
  getBoundary() {
    // 判断当前角属于哪个角
    switch (this.cursorPointer) {
      // 如果当前控制点是西北角，那么对角的坐标就是 maxX 和 maxY
      case Directions.northWestern:
        this.boundary = {
          maxX:this.acrossCornersPoint.x,
          maxY:this.acrossCornersPoint.y
        }
        break;
      case Directions.northEstern:
        this.boundary = {
          minX:this.acrossCornersPoint.x,
          maxY:this.acrossCornersPoint.y
        }
        break;
      case Directions.southEstern:
        this.boundary = {
          minX:this.acrossCornersPoint.x,
          minY:this.acrossCornersPoint.y
        }
        break;
      case Directions.southWest:
        this.boundary = {
          maxX:this.acrossCornersPoint.x,
          minY:this.acrossCornersPoint.y
        }
        break;
    }
  }
}