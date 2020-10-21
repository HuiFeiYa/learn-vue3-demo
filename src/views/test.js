// 将s[i]向上拨动一次
const plusOne = function(s, j) {
  const arr = s.split('')
  if (arr[j] === '9') {
    arr[j] = '0'
  } else {
    arr[j] = +arr[j] + 1 + ''
  }

  return arr.join('')
}

// 将s[i]向下拨动一次
const minusOne = function(s, j) {
  const arr = s.split('')
  if (arr[j] === '0') {
    arr[j] = '9'
  } else {
    arr[j] = +arr[j] - 1 + ''
  }

  return arr.join('')
}

/**
 * @param {string[]} deadends
 * @param {string} target
 * @return {number}
 */
const openLock = function(deadends, target) {
  // 记录需要跳过的死亡密码
  const deads = new Set()
  for (let i = 0; i < deadends.length; i++) {
    deads.add(deadends[i])
  }

  // 记录已经穷举过的密码，防止重复访问
  const visited = new Set()

  // BFS核心队列
  const q = []

  // 从起点开始BFS
  let step = 0
  q.push('0000')
  visited.add('0000')

  while (q.length > 0) {
    console.log('q', q)
    const sz = q.length
    // 将当前队列中的所有的节点向四周扩散
    for (let i = 0; i < sz; i++) {
      const cur = q.shift()

      // 判断是否到达终点
      if (deads.has(cur)) {
        continue
      }
      if (cur === target) {
        return step
      }

      // 将一个节点的未遍历相邻节点加入队列
      for (let j = 0; j < 4; j++) {
        const up = plusOne(cur, j)
        if (!visited.has(up)) {
          q.push(up)
          visited.add(up)
        }

        const down = minusOne(cur, j)
        if (!visited.has(down)) {
          q.push(down)
          visited.add(down)
        }
      }
    }
    step++
  }
  return -1
}

const r = openLock(['0201', '0101', '0102', '1212', '2002'], '0202')
console.log('r', r)
