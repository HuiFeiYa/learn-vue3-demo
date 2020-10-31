interface CommonShape {
  x: number
  y: number
  fillStyle: string
  zIndex: number
}
export interface RectShape extends CommonShape {
  type: 'rect'
  w: number
  h: number
}
export interface CircleShape extends CommonShape {
  type: 'circle'
  r: number
}

export type Shape = RectShape | CircleShape
