/**
 * 四个转锁盘，0-9个数字，每次拨动一格
 * 拨动到指定四位数字
 */

// 不考虑所有限制条件 从 0000  开始转锁: "1000", "9000", "0100", "0900"... 8种组合 = 2 * 4

function plusOne(s, i) {
  s = s.split('').map(item => Number(item))
  if (s[i] === 9) {
    s[i] = 0
  } else {
    s[i] += 1
  }
  return s
}
function minusOne(s, i) {
  s = s.split('').map(item => Number(item))
  if (s[i] === 0) {
    s[i] = 9
  } else {
    s[i] -= 1
  }
  return s
}

function openLock(deadends, target) {
  // 记录死亡密码
  const deads = new Set()
  for (const i of deadends) {
    deads.add(i)
  }
  /**
   * 记录已经穷举过的密码，我们是通过列举出所有下一步的情况，
   * 可能会出现 从 "0000" 拨到 "1000"，但是等从队列拿出 "1000" 时，还会拨出一个 "0000"，这样的话会产生死循环，需要将访问过的记录下来
   **/
  const visited = new Set()
  // 队列维护当前存在的可能路线，从 0000 开始
  const q = []
  let step = 0
  q.push('0000')
  visited.add('0000')
  function inQueue(ele) {
    if (!visited.has(ele)) {
      q.push(ele)
      visited.add(ele)
    }
  }
  while (q.length > 0) {
    // 当前队列需要遍历的元素个数，每次遍历都会更新当层遍历个数
    const sz = q.length
    // 列举出当前列表每个元素下一步的走法例如:[0000] 下一步有八种走法："1000", "9000", "0100", "0900"... 8种组合
    for (let i = 0; i < sz; i++) {
      const cur = q.shift()
      if (cur === target) {
        return step
      }
      // 用于判断Set数据结构，是否存在相同值(限于基础类型数据)
      // 如果死亡数组中含有该数据，则弃用这条数据
      if (deads.has(cur)) {
        continue
      }

      // 枚举出下一步可能的所有数据
      for (let j = 0; j < 4; j++) {
        // 每一位有两种可能，向上拨动(+)、向下拨动(-)，列举出八种可能添加到队列中
        const up = plusOne(cur, j).join('')
        // 防止死循环
        inQueue(up)
        const down = minusOne(cur, j).join('')
        inQueue(down)
      }
    }
    // 完成下一步元素的添加，将步数加1
    step++
  }
  return -1
}
