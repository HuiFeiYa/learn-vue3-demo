/**
 *
 * @param grid
 * @param r 行
 * @param c 列
 * @param m 有多少行
 * @param n 有多少列
 */
// function defs(grid:string[][],r:number,c:number,m:number,n:number):void{
//   grid[r][c] = '0'
//   // console.log('grid',grid)
//   // 找出四个方向的元素的坐标
//   let arroundEle = [[r-1,c],[r,c+1],[r+1,c],[r,c-1]]
//   console.log(arroundEle,m,n)
//   arroundEle.forEach(([r,c])=>{
//       if(r>=0&&r<m&&c>=0&&c<n&&grid[r][c]==='1'){
//           defs(grid,r,c,m,n)
//       }
//   })
//   console.log('----end')
// }
export function numIslands(grid: string[][]): number {
  const m = grid.length
  const n = grid[0].length
  let landsNum = 0
  function defs(grid: string[][], r: number, c: number): void {
    //[[r-1,c],[r,c+1],[r+1,c],[r,c-1]]
    if (r < 0 || r >= m || c < 0 || c >= n) return
    if (grid[r][c] !== '1') return
    console.log('进入')
    grid[r][c] = '0'
    defs(grid, r - 1, c)
    defs(grid, r, c + 1)
    defs(grid, r + 1, c)
    defs(grid, r, c - 1)
  }
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === '1') {
        landsNum++
        defs(grid, i, j)
      }
    }
  }
  return landsNum
}
// 输入：grid = [
//   ["1","1","1","1","0"],
//   ["1","1","0","1","0"],
//   ["1","1","0","0","0"],
//   ["0","0","0","0","0"]
// ]
// 输出：1
