interface CommonShape {
  x: number;
  y: number;
  fillStyle: string;
  zIndex: number;
  // 标记当前图像的位置
  pathIndex?: number;
}
export interface RectShape extends CommonShape {
  type: 'rect';
  w: number;
  h: number;
}
export interface CircleShape extends CommonShape {
  type: 'circle';
  r: number;
}

export type Shape = RectShape | CircleShape
