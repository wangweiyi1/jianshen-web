import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Login from '@/views/Login'
import OrderList from '@/views/order/List'
import OrderCreate from '@/views/order/Create'

import GymList from '@/views/gym/List'
import GymCreate from '@/views/gym/Create'
import GymDetail from '@/views/gym/Detail'

import CoachList from '@/views/coach/List'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/Login',
      name: 'login',
      component: Login,
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      children:[
        {
          path: '/coach/list',
          name: 'coachList',
          component: CoachList,
        },
        {
          path: '/order/list',
          name: 'orderList',
          component: OrderList,
        },
        {
          path: '/order/create',
          name: 'orderCreate',
          component: OrderCreate,
        },
        {
          path: '/coach/list',
          name: 'coachList',
          component: OrderList,
        },
        {
          path: '/gym/list',
          name: 'gymList',
          component: GymList,
        },
        {
          path: '/gym/detail',
          name: 'gymDetail',
          component: GymDetail,
        },
        {
          path: '/gym/create',
          name: 'gymCreate',
          component: GymCreate,
        },
      ]
    }
  ]
})
