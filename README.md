# 客户端相关模板

> 客户端基础模板工程，项目基本框架基于vuejs + element-ui + vuex + vue-router构成，其余项目中使用模块，参考模块列表

## 构建流程

> 本项目使用的是vue-cli构建，对于环境需要安装node,由于vuejs要求，node版本不得低于6.0.0，建议用8.0.0以上版本(为了方便对node版本切换，可以使用nvm控制node版本，[nvm说明文档](https://github.com/coreybutler/nvm-windows))

1. 在cmd或terminal切换到项目目录下，使用`npm install`项目所依赖的模块，由于项目依赖较多，可能安装较慢（安装一次即可）。
2. 模块安装完成后，`npm run dev`运行即可，默认端口是8080，如果端口被占用，将自动使用其他端口，具体在启动完成后就可看到
3. 打包,`npm run build`在根目录下回多出一个dist文件夹，为打包后的文件
4. `npm run build --report`打包后文件分析表图，优化使用

**注意：由于npm仓库默认为国外的服务器，所以部分模块下载可能受阻导致安装失败，在下载之前可将npm仓库设置为国内仓库，`npm config set registry http://registry.npm.taobao.org/`,完成后，根据需要可将仓库切换回国外仓库,命令：`npm config set registry https://registry.npmjs.org/`，另外如果有模块一直安装失败，建议先将`npm uninstall name`卸载模块后再使用`npm install name`安装，例如'node-sass'模块容易安装失败，第一次安装失败后，先使用卸载命令，彻底卸载模块，后再重新单独安装**

### 一下列出切换源命令

1. 官方仓库
  ``` bash
    npm config set registry https://registry.npmjs.org/
  ```
2. 淘宝镜像
  ``` bash
    npm config set registry http://registry.npm.taobao.org/
  ```
3. 公司仓库
  ``` bash
    npm config set registry http://10.1.3.51:8081/repository/npm/
  ```
**在没有特殊需求前提下，尽量使用公司仓库库，脱离公司局域网时，用淘宝镜像，需要发布模块时，用官方仓库**

### 模块列表
1. [vuejs](https://cn.vuejs.org/) ([vuejs插件库](https://github.com/vuejs/awesome-vue#components--libraries))
2. [element-ui](http://element-cn.eleme.io/#/zh-CN)
3. [vuex](https://vuex.vuejs.org/)
4. [vue-roter](https://router.vuejs.org/)
5. 异步请求模块：[axios](https://www.npmjs.com/package/axios)
6. 表单验证模块：[vee-validate](https://baianat.github.io/vee-validate/guide/),其中自定义规则`src/validate.js`
7. 图片懒加载模块：[vue-loader](https://github.com/vuejs/vue-loader)
8. 图片预览组件：[v-viewer](https://github.com/mirari/v-viewer)

等，对于另外一些不太常用模块，并未添加进来，可以根据自己需求来安装，例如，`jquery`, `富文本编辑器模块`, `地图组件模块`, `html2canvas`, `jspdf`,`头像编辑模块`等等，详情参考[其他模块安装](doc/其他模块安装.md)

### 文件目录说明
#### build目录：
  > webpack打包配置文件，一般不用修改，如有特殊需求，根据需要修改
#### config目录： 
  > webpack打包配置参数，一般不用修改，如有特殊需求，根据需要修改，一般修改index.js
#### dist目录：
  > 打包后生成的目录，里面是已经打包好的文件，一般刚下载项目是没有这个目录的
#### src目录： 
  > 开发的主要目录
#### static目录：
  > 存放一些静态文件，打包时路径相对不变

### src目录说明
#### assets目录：
  > 程序所需的资源文件，会作为程序的一部分被打包
#### bootstrap-scss：
  > bootstrap4的css源文件目录，本项目并未全部使用bootstrap,只是将其中的css源码引入，方便定制修改
#### components: 
  > 组件库，查看组件库目录
#### libs目录：
  > 功能插件，当前包含PagedList.js(查询插件)和省市区code数据
#### plugins目录：
  > 通用插件集合，包含errorPage.js(请求错误处理)，eventbus.js(事件中央总线)，paramsConvert.js(参数处理插件)，Util.js(通用小工具插件)，说明，本插件库和libs有本质区别</br>1. 本插件库，功能相对单一，全部为函数，不具备对象的使用原则，而libs则完全以对象的使用方式使用</br>2. 本插件库的所有插件将全部挂载到Vue原型链上，可以通过Vue.XXX,或通过vm.$XXX都可访问，但libs不可以</br>3. libs下的插件可以提供相对较多的参数供调用者使用，如：loading，调用者可通过vm.XXX.loading获取请求的状态，但本目录库不提供任何可中间调用参数，只提供返回结果

#### router：
  > 路由配置目录，所有的路由配置都在这个目录完成
#### store: 
  > vuex状态管理配置目录，其中user: 登录用户信息，具体数据，可在Chrome浏览器安装vuetool，启动程序后打开控制台的vue选项，可以看到相关的数据信息，相关操作请自行搜寻
#### App.vue: 
  > 组件入口
#### element-variables.scss：
  > 自定义的样式，为sass格式和改变element-ui样式变量文件
#### main.js: 
  > 总的配置文件，打包的入口文件
#### validate.js: 
  > 自定义验证规则的配置文件，需要额外扩充验证规则统一在本文件下配置

### components目录说明
1. common 自定义通用组件的扩充
2. error-page： 请求错误相关
3. home：首页内容
4. server：一些通用服务目录，当前仅包含登录，注册等

### 通用组件说明
1. 错误页面组件(ErrorPage.vue),包含400，401，403，404，405，500等错误提示
> 路径以以上5中错误状态码结尾即可触发，例如:
```js
  router.push({path: '/500'})
```
2. 将页面滚动到顶部组件(BackTop.vue),
> 直接使用即可，不需用传任何参数，自建内部已经进行定位，例如
```html
  <back-top></back-top>
```
**注意：back-top内是通过监听window得滚动位置来处理按钮得显示与隐藏，所以在别处使用监听window得滚动时不可以直接赋值给window，可以通过`$(window).scroll(this.scroll)`,需要安装jquery**
3. 城市级联选择器CtiyCascader.vue
> 选择器包含三个下拉框，所有下拉数据都是从后台获取，可以给定默认值，例如:
```html
    <city-cascader
        ref="city"
        v-validate="'required|city'" 
        name="企业地址"
        v-model="ec.cityName"
        :provinceCode.sync="ec.provinceCode"
        :areaCode.sync="ec.areaCode"
        :cityCode.sync="ec.cityCode"
    ></city-cascader>
```
4. 文件上传组件(FileUpload.vue)
> 文件上传组件为element-ui基础上二次封装的一个组件，参数较多，使用阿里云OSS上传文件至阿里云，本组件参数较多，具体参考[FileUpload文档](doc/file-upload.md)

6. 时间轴组件组(TimeLine.vue/TimeLineItem.vue)
> 地信圈工程中，当前项目时间轴组件主要与element-ui中手风琴组件结合用在表单分块展开与收起,例如:
```html
<time-line>
    <el-collapse v-model="activeName" accordion>
        <timeline-item :color="activeName === '1' ? 'green' : '#BAC1B0'">
        <el-collapse-item title="项目信息" name="1">
            内容区域
        </el-collapse-item>
        </timeline-item>
        <timeline-item :color="activeName === '2' ? 'green' : '#BAC1B0'">
        <el-collapse-item title="申请单位信息" name="2">
            内容区域
        </el-collapse-item>
        </timeline-item>
    </el-collapse>
</time-line>
```

### 通用插件
1. 阿里云上传aliOss.js，使用例子:
> 将通用函数引入，调用函数获得OSS对象，当前OSS对象由前台维护，每次请求后有效时间为12分钟，对于使用不用关系是否过期，过期时会自动请求后台获取临时key，所以使用通用函数会返回一个promise，在使用时注意异步问题，建议使用async将异步同步化,例如:

```js
import getOss from '../../plugins/aliOss'

<!--- methods ---->
async func (option) {
    ...
    let client = await getOss()
    let ret = await client.multipartUpload(name, file[, options])
    ...
}
```
2. 请求错误处理插件errorPage.js
> 请求错误处理，是将错误的抽取为公用函数，避免书写大量重复代码，再错处理时，通过调用将错误传递给错误处理函数，例如
```js
  axios.post(url, params).then(res => {
    if (res.data.code === 1) {
      // 成功处理
    } else {
      vm.$codeError(res)
    }
  }).catch(error => {
    vm.$catchError(error)
  })
```
错误码主要以提示信息为主，请求错误会根据不用的状态码跳转错误提示页面，或打开登录窗口

3. 中央事件总线
> 事件中央总线为组件通信备用方案，为解决个别通讯较为特殊的组件通信，大多数情况下使用vuex状态管理即可，尽量减少使用中央事件总线，因为当前并未对事件维护，如果过多的使用，可能会导致卡顿等现象,
```js
<!-- 发送方 -->
import eventBus from '../plugins/eventbus.js';
...
  eventBus.$emit('award-confirm-success')
...
```
```js
<!-- 接受方 -->
import eventBus from '../plugins/eventbus.js';
...
  eventBus.$on('award-confirm-success', function(data){
    ...执行收到时间后处理事情
  }.bind(this));
...
```



5. 列表查询插件
> 本插件是将常用多条数据查询抽象为一个查询类，并暴露出简单查询函数和常用属性，具体参考[PagedList文档](doc/paged-list.md)
**为了统一管理与阅读，建议将所有使用PagedList对象名命名为model，当有多个model同时存在时，可以使用以model开头的小驼峰命名方式**

6. 其余vue扩充函数,详情参考[函数详细说明](doc/扩充函数.md)
- paramsConvert：请求参数转换扩展
- connErmsg：拼接请求错误消息，主要针对返回错误消息内容为多条时使用
- clearObj：将对象中的所有属性置空空串，此扩展主要针对的是表单清空，对于有些需要特殊保留或处理，本扩展并不适合，请谨慎使用
- refreshVip：刷新会员状态，主要针对需要会员身份验证情况下，获取当前登陆人的最新会员状态
- formatYMD：日期格式化扩展，可传入时间戳和日期之间连接符字符串(比如"/",就会生成2018/10/11 05:06:08,默认为"-"),
- formatDateTime：日期格式化扩展，与上面不同的是带有时分秒,
- promptMsg：提示信息,在功能尚未开发完整的情况下提示，提示文字和提示图片路径可以自由传入，此扩展是在element-ui中Message插件基础上做了一个统一处理
- lsput：向localStorage中存入数据
- lsget：取出localStorage中存入数据,由于删除较为简单，使用较少，所以并未做扩充
- compileStr：对字符串做不可见加密
- uncompileStr：对加密字符串揭秘
- html2str：一段html中的文本，会去除html的所有标签，只留下文本内容，本扩展主要是为了生成文章提示内容
- uuid：随机获取uuid，可以传入两个参数，一个是生生成uuid的长度，一个是uuid使用的进制（1~36）
- replaceEnter: 当文本域中换行以\n存在，将内容显示到html标签时，并没有按照预计得显示，所以在文本域得内容显示前将所有得换行符替换位html的换行符
- isBrowserCan: 本函数主要为了处理附件预览创建的辅助函数
- getBrowserEdition: 为了统计，有时需要获取用户使用的浏览器及版本号


> 以上扩充函数是对vue的扩充，可以使用this和Vue调用，例如`this.$formatYMD()`,或者使用`Vue.formatYMD()`

 
### 自定义验证扩展
1. 'phone': 手机号码验证
2. 'zipCode': 邮编认证
3. 'qq': qq验证
4. 'fax': 传真号，固定电话验证
4. 'password': 密码验证
5. 'repassword': 重复密码校验
6. 'number': 浮点数验证
7. 'idCard': 身份证号码验证
8. 'posiInt': 正整数验证
9. 'city': 城市级联选择器验证器，这个与城市级联组件配合使用
10. 'certificate': 毕业证编号验证
11. 'fileupload': 文件上传验证，验证有没有上传文件，与文件上传组件配合使用
12. 'nova': 不验证(主要解决有些验证时动态变动得，可能在mouxie+)

*** 城市级联选择器验证与文件上传验证与其余组件一样可以使用于任何组件之中，只是验证其本身的结果依赖于v-model绑定的数据，所以只要组件支持v-model绑定即可，不验证是为了满足产品需求而产生，对于同一验证，可能存在验证与不验证切换 ***

#### 使用事例

1. 普通使用方式
```html
<div class="material-textfield green form-left" :class="{'validate-err': errors.has('qualificationCode')}">
    <input type="text" required v-model="unitinfo.qualificationCode" v-validate="'required'" name="qualificationCode"/>
    <label data-content="测绘资质等级及编号*">测绘资质等级及编号*</label>
</div>
```

2. 与v-for结合使用
```html
<div class="flex-row" v-for="(item, index) in participants" :key="item.uuid">
    <div class="material-textfield green w-25"  style="margin-right: 10px;" :class="{'validate-err': errors.has('participants_name_' + index)}" >
        <input type="text" required v-model="item.name" v-validate="'required|max:10'" :data-vv-name="'participants_name_' + index" >
        <label data-content="名称*">姓名*</label>
    </div>
</div>
```

3. 使用nova判断文件上传是否验证
```html
  <div class="flex-row vip-upload" style="margin-top: 8px;" :class="{'validate-err': errors.has('files' + index)}"  v-for="(item, index) in samplelist" :key="index">
      <label data-content="上传附件" style="width: 400px; text-align: right;" class="ewai" >{{item.name}}{{item.isNeed ? '*(必传)' : '(可选)'}}</label>
      <file-upload
        ref="upload"
        v-model="item.path"
        v-validate="item.isNeed ? 'required|fileupload' : 'nova'"
        :data-vv-name="'files' + index"
        :accept="item.accept"
        :multiple="true"
        :limit="item.limit"
        :max-size="item.maxSize"
      >  
      </file-upload>
    </div>
```

**以上为交为常用的使用方法，其余使用方式可以在官网查看[vee-validate官方文档](https://baianat.github.io/vee-validate/guide/)**


## 当前需要解决的问题
  暂无

## 打包注意事项
  1. 为了减小打包后的体积，对常用公众模块不打包改用cdn加速的方式，这就要求使用的电脑必须连接到互联网，而不是局域网内使用，如果要再局域网内使用，请将`/build/webpack.base.conf.js`中`externals`整个删除，将`/index.html`中的script连接引用删除即可
  2. 默认开启了gzip压缩,如果要关闭，将`/config/index.js`中，<code>build.productionGzip</code>改为`false`，对于`compression-webpack-plugin`模块为了方便再次开启，可以不用卸载

### 额外引入的模块

0. bootstrap.scss源文件
  - 直接考本源文件到项目目录中

1. 处理scss样式文件
  ``` bash
    $ npm install sass-loader node-sass --save-dev
  ```
2. 基础组件库
  ``` bash
    $ npm i element-ui -S
  ```
3. 验证模块
  ``` bash
    $ npm i vee-validate --save
  ```
4. 参数转化模块
  ``` bash
   $ npm i qs -S
  ```
5. 图片懒加载模块
  ``` bash
    $ npm install vue-lazyload -D
  ```
6. 异步请求模块
  ``` bash
    $ npm install axios
  ```
7. 阿里云存储
  ``` bash
    $ npm install ali-oss --save
  ```
8. vue官方状态管理模块
  ``` bash
    $ npm i vuex
  ```
9. 图片预览模块
  ``` bash
    $ npm install v-viewer
  ```
10. 开启gizp压缩(注意版本，对于2.x需要webpack4.x的支持，所以要指定到1.x版本)
  ``` bash
    $ npm install --save-dev compression-webpack-plugin@1.1.11
  ```