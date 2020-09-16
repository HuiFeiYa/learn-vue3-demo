<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <input v-model="value1" type="text" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  data() {
    return {
      value: ''
    }
  },
  computed: {
    value1: {
      get() {
        if (isNaN(this.value)) return 0
        return this.value
          ? Number(this.value).toLocaleString('zh', {
              style: 'decimal',
              maximumFractionDigits: 0
            })
          : ''
      },
      set(value) {
        console.log(value)
        this.value = String(value).replace(/,/g, '')
      }
    }
  },
  methods: {
    init() {
      console.log('init')
    }
  }
}
</script>
