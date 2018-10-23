// class obj {
//     constructor (text) {
//       this.title = text;
//     }
//   }

// function addHeaderToArr (resultArr,domArr, level) {
//     let i = 0

//     const obj = {
//         label: domArr[i].innerText,
//       }

//     for(; i < domArr.length;){
//       if(~~domArr[i].tagName[1] === level){
//         resultArr.push(obj);
//         i++;
//       } else if (~~domArr[i].tagName[1] > level) {
//         if (!resultArr.children) {
//             resultArr.children = []
//           }

//         i += addHeaderToArr(resultArr.children, domArr, i, level+1);
//         resultArr.push(resultArr.children);
//       } else if (~~domArr[i].tagName[1] < level) {
//         return i;
//       }
//     }
//     return i;
//   }



function addHeaderToArr(resultArr, domArr) {


  var h1 = -1
  var h2 = -1
  var h3 = -1

  try{
    for (var i = 0 ; i < domArr.length; i++) {
      if (~~domArr[i].level === 2) {
        resultArr.push({
          title: domArr[i].title
        });
        h1++;
        h2 = -1;
      } else if (~~domArr[i].level === 3) {
        //  新建children 
        if (!resultArr[h1]['children']) {
          resultArr[h1]['children'] = []
        }
        resultArr[h1]['children'].push({
          title: domArr[i].title
        })
        h2++;
        h3 = -1;
      } else if (~~domArr[i].level === 4) {
        //  新建children 
        if (!resultArr[h1]['children'][h2]['children']) {
          resultArr[h1]['children'][h2]['children'] = []
        }
        resultArr[h1]['children'][h2]['children'].push({
          title: domArr[i].title
        })
        h3++;
      }
    }
    return resultArr
  } catch(err){
    return [{label:"请按规范写入标题"}]
  }

}



const input = [{
  title: '一级标题 1',
  level: '1'
}, {
  title: '二级标题 1-1',
  level: '2'
}, {
  title: '三级标题 1-1-1',
  level: '3'
}, {
  title: '二级标题 1-1',
  level: '2'
}, {
  title: '三级标题 1-1-1',
  level: '3'
}, {
  title: '一级标题 2',
  level: '1'
}, {
  title: '二级标题 2-1',
  level: '2'
}, {
  title: '二级标题 2-2',
  level: '2'
}]

let result = []
addHeaderToArr(result, input)

// console.log(result)

// output =[{
//     label: '一级 1',
//     children: [{
//       label: '二级 1-1',
//       children: [{
//         label: '三级 1-1-1'
//       }]
//     }]
//     }, {
//       label: '一级 2',
//       children: [{
//         label: '二级 2-1',
//       }, {
//         label: '二级 2-2',

//       }]
//     }]


//   let doms = document.querySelectorAll(`#myhtml h1,#myhtml h2,#myhtml h3`)
//   let result = []
//   addHeaderToArr(result, doms, 1)
//   console.log(result)
