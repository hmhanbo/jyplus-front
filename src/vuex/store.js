/**
 * Created by chuck7 on 16/7/30.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters/post';
import modules from './modules/index';
import actions from './actions/post';

Vue.use(Vuex);
Vue.config.debug = true;
// const debug = process.env.NODE_ENV !== 'production'



export default new Vuex.Store({
  modules,
  getters,
  actions
  // strict: debug
});
