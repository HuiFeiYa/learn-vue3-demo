class Props {
  public speed = 200
  public height = 100
}

const car = new Props()
console.log('car', car)

interface Direction {
  top: number
  bottom?: number
  left?: number
  right?: number
}
function assigned(a: number): Direction
function assigned(a: number, b: number): Direction
function assigned(a: number, b: number, c: number, d: number): Direction
function assigned(a: number, b?: number, c?: number, d?: number) {
  if (b === undefined && c === undefined && d === undefined) {
    b = c = d = a
  } else if (c === undefined && d === undefined) {
    c = a
    d = b
  }
  return {
    top: a,
    right: b,
    bottom: c,
    left: d
  }
}
const r1 = assigned(1, 3, 3, 4)
console.log('r1', r1)

function swap<T, U>(tuple: [T, U]): [U, T] {
  return [tuple[1], tuple[0]]
}

swap([1, 2])

interface User {
  say<T>(arg1: T): T
}

function fn(arg: User) {}
fn({
  say(arg: string) {
    return 'wqe'
  }
})
