import { MyITodoItem } from '../../store/state'

export const _ = {
  // 通过id查找相关任务对象
  find(arr: MyITodoItem[], id: string) {
    const index = _.findIndex(arr, id)
    if (index >= 0) {
      return arr[index]
    }
  },

  // 通过id查找相关任务对象的Index
  findIndex(arr: MyITodoItem[], id: string) {
    let low = 0
    let high = arr.length - 1
    let mid: number
    let currentId: string
    while (low <= high) {
      mid = Math.floor(low + (high - low) / 2)
      currentId = arr[mid].id
      if (currentId < id) {
        low = mid + 1
      } else if (currentId > id) {
        high = mid - 1
      } else {
        return mid
      }
    }
    return -1
  },
  uuid(): string {
    return String(Math.random() * 1000)
  }
}
