import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon.vue' // svg component

// register globally
Vue.component('svg-icon', SvgIcon)

const req = require.context('./svg', false, /\.svg$/)

const requireAll = requireContext =>
  requireContext.keys().map(item => {
    return requireContext(item)
  })
requireAll(req)
