// import { Canvas } from '../rect/board/version-1.1'
import { Shape } from '../rect/board/scaleConfig'
import { State } from '../rect/board/utils'
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
  }
]
const state = new State(shapeList)


const instance = new Canvas()

instance.initDraw()