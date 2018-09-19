import Vue from 'vue'
import Router from 'vue-router'
import PhHome from '@/components/ph-home'
import PhDeal from '@/components/ph-deal'
import PhNews from '@/components/ph-news'
import PhTrouble from '@/components/ph-trouble-cash'
import PhWiki from '@/components/wiki/ph-wiki'
import PhHeytea from '@/components/ph-heytea'
import PhTroubleBond from '@/components/ph-trouble-bond'

// import store from './vuex/store'

Vue.use(Router)

// 1、导入组件，2、配置路由
export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: PhHome
    },
    {
      path: '/deal',
      name: 'deal',
      component: PhDeal
    },
    {
      path: '/news',
      name: 'news',
      component: PhNews
    },
    {
      path: '/trouble-cash',
      name: 'trouble-cash',
      component: PhTrouble
    },
    {
      path: '/wiki',
      name: 'wiki',
      component: PhWiki
    },
    {
      path: '/heytea',
      name: 'heytea',
      component: PhHeytea
    },
    {
      path: '/trouble-bond',
      name: 'trouble-bond',
      component: PhTroubleBond
    }
  ]
})
