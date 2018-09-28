
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
  
  //删除笔记Home提交
  delClickHander(state, params) {
    state.delNoteInfo = params.obj; //将要删除的对象同步到state状态delNoteInfo,让删除的组件显示这个对象的信息
    state.delnoteNextId = params.id;
    state.noteDelShow = true;
  },
  //取消删除 delete组件commit
  cancelHander(state) {
    state.noteDelShow = false;
    state.delNoteInfo = {};
  },
  //确定删除
  isdelHander(state) {
    //保持 allList和dataList是同步的数据状态
    state.dataList.forEach(item => {
      if (item.id == state.delNoteInfo.pid) {
        item.children = item.children.filter(el => el !== state.delNoteInfo)
      }
    });
    // 搜索过滤后的数据删除当中要删除的对象
    if (state.findNotesList.length > 0) {
      state.findNotesList = state.findNotesList.filter(item => item !== state.delNoteInfo);
    }
    //在详情笔记本列表中删除对象
    if (state.joinNoteList.length >= 0) {
      state.joinNoteList = state.joinNoteList.filter(item => item !== state.delNoteInfo);
    }
    // 标签组件列表删除对象
    if (state.tagAllList.length > 0) {
      state.tagAllList = state.tagAllList.filter(item => item !== state.delNoteInfo);
    }

    //将删除的对象同步到tipsuccessInfo中
    state.tipsuccessInfo = {
      objname: state.delNoteInfo.title,
      tip: '已成功删除笔记',
    };
    state.tipsuccessState = false; //先隐藏,再显示
    //通过调用getters中的方法,将dataList第几阶段中的每条笔记同步到allList
    state.allList = this.getters.tBallList;
    state.noteDelShow = false;
  },


  // 新建笔记 完成
  addNotes(state, params) {
    state.dataList.forEach(item => {
      if (item.id == params.id) {
        item.children.unshift(params.obj);
      }
    });
    state.allList = this.getters.tBallList;

  },


  // 修改笔记内容详情的margin-left 设置为0
  yinLeftHander(state) {
    state.yinxdetWidth = true;
  },

  //Home组件展开 显示完成按钮
  openHander(state) {
    state.unfoldShow = true;
  },
  //Home组件收起, 显示展开图标   // 隐藏笔记信息组件
  closeHander(state) {
    state.unfoldShow = false;
    state.information = false;
    state.navState = 1;
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

  

  //笔记列表删除完了
  deleteAll(state) {
    state.notelistNumber = true;
  },
  // 笔记列表中不为空
  showNoteList(state) {
    state.notelistNumber = false;
  },

  //组件显示的笔记信息对象
  infoHander(state, params) {
    state.noteInfos = params.obj;
    state.information = true; //展示的组件显示出来
  },
  // 保存笔记信息的 url 作者信息更改
  saveHander(state, params) {
    state.allList.forEach(item => {
      if (item.id == params.id) {
        item.url = params.url;
        item.author = params.author;
      }
    });
    state.information = false;
  },

  // 选项列表显示
  selectShowHander(state) {
    state.selectDown = !state.selectDown;
  },

  /*-----------------将Home组件中展示的数据,同步到vuex状态-----------------------------*/
  notecontent(state, obj) {
    state.noteContent = obj;
  },

  // 消息弹窗状态
  closeMessageHander(state) {
    state.messageShow = false;
  },

  //修改navState
  changeNavState(state, index) {
    state.navState = index;
  },

  //点击快捷方式的详细信息,隐藏Home组件笔记列表
  noteListshow(state){
    state.dataListShow = false;
  },
  // 让笔记本列表盒模型显示出来
  noteListTrue(state){
    state.dataListShow = true;
    state.yinxdetWidth = false;
  },
}
