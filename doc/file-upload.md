## FileUpload.vue

> 说明：文件上传组件为element-ui基础上二次封装的一个组件，参数较多，使用阿里云OSS上传文件至阿里云。本组件参数较多,但大多数参数都是element-ui中需要的，所以对于不太了解的参数也可参考[element文档](http://element-cn.eleme.io/#/zh-CN/component/upload#methods)

### 使用样例

> 对用大部分的文件上传，不用上传全部参数，如果默认值不符合需求时，可以通过传入修改默认值 

```html
  ...
  <file-upload
    ref="upload"
    v-model="item.path"
    :accept="item.accept"
    :multiple="true"
    :limit="item.limit"
    :max-size="item.maxSize"
  >  
  </file-upload>
  ...
```

### 参数说明

- value: 最终上传文件后的值，为了在自定义组件使用v-model特殊设定值,[官方文档](https://cn.vuejs.org/v2/guide/components-custom-events.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E7%BB%84%E4%BB%B6%E7%9A%84-v-model)
- fileList: 特殊情况下，需要传入默认的已经上传的文件列表,大部分情况下通过v-model绑定的值既可以完成初始化
- action: 上传文件的路径（废弃，因为已经全部上传阿里OSS）
- accept: 接受的文件类型，默认值为'image/*, .rar, .zip,.doc, .docx, .pdf, .jpg, .png, .jpeg, .xlsx,.txt,.xlm, .xls'，涵盖大部分文件类型，在有些情况下，对文件类型有严格要求可以传入相应的值来覆盖默认值
- listType: 文件列表的类型，element默认'text/picture/picture-card'，具体可参考element文档
- multiple: 文件是否可以多选，默认不可以
- drag: 是否支持拖拽上传，默认不支持
- limit: 最大的上传文件个数，默认为8个
- isDisplay: 是否展示文件，主要针对的时图片，有时需要以图片的形式显示，而非文件列表形式
- initName: 给上传文件指定的名字，默认为'initimg.png'，主要针对的时单文件图片上传时使用
- className: 组件传入自定义class
- maxSize: 单个文件最大兆数，默认为15MB

**虽然本组件可以使用v-model绑定数据，但清空时，不能直接将绑定值设置为[]或'',应该调用本组件的clearFiles()函数，可以在组件上加入ref，然后通过vm.$refs.upload.clearFiles()调用清空文件列表，clearFiles函数本质也是通过ref调用upload组件的clearFiles函数**