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
export enum Directions {
  northWestern='nw-resize',
  northEstern='ne-resize',
  southEstern='se-resize',
  southWest='sw-resize'
}
export type Shape = RectShape | CircleShape
export type Direction = Directions.northWestern | Directions.northEstern | Directions.southEstern| Directions.southWest | ''
