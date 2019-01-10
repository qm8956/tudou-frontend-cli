# tudou-client

客户端

## 打包注意事项
  1. 为了减小打包后的体积，对常用公众模块不打包改用cdn加速的方式，这就要求使用的电脑必须连接到互联网，而不是局域网内使用，如果要再局域网内使用，请将`/build/webpack.base.conf.js`中`externals`整个删除，将`/index.html`中的script连接引用删除即可

### 额外引入的模块

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