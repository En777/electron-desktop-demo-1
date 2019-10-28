import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home/Home'
import FS from '@/views/Demos/FS'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/FS',
      name: 'FS',
      component: FS
    },
  ]
})
