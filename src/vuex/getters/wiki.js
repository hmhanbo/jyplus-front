export default {
  // 同步allList 和 dataList数据
  tBallList(Store) {
    let arr = [];
    // console.log(arr)
    arr = Store.dataList
    // console.log(Store.dataList)
    //该方法用于有笔记本的情况，没有笔记本的话，就直接赋值就可以了
    // Store.dataList.forEach(item => {
    //   item.children.forEach(e => {
    //     arr.push(e)
    //   })
    // });
    // console.log(arr);
    return arr
    // return Store.dataList;
  },

  // vuex中的allList有没有快捷方式为true的,如果有返回true,没有返回false
  shortcutHander(Store) {
    return Store.allList.some(item => item.shortcut);
  },

  // 遍历state.allList数据,找到和Home组件相同的对象
  getParamsObj: (Store) => (obj) => {
    return Store.allList.filter(item => item === obj)[0];
  }
}
