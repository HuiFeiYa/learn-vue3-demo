// 思路先找到最小值，然后找下一个最大值，不停的找出每个波段的波谷和波峰
const maxProfit = function(prices) {
  let min = Number.MAX_SAFE_INTEGER
  let max = Number.MIN_SAFE_INTEGER
  let notMin = false
  let profit = 0
  // 找出当前列表第一段中的波谷
  function minNum() {
    for (const [i, price] of prices.entries()) {
      // 如果下一个值更小就更新到波谷值中
      if (price <= min) {
        min = price
        // [5,4,3,2] 如果是倒叙的列表，这种情况应该直接返回0，股票一直再跌没有交易机会
        if (i === prices.length - 1) {
          prices = []
          notMin = true
        }
      } else {
        // 找到波谷后将存储列表前的元素清除掉
        prices = prices.slice(i)
        break
      }
    }
  }
  // 找到当前阶段的波峰
  function maxNum() {
    for (const [i, price] of prices.entries()) {
      // 找到波峰点
      if (price >= max) {
        max = price
        // [2,3,4,5] 如果是正序，股票一直在涨
        if (i === prices.length - 1) {
          prices = []
        }
      } else {
        prices = prices.slice(i)
        break
      }
    }
  }
  while (prices.length > 0) {
    // 一轮遍历周期就是找到一个波谷和一个波峰然后计算利润
    minNum()
    maxNum()
    if (max === min || notMin) break
    profit += max - min
    min = Number.MAX_SAFE_INTEGER
    max = Number.MIN_SAFE_INTEGER
  }
  return profit
}
