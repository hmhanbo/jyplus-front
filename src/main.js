// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/css/index.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI);

import VueSimplemde from 'vue-simplemde'
import 'simplemde/dist/simplemde.min.css'
Vue.use(VueSimplemde);

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor);


import store from './vuex'

import $api from './server/index'
Vue.use($api);

import VCharts from 'v-charts'
Vue.use(VCharts)

// import md2Text from './filters/md2text'

// import marked from 'marked';
// import {trim} from 'lib/utils'

// Vue.filter('md2Text',function(markdown){
//   let div = document.createElement('div');
//   div.innerHTML = marked.parse(markdown);
//   return div.innerText;
// });

// Vue.use(marked)
Vue.config.productionTip = false;

/* eslint-disable no-new */
// 3、挂在vue上
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
