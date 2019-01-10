import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import OrderList from '@/views/order/List'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children:[
        {
          path: '/order/list',
          name: 'orderList',
          component: OrderList,
        }
      ]
    }
  ]
})
