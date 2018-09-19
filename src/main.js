// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueSimplemde from 'vue-simplemde'
import 'simplemde/dist/simplemde.min.css'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

Vue.use(ElementUI);
// Vue.use(marked)
Vue.config.productionTip = false;

Vue.use(VueSimplemde);
Vue.use(mavonEditor);


/* eslint-disable no-new */
// 3、挂在vue上
new Vue({
  el: '#app',
  // render: h => h(App),
  router,
  components: {
    App
  },
  template: '<App/>'
})
