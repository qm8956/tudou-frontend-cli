<template>
   <!-- 页面底部 -->
    <footer id="appfooter" class="bg-dark">
      <div class="main-width mx-auto d-flex">
        <!-- 些许功能 -->
        <div>
          <ul class="nav flex-column">
            <li class="nav-item">
              <a class="nav-link" style="cursor: pointer;" @click.stop="">关于我们</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" style="cursor: pointer;" @click.stop="">意见反馈</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" style="cursor: pointer;" @click.stop="">用户手册</a>
            </li>
          </ul>
        </div>
        <div></div>
        <!-- 信心区域 -->
        <div>
          <ul class="nav flex-column">
          <li class="nav-item">
            <span>联系我们</span>
          </li>
          <li class="nav-item">
            <span>电话：029-xxxxxxxx/xxxxxxxxx</span>
            <span>邮箱：xxxxxxx@163.com</span>
            <span>QQ群：110112119120</span>
          </li>
          <li class="nav-item">
            <span>地址：需要联系的地址</span>
          </li>
        </ul>
        </div>
        <div></div>
        <!-- app二维码 -->
        <div>
          <img src="static/temp/temp-1.png" alt="" v-viewer>
          <p>APP下载<br>(Android版)</p>
        </div>
      </div>
      <p class="text-center" style="margin-top: -70px;">
        Copyright © 使用者公司公司名称 ©
        <span style="color: #93BF59;">GLBUS2017 - 2018</span>
        技术支持: 开发者公司名称
      </p>
    </footer>
</template>
<script>
export default {
  name: 'mainfooter',
  title: '主页低部信息',
  data() {
    return {}
  }
}
</script>
<style lang='scss'>
/* 脚步处理样式 */
#appfooter {
  height: auto !important;
  font-size: 14px;
  color: #c0c0c0;
  padding-bottom: 50px;
}
#appfooter > div {
  padding: 40px 100px;
}
#appfooter > div > div:nth-child(1) {
  display: inline-block;
  width: 125px;
}

#appfooter > div > div:nth-child(2),
#appfooter > div > div:nth-child(4) {
  width: 1px;
  height: 85px;
  background-color: #c0c0c0;
  margin-top: 13px;
}
#appfooter > div > div:nth-child(3) {
  display: inline-block;
  width: 770px;
  padding-left: 50px;
  height: 100px;
}
#appfooter > div > div:nth-child(3) span {
  display: inline-block;
  padding: 8px 16px;
}
#appfooter > div > div:nth-child(5) {
  display: inline-block;
  width: 165px;
  padding-left: 60px;
}
#appfooter > div > div:nth-child(5) img {
  width: 100px;
  cursor: url(../../assets/big.png), auto;
  /* cursor: pointer; */
}
#appfooter > div > div:nth-child(5) p {
  text-align: center;
  margin-top: 25px;
}
#appfooter a {
  color: #c0c0c0;
  text-decoration: none;
}
#appfooter a:hover {
  color: #94c05a;
}
</style>