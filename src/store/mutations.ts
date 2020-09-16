import { MutationTree } from 'vuex'
import { State, MyITodoItem } from './state'
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
  }
}
