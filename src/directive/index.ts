import { VNode } from "vue";
import App from '../App.vue'
const vhighlight = {
  name: 'highlight',
  directive: {
    created (el: any, binding: any, vnode: any) {
      console.log('created')
    },
    beforeMount (el: HTMLInputElement, binding: any) {
      el.style.background = binding.value
    }
  }
}

export default function (app: any) {
  const directiveList = [vhighlight]
  directiveList.forEach(item => {
    const { name, directive } = item
    // @ts-ignore
    app.directive(name, directive)
  })
}