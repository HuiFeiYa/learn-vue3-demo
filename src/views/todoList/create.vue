<template>
  <div class="iconSetting">
    <Header />
    <!-- 当前图表 -->
    <div class="icon">
      <Circles class="cir" radius="3.5rem" :activeColor="colorComputed">
        <icon :name="iconComputed" slot="icon" />
      </Circles>
      <!-- 任务名称 -->
    </div>
    <section>
      <van-cell-group>
        <van-field
          v-model="nameComputed"
          input-align="center"
          placeholder="请输入任务名"
        />
      </van-cell-group>
    </section>
    <!-- 备选图标 -->
    <section class="alternative">
      <div
        class="alternativeIcon"
        v-for="(item, index) in iconSetting"
        @click="handleIconHandle(item)"
        :key="index"
      >
        <icon :name="item" />
      </div>
    </section>
    <!-- 图标背景 -->
    <section class="colorSetting">
      <div
        class="background"
        v-for="(item, index) in colorSetting"
        @click="changeColorHandle(item)"
        :key="index"
      >
        <div v-bind:style="{ backgroundColor: item }"></div>
      </div>
    </section>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { SwipeCell, Cell, CellGroup, Field } from 'vant'
import Header from 'COMPONENTS/Header.vue'
import Circles from 'COMPONENTS/Circle.vue'
import { Mutation, State, Getter } from 'vuex-class'
// import { MyITodoItem } from '../../store/state'
import { MyITodoItem } from 'STORE/state'
import { config } from './config'
import { _ } from './utils'
@Component({
  components: {
    Header,
    Circles,
    [SwipeCell.name]: SwipeCell,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Field.name]: Field
  }
})
export default class TodoCreate extends Vue {
  private id!: string
  private index!: number
  private iconSetting: string[] = config.iconSetting
  private colorSetting: string[] = config.colorSetting

  @State private todoList!: MyITodoItem[]
  @Mutation
  private selectColor!: (payload: { id: string; color: string }) => void
  @Mutation
  private selectIcon!: (payload: { id: string; icon: string }) => void
  @Mutation
  private changeName!: (payload: { id: string; value: string }) => void
  @Getter private getCurrentTodoList!: MyITodoItem[]

  private mounted() {
    // 获取当前 todoList 待办事项的最后一项的坐标
    this.index = this.todoList.length - 1
    // 当前操作项
    const currentItem = this.todoList[this.index]
    this.id = currentItem ? currentItem.id : ''
  }
  // 计算当前背景颜色
  private get colorComputed() {
    const currentItem = _.find(this.todoList, this.id) || {
      color: 'red'
    }

    return currentItem.color
  }

  private changeColorHandle(color: string) {
    this.selectColor({ id: this.id, color })
  }
  private handleIconHandle(name: string) {
    this.selectIcon({ id: this.id, icon: name })
  }
  private get nameComputed() {
    const todo = _.find(this.getCurrentTodoList, this.id) || {
      name: ''
    }
    return todo.name
  }
  private set nameComputed(name) {
    this.changeName({ id: this.id, value: name })
  }
  // 计算当前icon名称
  private get iconComputed() {
    const currentItem = _.find(this.getCurrentTodoList, this.id)

    const { iconName } = currentItem || { iconName: 'kite' }

    return iconName
  }
}
</script>
<style lang="less" scoped>
.iconSetting {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  .icon {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 4rem;
    margin-top: 1rem;
    .cir {
      border-radius: 50%;
      border: solid black 2px;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      svg {
        margin: 0;
        width: 95%;
        height: 95%;
      }
    }
  }
  .alternative {
    margin: 2rem;
    height: 10rem;
    width: 100%;
    overflow: auto;
    .alternativeIcon {
      display: inline-block;
      svg {
        width: 2rem;
        height: 2rem;
        border: none;
        margin: 0.8rem;
      }
    }
  }
  .colorSetting {
    margin: 2rem;
    height: 15rem;
    width: 100%;
    overflow: auto;
    .background {
      display: inline-block;
      width: 2rem;
      height: 2rem;
      div {
        display: block;
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        margin: 0.5rem;
      }
    }
  }
}
</style>
