export enum Mode {
  edit, // 处于编辑状态
  finish // 处于编辑完成状态
}
Mode.edit
export interface MyITodoItem {
  id: string // todo任务的id
  name: string // todo 任务名称
  isDone: boolean // 任务是否完成
  iconName: string // 任务的图标
  color: string // 任务底色
  mode: Mode // 编辑状态 Mode 枚举中选择一个值
}

export interface State {
  todoList: Array<MyITodoItem>
  a: number
}

export const state: State = {
  todoList: [],
  a: 12
}
