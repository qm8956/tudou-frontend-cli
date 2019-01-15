<template>
  <div class="" style="min-height: 300px;">
    <!-- bidirectional data binding（双向数据绑定） -->
    <quill-editor v-model="content"
                  ref="myQuillEditor"
                  :options="editorOption"
                  @change="onEditorChange($event)"
                  @blur="onEditorBlur($event)"
                  @focus="onEditorFocus($event)"
                  @ready="onEditorReady($event)">
    </quill-editor>
  </div>
</template>

<script>

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import {quillEditor, Quill} from 'vue-quill-editor'
import {ImageExtend, QuillWatch} from 'quill-image-extend-module'
import ImageResize from 'quill-image-resize-module'
const Font = Quill.import('formats/font')
Font.whitelist = ['Arial', '宋体', '黑体', '微软雅黑']
Quill.register(Font, true)
Quill.register('modules/ImageExtend', ImageExtend)
Quill.register('modules/ImageResize', ImageResize)




  export default {
    data () {
      return {
        content: '',
        editorOption: {
          theme: 'snow',
          boundary: document.body,
          modules: {
            ImageResize: {},
            ImageExtend: {
              loading: true,
              size: 3,  // 可选参数 图片大小，单位为M，1M = 1024kb
              name: 'file',
              action: '/mscs/user/fileUpload',
              headers: (xhr) => {
                // 图片传到后端需要设置authorization
                xhr.setRequestHeader('authorization', this.authorization)
              },
              response: (res) => {
                return res.data
              },
              sizeError: () => {},  // 图片超过大小的回调
              start: (res) => {
              },  // 可选参数 自定义开始上传触发事件
              end: () => {
              },  // 可选参数 自定义上传结束触发的事件，无论成功或者失败
              error: (res) => {
              },  // 可选参数 上传失败触发的事件
              success: (res) => {
              },  // 可选参数  上传成功触发的事件
              change: (xhr, formData) => {
              } // 可选参数 每次选择图片触发，也可用来设置头部，但比headers多了一个参数，可设置formData
            },
            toolbar: {  // 如果不上传图片到服务器，此处不必配置
               container: [
                  ['bold', 'italic', 'underline', 'strike'],
                  [{ 'header': 1 }, { 'header': 2 }],
                  [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                  [{ 'script': 'sub' }, { 'script': 'super' }],
                  [{ 'indent': '-1' }, { 'indent': '+1' }],
                  [{ 'direction': 'rtl' }],
                  [{ 'size': ['small', false, 'large', 'huge'] }],
                  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                  [{ 'color': [] }, { 'background': [] }],
                  [{ 'font': ['微软雅黑', '宋体', '黑体', 'Arial'] }],
                  [{ 'align': [] }],
                  ['link', 'image']
               ],
               handlers: {
                   'image': function () {  // 劫持原来的图片点击按钮事件
                       QuillWatch.emit(this.quill.id)
                   }
               }
           }
         },
         placeholder: '开始编辑',
         readOnly: false
        }

      }
    },
    props: {
      value: {}
    },
    mounted() {
      this.content = this.value
    },
    // manually control the data synchronization
    // 如果需要手动控制数据同步，父组件需要显式地处理changed事件
    methods: {
      onEditorBlur(quill) {
      },
      onEditorFocus(quill) {
      },
      onEditorReady(quill) {
      },
      onEditorChange({ quill, html, text }) {
      }
    },


    watch: {
      'content' (val) {
        this.$emit('input', val)
      },
      'value' (val) {
        this.content = val
      }
    },
    computed: {
      // editor() {
      //   return this.$refs.myQuillEditor.quill
      // },
      authorization () {
        return this.$store.state.user.token
      }
    },
    components: {
      'quill-editor': quillEditor
    }
  }
</script>
<style lang="less">
.quill-editor {
  .ql-container {
    min-height: 300px;
  }
  /*工具栏内用*/
  .ql-font {
    span[data-value="Arial"]::before {
      content: "Arial" !important;
      font-family: "Arial";
    }
    span[data-value="宋体"]::before {
      content: "宋体" !important;
      font-family: "宋体";
    }
    span[data-value="黑体"]::before {
      content: "黑体" !important;
      font-family: "黑体";
    }
    span[data-value="微软雅黑"]::before {
      content: "微软雅黑" !important;
      font-family: "微软雅黑";
    }
  }
  /*编辑器内容用*/
  .ql-font-Arial {
    font-family: "Arial";
  }
  .ql-font-宋体 {
    font-family: "宋体";
  }
  .ql-font-黑体 {
    font-family: "黑体";
  }
  .ql-font-微软雅黑 {
    font-family: "微软雅黑";
  }
  // .ql-size {
  //   span[data-value="小号"]::before {
  //     content: "小号" !important;
  //     font-size: 0.75em;
  //   }
  //   span[data-value="常规"]::before {
  //     content: "常规" !important;
  //     font-size: 1em;
  //   }
  //   span[data-value="大号"]::before {
  //     content: "大号" !important;
  //     font-size: 1.5em;
  //   }
  //   span[data-value="超大"]::before {
  //     content: "超大" !important;
  //     font-size: 2.5em;
  //   }
  // }
  // .ql-size-小号 {
  //   font-size: 0.75em;
  // }
  // .ql-size-常规 {
  //   font-size: 1em;
  // }
  // .ql-size-大号 {
  //   font-size: 1.5em;
  // }
  // .ql-size-超大 {
  //   font-size: 2.5em;
  // }
}
</style>
