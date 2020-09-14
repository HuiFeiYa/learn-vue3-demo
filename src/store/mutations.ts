import { MutationTree } from 'vuex'
import { State, MyITodoItem } from './state'

export const mutations: MutationTree<State> = {
  // 默认接受 state作为一个参数，后面的是传递的参数
  createTodoItem(state: State, todoItem: MyITodoItem) {
    state.todoList.push(todoItem)
  }
}
