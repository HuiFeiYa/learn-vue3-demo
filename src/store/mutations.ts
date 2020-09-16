import { MutationTree } from 'vuex'
import { State, MyITodoItem, Mode } from './state'
import { _ } from '../views/todoList/utils'
export const mutations: MutationTree<State> = {
  // 默认接受 state作为一个参数，后面的是传递的参数
  createTodoItem(state: State, todoItem: MyITodoItem) {
    state.todoList.push(todoItem)
  },
  // 选择图标背景

  selectColor(state: State, payload: { id: string; color: string }) {
    const list = state.todoList
    // 找出需要更改的模板去替换它的颜色
    const todo = _.find(list, payload.id)
    if (todo) {
      todo.color = payload.color
    }
  },
  selectIcon(state: State, payload: { id: string; icon: string }) {
    const list = state.todoList
    const todo = _.find(list, payload.id)
    console.log('state', state, payload)
    if (todo) {
      todo.iconName = payload.icon
    }
  },
  // 任务名称
  changeName(state: State, payload: { id: string; value: string }) {
    const list = state.todoList
    const todo = _.find(list, payload.id)
    if (todo) {
      todo.name = payload.value
    }
  },

  // 删除未定义好的任务
  removeTodoItem(state: State) {
    state.todoList.pop()
  },
  // 将此任务删除
  deleteTodoItem(state: State, id: string) {
    const list: MyITodoItem[] = state.todoList
    state.todoList = list.filter(item => item.id !== id)
  },
  // 将此任务设置为完成
  doneTodoItem(state: State, id: string) {
    const list: MyITodoItem[] = state.todoList
    const todo = _.find(list, id)
    if (todo) {
      todo.isDone = true
    }
  },
  // 从编辑模式进入完成模式
  finishTodoItem(state: State) {
    const list: MyITodoItem[] = state.todoList
    const todo = list[list.length - 1]
    if (todo) {
      todo.mode = Mode.finish
    }
  }
}
