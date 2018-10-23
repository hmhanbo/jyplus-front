<template>
  <div>
        <mavon-editor 
        ref="md"
        :editable = "true"
        :toolbarsFlag = "true"
        :scrollStyle = "true"
        @htmlCode ="mavon_htmlCode"
        @save="save"
        @imgAdd="mavon_imgAdd"
        v-model="textareaValue">
        </mavon-editor>
    </div>

</template>

<script>
  import md2text from '../../../filters/md2text.js'
  import {mavonEditor} from 'mavon-editor'
  import axios from 'axios'
  const _this = this;

  export default {
    components: {
    
    },
    props:{
      value:""
    },
    data() {
      return {
        textareaValue: this.value
      }
    },

    methods:{
      mavon_htmlCode(b,s){
        console.log(b)
        console.log(s)
        // console.log(md2text(s))          
      },
      save(value,render){
        // axios({
        //   url:'http://localhost:8080/#/wiki/',
        //   method:'post',
        //   data: value,
        // }).then((value)={
        //   // this.textareaValue=this.value
        // });

        this.$emit("parent-save", value)
          // console.log(value);
          // console.log(render);
      },
      mavon_imgAdd(pos, $file){
            // 第一步.将图片上传到服务器.
           var formdata = new FormData();
           formdata.append('test', $file);
           axios({
               url: 'http://localhost:8080/upload',
               method: 'post',
               data: formdata,
               headers: { 
                 'Content-Type': 'multipart/form-data'
               }
           }).then((url) => {
               // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
               /**
               * $vm 指为mavonEditor实例，可以通过如下两种方式获取
               * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
               * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
               */

              this.$refs.md.$img2Url(pos, url.data);
           }).catch((err)=>{
             console.log("err:"+err)
           })
        }
    },
    watch: {
      value(val) {
        this.textareaValue = val;
      },
      textareaValue(val){

            this.$emit("on-result-change",val);//③组件内对myResult变更后向外部发送事件通知
        }
    },

    computed:{
    },
  }


 
</script>

<style>
</style>
