// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// import marked from './marked'


Vue.use(ElementUI);
// Vue.use(marked)
Vue.config.productionTip = false;


/* eslint-disable no-new */
// 3、挂在vue上
new Vue({
  el: '#app',
  // render: h => h(App),
  store,
  router,
  components: {
    App
  },
  template: '<App/>'
})
