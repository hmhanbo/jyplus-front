/**
 * Created by chuck7 on 16/7/30.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters/wiki';
import mutations from './mutations/wiki';
import actions from './actions/wiki';

Vue.use(Vuex);
// Vue.config.debug = true;
// const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state:{ 
    dataList: [], //数据列表
    // allList: [], // 所有的笔记列表
    noteContent: {}, //Home组件展示的数据对象
  
    /*------删除------*/
    noteDelShow: false, //删除组件的显示隐藏
    delNoteInfo: {}, //要删除的对象
    delnoteNextId: -1, //删除对象的下一个兄弟对象Id
    loadingState: true, // 加载loadding状态
  
    /*------每次删除笔记本,当前删除的状态------*/
    deleteNotesState: '', //删除笔记列表的状态(allList,noteBookList,tagList)
  
    navState: 1, //app组件导航
    // isJoinNotesTagList

    /*------快捷方式------*/
    quickShow:false, //控制快捷方式组件的显示和隐藏,控制yinList内容信息的透明度
    dataListShow:true, //快捷方式进入详情笔记本,笔记信息列表隐藏
  },
  mutations,
  getters,
  actions
  // strict: debug
});
