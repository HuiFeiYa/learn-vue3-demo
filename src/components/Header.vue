<template>
  <div>
    <header>
      <div>
        <van-icon
          v-if="pageInfoComputed.icon.arrow === 'left'"
          :name="pageInfoComputed.icon.name"
          size="1.5rem"
          @click="leftHandle"
        />
      </div>
      <h3>{{ pageInfoComputed.title }}</h3>
      <div>
        <van-icon
          v-if="pageInfoComputed.icon.arrow === 'right'"
          :name="pageInfoComputed.icon.name"
          size="1.5rem"
          @click="rightHandle"
        />
      </div>
    </header>
  </div>
</template>
<script lang="ts">
import { Icon } from 'vant'
import { Component, Vue } from 'vue-property-decorator'
import { MyITodoItem, Mode } from 'STORE/state'
import { Mutation } from 'vuex-class'
import { _ } from '../views/todoList/utils'
@Component({
  components: {
    [Icon.name]: Icon
  }
})
export default class Header extends Vue {
  @Mutation private createTodoItem!: (todo: MyITodoItem) => void
  private createTodoItemHandle() {
    const newItem: MyITodoItem = {
      id: _.uuid(),
      name: '新任务',
      isDone: false,
      mode: Mode.edit,
      iconName: 'yingtao',
      color: '#FFCC22'
    }
    this.createTodoItem(newItem)
  }
  private leftHandle() {
    this.$router.back()
  }
  // 当点击跳转到 create 页面时候，往 todoList 中推一个默认的图标样式。
  private rightHandle() {
    this.$router.push('/todo/create')
    this.createTodoItemHandle()
  }
  private get pageInfoComputed() {
    const currentRouteName = this.$route.name
    switch (currentRouteName) {
      case 'todoHome':
        return {
          icon: {
            name: 'plus',
            arrow: 'right'
          },
          title: '我的待办'
        }
      case 'todoCreate':
        return {
          icon: {
            name: 'arrow-left',
            arrow: 'left'
          },
          title: '新建任务'
        }

      default:
        return ''
    }
  }
}
</script>
<style lang="less" scoped>
header {
  display: grid;
  grid-template-columns: 3rem auto 3rem;
  align-items: center;
  grid-row-end: end;
  width: 100%;
  height: 3.5rem;
  min-height: 8%;
  background-color: #fff;
}
</style>
