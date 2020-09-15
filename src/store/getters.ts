import { MyITodoItem, State } from './state'
// vuex 中的 computed
export const getters = {
  getCurrentTodoList(state: State): MyITodoItem[] {
    return state.todoList
  }
}
