## docker相关说明

### 文件目录
1. Dockerfile: docker构建镜像文件
2. nginx.conf: nginx的配置文件
3. dist: 需要copy到镜像中的文件，本镜像暂时不适用挂在宿主机目录方法，当git clone下项目是不存在dist文件目录，需要运行`npm run build`打包生成dist

### 镜像运行
1. docker内部端口默认为80端口，宿主机端口由使用者决定例如
```bash
  docker container run --name vueify-demo -d -p 8032:80 qianming/vueify-demo:0.0.1 
```
- -p参数：容器的 80 端口映射到本机的 8032 端口
- --name参数： 为容器指定名字
- -d：后台启动

### docker打包发布
1. 创建image文件(注意每次构建的版本)
``` bash
  docker image build -t vueify-demo:0.0.1 .
```
- 上面代码中，-t参数用来指定 image 文件的名字，后面还可以用冒号指定标签。如果不指定，默认的标签就是latest。最后的那个点表示 Dockerfile 文件所在的路径，上例是当前路径，所以是一个点。
2. 登录docker
``` bash
  docker login
```
3. 为本地的 image 标注用户名和版本
``` bash
  docker image tag vueify-demo:0.0.1 qianming/vueify-demo:0.0.1
```
4. 发布image文件
``` bash
  docker image push [username]/[repository]:[tag]
```
实例
``` bash
  docker image push qianming/vueify-demo:0.0.1
```

### 使用远程镜像
``` bash
  docker container run --name vueify-demo -d -p 8032:80 qianming/vueify-demo:0.0.1 
```
访问ip:8032即可，例如`localhost:8032`


[docker基础教程](http://www.ruanyifeng.com/blog/2018/02/docker-tutorial.html)  
[nginx镜像地址](https://hub.docker.com/_/nginx)  
[nginx教程](http://tengine.taobao.org/book/index.html)  
[百度网盘：nginx从入门到精通下载](https://pan.baidu.com/s/1o6KCn7W)  
