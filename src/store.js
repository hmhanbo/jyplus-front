import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const state = {
  count:10,
};
const mutations =  {        //mutation是最基本的方法
  increment(state){       //  3. 处理状态、数据的变化
    state.count++;
  },
  decrement(state){
    state.count--;
  }
};

const actions = {
  increment:({commit})=>{                   //2. 处理你要干什么，异步请求，判断，流程控制，//传入参数，commit
    // console.log(commit);
    commit('increment')
  },
  decrement:({commit})=>{
    commit('decrement')
  },
  clickAsync: ({commit, state}) => {                 //传入值，进行流程控制
    if(state.count%2 ==0) {
        new Promise((resolve) => {                          //异步请求
        setTimeout(function () {
          commit('increment');
          resolve();
        }, 1000)
        })
    }
  }
};

const getters = {
  count(state){
    return state.count;
  },
  getOdd(state){
    return state.count%2==0?'even':'odd'
  }
};

//需要导出store对象

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

