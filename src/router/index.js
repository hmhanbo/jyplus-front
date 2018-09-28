import Vue from 'vue'
import VueRouter from 'vue-router'
import PhHome from '@/components/ph-home'
import PhDeal from '@/components/deal/ph-deal'
import PhNews from '@/components/ph-news'
import PhTrouble from '@/components/trouble/ph-trouble-cash'
import Wiki from '@/components/wiki/Wiki'
import Edit from '@/components/wiki/Edit'
import PhHeytea from '@/components/ph-heytea'
import PhTroubleBond from '@/components/trouble/ph-trouble-bond'
// import store from './vuex/store'

Vue.use(VueRouter)

// 1、导入组件，2、配置路由


export default new VueRouter({
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
      component: PhTrouble,
      children:[
        {path:'/bond',component:PhTroubleBond},
        {path:'/cash',component:PhTrouble},
      ]
    },
    {
      path: '/wiki/:id?',
      name: 'wiki',
      component: Wiki
    },
    {
      path:'/edit',
      component:Edit,
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
  ],
})
