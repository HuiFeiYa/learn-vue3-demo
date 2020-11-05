import { Shape, RectShape, CircleShape,Direction,Directions,DobuleNumber } from './scaleConfig'
import { State,Circle,Rect } from './utils'

const shapeList: Shape[] = [
  {
    type: 'rect',
    x: 50,
    y: 50,
    w: 100,
    h: 100,
    fillStyle: 'green',
    // 表示当前图形的层级，用于重叠时候判断哪个在上面
    zIndex: 0
  },
  {
    type: 'circle',
    x: 250,
    y: 100,
    r: 50,
    fillStyle: 'red',
    zIndex: 1
  }
]
const state = new State(shapeList)
let pointInPathList: Shape[] = []

class Canvas {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  imageData!: ImageData
  // pointInPathList: Shape[] = []
  constructor(parent = document.body, width = 1000, height = 1000) {
    this.canvas = document.createElement('canvas')
    this.canvas.width = width
    this.canvas.height = height
    parent.appendChild(this.canvas)
    // ctx 可能是 null ,这里将他断言为 CanvasRenderingContext2D 类型
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
    this.getImageData()
    this.listen()
  }
  // 返回是否存在选中的图形
  get hasPathIndex() {
    return state.index !== -1
  }
  // 暴露出选中的图形示例，每个示例上拥有的方法相同，统一输出的接口,
  get adaptSelectedShape() {
    // state.currentShape 只和index有关系，如果想更新选中的图形通过去更新 index 来实现
    const shape = state.currentShape
    if(shape.type === 'rect'){
      return new Rect(shape)
    }else{
      return new Circle(shape)
    }
  }

