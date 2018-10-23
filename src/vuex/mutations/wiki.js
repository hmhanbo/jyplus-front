
// mutations
export default {
  resSuccess(state, data) {
    let arr = [];
    //dataList是从data取得的值
    //allList是dataList展开的值，因为目前没有笔记本，所以allList=dataList
    state.dataList = data;
    // state.allList = this.getters.tBallList;
    state.allList = state.dataList;
  },

  // 请求成功,关闭loadding动画
  closeLoadding(state) {
    state.loadingState = false;
  },

  // 同步 title和textarea内容
  editChange(state, params) {
    state.allList.forEach(item => {
      if (item.id == params.id) {
        item.title = params.title;
        item.content = params.content;
      }
    });
  },
  //删除文章
  delNote(state, id){

    for(var i = 0; i<state.dataList.length; i++){
      if(state.dataList[i].id ==id){
        // console.log(state.dataList)
        state.dataList.splice(i,1)
      }
    }
    // state.dataList.forEach(item => {
    //   if (item.id == id) {
    // state.dataList=state.dataList.filter(item => item.id !== id)// item.remove(item)
    //   }
    // });

    state.allList = this.getters.tBallList;
  },
  

  // 新建笔记 完成
  // impression版本中，dataList是指包含笔记本的数组。新建笔记时选定了笔记本，所以dataList的赋值办法较复杂，在这里省略
  addNotes(state, params) {
    state.dataList.unshift(params);
    state.allList = this.getters.tBallList;

  },

  //当点击textarea 和 title区域,隐藏快捷方式栏
  closeQuickbox(state) {
    if (state.quickShow || state.noteBookShow || state.noteTagState || state.shareState) {
      state.quickShow = false;
      state.noteBookShow = false;
      state.yinListopation = false;
      state.noteTagState = false;
      state.shareState = false;
    }
    state.navState = 1;
  },


  /*-----------------将Home组件中展示的数据,同步到vuex状态-----------------------------*/
  notecontent(state, obj) {
    state.noteContent = obj;
  },
}
