import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/views/Index.vue'

// 路由导航冗余报错（菜单路由重复点击）
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)

const routes = [
   {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '*',
    redirect: '/'
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
