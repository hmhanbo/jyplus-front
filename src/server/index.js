import axios from 'axios'
import Vue from 'vue'

const vm = axios.create({
  // baseURL: ' https://www.easy-mock.com/mock/5ba64e758c38302a9b1a66ec/example'
  baseURL: ' http://localhost:8080'
});

export function getList() {
  return vm.get('/wiki')
}

export function get(url){
  return vm.get(url)
}

export function post(url, data){
  return vm.post(url,data)
}
//还需要些post等方法

export default {
  install(Vue) {
    Vue.prototype.$api = {
      getList,
      post,
    }
  }
}
