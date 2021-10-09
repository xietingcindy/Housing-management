import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/Home'
import watch from '@/components/watch'
import find from '@/components/find'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: home
    },
    {
      path: '/watchHouse',
      name: 'watch',
      component: watch
    },
    {
      path: '/findHouse',
      name: 'find',
      component: find
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    return { x: 0, y: 0 }
  }
})