  initDraw() {
    const { ctx, imageData } = this
    // 将画面首次的图形重新填充到 canvas 上，由于后面绘制会产生很多 path ，但是在重置画面的时候不像绘制这些 path
    this.ctx.putImageData(imageData, 0, 0)
    for (const [index,shape] of shapeList.entries()) {
      this.adaptShapeManual(shape).drawShape(ctx)
    }
  }
  adaptShapeManual(shape: Shape) {
      if(shape.type === 'rect'){
        return new Rect(shape)
      }else{
        return new Circle(shape)
      }
  }
  // 存储初始化的 canvas 图像
  getImageData() {
    this.imageData = this.ctx!.getImageData(0, 0, this.canvas.width, this.canvas.height)
  }
  /***** 添加事件监听 */
  listen() {
    this.mouseDown()
    this.mouseMove()
    this.mouseUp()
  }
  /****   事件添加       */
  mouseDown() {
    const canvas = this.canvas
    canvas.addEventListener('mousedown',e=>{
      // 将之前选中图形的序号保留
      const oldIndex = state.index
      const { x, y } = this.windowLocToCanvas(e)
      // 重新判断当前选中的图形
      this.judgeIsPointInPath(x, y)
      // 选中图形，并且和之前绘制的图形不同就绘制控制框
      if (state.index !== -1 && oldIndex !== state.index) {
        this.adaptSelectedShape.drawControls(this.ctx)
      }

      /**
       * 在拖拽状态下通过鼠标位置来判断是拖动还是缩放
       * 1. 如果不在四个控制点上就是拖拽
       * 2. 如果在四个控制点上就是缩放
       */
      if(this.hasPathIndex) {
        const {x,y} = shapeList[state.index]
        const loc = this.windowLocToCanvas(e)
        // 计算拖动点距离中心点的距离，这样当 onmousemove 事件触发的时候要去通过这个来计算当前的中心点在哪里。
        state.updateMouseDown({ diffX:loc.x - x,diffY:loc.y-y,x:loc.x,y:loc.y })
        const isInRect = this.draggingPosition(loc)
        // 当点击了矩形选择框将 canMove 标记为 true
        if(isInRect) {
          canvas.style.cursor = 'move'
        }else{
          canvas.style.cursor = state.cursorPointer
           // 找到控制点的对角，记录下它的位置，保存在 acrossCornersPoint 变量中。根据这个坐标来生成鼠标移动的界限
          this.findReferencePoint()
          // 找到鼠标移动的边界值,保存在 boundary 变量中
          state.getBoundary()
        }
        state.updateMoveStatus(true)
      }else{
        canvas.style.cursor = 'default'
      }
    })
  }
  mouseMove() {
    const canvas = this.canvas
    canvas.addEventListener('mousemove',e =>{
      // 选中移动的图形，此时显示了控制框，接下来要判断的是点击位置落在控制点上还是图形上
      if(this.hasPathIndex && state.canMove && !state.isControlSize) {
        const loc = this.windowLocToCanvas(e)
        const isInRect = this.draggingPosition(loc)
        // 移动物体
        if(isInRect) {
          this.moveShape(e)
        }
      }
      if(this.hasPathIndex && state.isControlSize) {
        // 缩放物体
        this.scaleShape(e)
      }
    })
  }
  mouseUp() {
    const canvas = this.canvas
    window.addEventListener('mouseup',e=>{
      // 鼠标抬起后，只需要将 canMove 设置为 false ，只有当 canvas 只触发了 mousemove，在此之前未触发 mousedown 选中图形是不会跟随的。
      state.updateMoveStatus(false)
      state.updateCursorPointer('default')
      canvas.style.cursor = state.cursorPointer
      // 将公共逻辑抽离出来后可以多处使用
      this.drawSelectInTheEnd()
    })
  }
  moveShape(e: MouseEvent) {
    // 函数功能单一原则，将函数中做的三件事情分别抽离了三个函数
    this.calcXYPosition(e)
    this.initDraw()
    this.drawSelectInTheEnd()
  }
  drawSelectInTheEnd() {
      // 由于 initDraw 绘制的时候是按 shapeList 中图形的排序来绘制的，后面绘制的层级会高于前面绘制的，显示在其上，为了让选中的显示在最上面，这里将选中的重新绘制一遍
    // onmouseup 中同理 
    if(this.hasPathIndex) {
      this.adaptSelectedShape.drawShape(this.ctx)
      this.adaptSelectedShape.drawControls(this.ctx)
    }
  }
  calcXYPosition(e: MouseEvent) {
    const {x,y} = this.windowLocToCanvas(e)
    const { diffX,diffY } = state.mouseDown
    const shape = shapeList[state.index]
    shape.x = x - diffX 
    shape.y = y - diffY
  }
  /*** 图形的缩放操作 */
  scaleShape(e: MouseEvent) {
    this.update(e)
  }
  findReferencePoint() {
    // 矩形的顺序从左上逆时针旋转
    const indexMap = {
      [Directions.northWestern]:0,
      [Directions.northEstern]:1,
      [Directions.southEstern]:2,
      [Directions.southWest]:3,
      'default':-1
    }
    let referencePoint
    // 找到该图形的四个点
    const fourPoint = this.adaptSelectedShape.controlPointPos
    // 找到当前点击的控制点，参照点是这个点的对角
    const index = indexMap[state.cursorPointer]
    
    if(index !== -1){
      referencePoint = fourPoint[index]
      // 对角的坐标，由于是四边形所以相隔两个位置
      const acrossCornersIndex = (index + 2) % 4
      const acrossCorners = fourPoint[acrossCornersIndex]
      state.updateAcrossCornersPoint({
        x:acrossCorners[0],
        y:acrossCorners[1]
      })
    }else{
      console.error('未找到控制点')
    }
  }
  update(e: MouseEvent) {
    const loc = this.windowLocToCanvas(e)
    const shape = shapeList[state.index]
    if(shape.type === 'circle') {
      const circle = new Circle(shape)
      circle.scale(state,loc)
    }else if (shape.type === 'rect') {
      const rect = new Rect(shape)
      rect.scale(state,loc)
    }
    this.initDraw()
    this.adaptSelectedShape.drawControls(this.ctx)
  }
  resetConfig() {
    state.select(-1)
    pointInPathList = []
    state.updateCursorPointer('default')
  }
  // 判断鼠标落在四个控制点上还是，矩形上,只支持按比例缩放，这样能保证图形不变。
  draggingPosition(loc: {x: number;y: number}) {
    const { x,y } = loc
    const shape = shapeList[state.index]
    const fourPoint = this.adaptSelectedShape.controlPointPos
    // 这里可以通过另外一个 canvas 绘制 path来判断的是否在路径中，也可以通过数学计算判断
    const isInRectLeftTop = x > fourPoint[0][0] && y>fourPoint[0][1]  
    const isInRectRightTop = x < fourPoint[1][0] && y> fourPoint[1][1]
    const isInRectRightBottom = x < fourPoint[2][0] && y< fourPoint[2][1]
    const isInRectLeftBottom = x> fourPoint[3][0] && y< fourPoint[3][1]
    const { w,h } = {w:20,h:20}
    // 判断当前点击点是否在四个控制点中
    const pointerMap: {isIn: boolean;pointer: Direction}[]= [
      {
        isIn:x < fourPoint[0][0] && y<(fourPoint[0][1]+h/2) || y<fourPoint[0][1] && x< (fourPoint[0][0] + w/2)   ,
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
      }
    ]
    for(const item of pointerMap){
      const { isIn,pointer } = item
      if(isIn) {
        state.updateCursorPointer(pointer)
        break
      }
    }
    return isInRectLeftTop && isInRectRightTop && isInRectRightBottom && isInRectLeftBottom
  }
  // 连线四个点
  connectFourPoint(start: DobuleNumber,list: DobuleNumber[]) {
    const ctx = this.ctx
    ctx.moveTo(start[0], start[1])
    list.forEach(([x,y])=>{
      ctx.lineTo(x,y)
    })
    ctx.closePath()
    ctx.strokeStyle = 'blue'
    ctx.stroke()
  }
  // 找出点击的图像
  judgeIsPointInPath(x: number, y: number) {
    // 如果当前有图形被选中，判断点击的是不是当前选中的图形
    if(this.hasPathIndex){
      // 如果点击时候选中的还是上一次绘制的，就不需要进行后面的判断
      if(this.ctx.isPointInPath(x,y)){
        return 
      }
    }
    this.findPath(x, y)
    this.findCoverOne()
    // 重新绘制图形
    this.initDraw()
    // 如果有图形被选中，那么绘制控制框，否则就不用绘制控制框了
    if(this.hasPathIndex){
      this.adaptSelectedShape.drawControls(this.ctx)
    }
  }
  findPath(x: number, y: number) {
    pointInPathList = []
    // 遍历图形列表，找出点所在的所有图形
    shapeList.forEach((ele, index) => {
      this.adaptShapeManual(ele).drawShape(this.ctx)
      // 这里判断要反正外面，drawShape 把 ctx 放到 drawShape 中判断会导致状态未及时更新 ？？？不知道为啥
      const isInPath = this.ctx.isPointInPath(x, y)
      if (isInPath) {
        // 给图像添加上在列表位置的标记
        ele.pathIndex = index
        pointInPathList.push(ele)
      }
    })
  }
  findCoverOne() {
    if (pointInPathList.length === 0) {
      this.resetConfig()
    } else {
      pointInPathList.sort((a, b) => b.zIndex - a.zIndex)
      state.select(pointInPathList[0].pathIndex as number)
    }
  }
  windowLocToCanvas(e: MouseEvent) {
    const { clientX, clientY } = e
    const { top, left } = this.canvas.getBoundingClientRect()
    return {
      x: clientX - top,
      y: clientY - left
    }
  }
}

const instance = new Canvas()

instance.initDraw()