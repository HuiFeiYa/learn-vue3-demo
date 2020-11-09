export enum Directions {
  northWestern='nw-resize',
  northEstern='ne-resize',
  southEstern='se-resize',
  southWest='sw-resize'
}
export type Direction = Directions.northWestern | Directions.northEstern 
| Directions.southEstern| Directions.southWest | ''


let arr:Direction[] = ['nw-resize']
let list:Direction[] = [Directions.northEstern]


