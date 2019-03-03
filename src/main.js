// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import router from './router'

Vue.use(ElementUI);
Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user == null && to.path != '/login') {
    next({ path: '/login' });
  } else {
    next();
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
