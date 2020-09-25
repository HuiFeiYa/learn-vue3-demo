export function scrollSmoothTo(container, position) {
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function(callback) {
      return setTimeout(callback, 17)
    }
  }
  // 当前滚动高度
  const wrap = container || document.documentElement || document.body
  let scrollTop
  let startTop
  scrollTop = startTop = wrap.scrollTop
  // 滚动step方法
  function step() {
    // 需要滚动的距离
    let distance = position - scrollTop
    // 目标滚动位置
    scrollTop = scrollTop + distance / 10
    // 如果滚动的距离小于1直接跳转到目标位置
    if (Math.abs(distance) < 1) {
      container.scroll(0, position)
    } else {
      container.scroll(0, scrollTop)
      requestAnimationFrame(step)
    }
  }
  step()
}

export function scrollSmoothTo1(container, position) {
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function(callback) {
      return setTimeout(callback, 17)
    }
  }
  // 当前滚动高度
  const wrap = container || document.documentElement || document.body
  let scrollTop
  let startTop
  scrollTop = startTop = wrap.scrollTop
  // 滚动step方法
  function step() {
    // 需要滚动的距离
    let distance = position - scrollTop
    // 目标滚动位置
    scrollTop = scrollTop + 2
    // 如果滚动的距离小于1直接跳转到目标位置
    if (Math.abs(distance) < 1) {
      container.scroll(0, position)
    } else {
      container.scroll(0, scrollTop)
      requestAnimationFrame(step)
    }
  }
  step()
}
