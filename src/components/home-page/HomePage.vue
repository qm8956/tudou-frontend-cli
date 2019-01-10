<template>
  <div class=''>
    <header id="appheader" class="bg-dark"  :class="{'p-sticky': !isHome}">
      <!-- <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark"> -->
        <div class="main-width mx-auto bg-dark" style="overflow-x: hidden;">
          <el-menu
            :default-active="activeIndex"
            ref="menu"
            class="home-header"
            mode="horizontal"
            @select="handleSelect"
            background-color="#343a40"
            text-color="#fff">
            <template v-for="menu in headers">
              <!-- 只有一个的菜单 -->
              <el-menu-item :index="menu.name"  v-if="!(menu.children && menu.children.length > 0)" :key="menu.name">
                <img :src="menu.icon" alt="" v-if="menu.icon && menu.icon.length > 10">
                <span slot="title" v-if="!(menu.icon && menu.icon.length > 10)">{{menu.title}}</span>
              </el-menu-item>
              <!-- 二级菜单 -->
              <el-submenu :index="menu.title" v-if="menu.children && menu.children.length >= 1" :key="menu.name">
                <template slot="title">
                  <img :src="menu.icon" alt="" v-if="menu.icon && menu.icon.length > 10">
                  <span slot="title">{{menu.title}}</span>
                </template>
                <el-menu-item :index="i.name"  v-for="i in menu.children" :key="i.name">
                  <span slot="title">{{i.title}}</span>
                </el-menu-item>
              </el-submenu>
            </template>
            <div class="nav-btn float-right" v-show="!islogin">
              <button type="button" class="" @click="login">登录</button>
              <button type="button" class="" @click="registe">注册</button>
            </div>

            <!-- <div class="header-avatar float-right" v-show="islogin">
              <el-submenu class="m0" index="控制台">
                <template slot="title">
                  <span style="font-size: 0.8rem;">{{name}}</span>
                </template>
                <el-menu-item index="">
                  <span>用户主页</span> 
                </el-menu-item>
                <el-menu-item index="退出登录">
                  <span>退出登录</span>
                </el-menu-item>
              </el-submenu>
              <img :src="imgurl" alt="" width="40" height="40">
            </div> -->
            <div class="header-avatar float-right" v-show="islogin">
              <el-dropdown @command="selected">
                <span>
                  {{name}}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="用户中心">用户主页</el-dropdown-item>
                  <el-dropdown-item divided command="退出登录">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>

              <img :src="imgurl" alt="" width="40" height="40">
            </div>
          </el-menu>
        </div>
      <!-- </nav> -->
    </header>

    <main role="main">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </main>

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
            <span>电话：029-87893317/87893570</span>
            <span>邮箱：sx_chanyexiehui@163.com</span>
            <span>QQ群：143930757</span>
          </li>
          <li class="nav-item">
            <span>地址：西安市友谊东路334号陕西测绘局办公楼1楼东侧102室</span>
          </li>
        </ul>
        </div>
        <div></div>
        <!-- app二维码 -->
        <div>
          <img src="static/temp/temp-1.png" alt="" @click="$showImg('static/temp/temp-1.png')">
          <p>APP下载<br>(Android版)</p>
        </div>
      </div>
      <p class="text-center" style="margin-top: -70px;">
        Copyright © 2013陕西省地理信息产业协会 ©
        <span style="color: #93BF59;">GLBUS2017 - 2018</span>
        技术支持: 陕西土豆数据科技有限公司
      </p>
    </footer>
  </div>
</template>
<script>
import { headerRouter } from '@/router/router'

export default {
  name: 'home',
  title: '首页',
  data () {
    return {
      activeIndex: headerRouter[0].name,
      headers: headerRouter
    }
  },
  methods: {
    // 切换不同的内容
    handleSelect(key, keyPath) {
      if (!key) {
        this.$promptMsg()
      }
      if (key === '退出登录') {
        this.loginOut()
        return
      }
      this.$router.replace({name: key, params: {page: key}})
    },
    // 去登录
    login () {
      this.$router.push({name: 'login'})
    },
    // 去注册
    registe () {
      this.$router.push({name: 'register'})
    },
    // 登录后点击用户中心
    selected (item) {
      if (item === '用户中心') {
        this.activeIndex = '';
        this.$promptMsg()
      } else if (item === '退出登录') {
        // 通知后台退出登录
        // axios.post('/mscs/user/logout', this.$paramsConvert({userName: this.$store.state.user.user.user.username}))
        this.$store.commit('loginOut')
        // 当用户点击退出登录时，判断用户是否在首页相关页面，不在则要回退首页
        if (!this.getRouterData(this.headers, this.$route.name)) {
          this.$router.push({name: this.headers[0].name})
        }
      }
    },
    // 激活的内容
    getIndex (to) {
      let routerNames = to.path.split('/')
      this.activeIndex  = to.matched.length >= 3  ? routerNames[2] : routerNames[1]
    },
    // 递归处理
    getRouterData (routes, name) {
      return routes.some((item) => {
        if (item.name === name) {
          return true
        }
        if (item.children && item.children.length > 0) {
          return this.getRouterData(item.children, name)
        }
      })
    }
  },
  watch: {
    '$route' (to, from) {
      this.getIndex(to)
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.getIndex(to)
    })
  },
  computed: {
    // 用户头像
    imgurl () {
      if (!this.$store.state.user.user) {
        return 'static/temp/temp-2.jpg'
      }
      let url = this.$store.state.user.user.userDetails ? this.$store.state.user.user.userDetails.profilePicture : null
      return url ? url : 'static/temp/temp-2.jpg'
    },
    // 是否登录
    islogin () {
      return this.$store.state.user.isLogin
    },
    // 是否在首页
    isHome () {
      return false
    },
    // 用户昵称
    name () {
      return '用户昵称'
    }
  }
}
</script>
<style lang="scss">
  .home-header .el-menu-item, .home-header .el-submenu__title {
    font-size: 18px!important;
  }
  .home-header .is-active span {
    padding-bottom: 6px;
    border-bottom: 2px solid #94C05A;
  }
  
  .home-header .el-menu-item.is-active, 
  .home-header .el-submenu.is-active .el-submenu__title {
    color: #94C05A!important;
    border-bottom: 0px!important;
    border-bottom-color: transparent!important;
  }
  .home-header .el-submenu__title .el-submenu__icon-arrow {
    display: none;
  }
  .el-menu--horizontal {
      border: none!important;
  }
  .el-menu--horizontal .el-menu .el-menu-item.is-active {
    color: #94C05A!important;
  }
  .nav-btn {
    height: 60px;
    > button {
      height: 100%;
      outline: none;
      background: none;
      border: none;
      color: #FFFFFF;
      width: 60px;
      font-size: 18px;
      cursor: pointer;
    }
  }
  /* 脚步处理样式 */
  #appfooter {
    height: auto!important;
    font-size: 14px;
    color: #C0C0C0;
    padding-bottom: 50px;
  }
  #appfooter > div {
    padding: 40px 100px;
  }
  #appfooter > div >div:nth-child(1) {
    display: inline-block;
    width: 125px;
  }

  #appfooter > div >div:nth-child(2), #appfooter > div >div:nth-child(4) {
    width: 1px;
    height: 85px;
    background-color: #C0C0C0;
    margin-top: 13px;
  }
  #appfooter > div >div:nth-child(3) {
    display: inline-block;
    width: 770px;
    padding-left: 50px;
    height: 100px;
  }
  #appfooter > div >div:nth-child(3) span {
    display: inline-block;
    padding: 8px 16px;
  }
  #appfooter > div >div:nth-child(5) {
    display: inline-block;
    width: 165px;
    padding-left: 60px;
  }
  #appfooter > div >div:nth-child(5) img {
    width: 100px;
    cursor: url(../../assets/big.png), auto;
    /* cursor: pointer; */
  }
  #appfooter > div >div:nth-child(5) p {
    text-align: center;
    margin-top: 25px;
  }
  #appfooter a {
    color: #C0C0C0;
    text-decoration: none;
  }
  #appfooter a:hover {
    color: #94C05A;
  }
  .header-avatar {
    outline: none;
    display: flex;
    align-items: center;
    height: 60px;
    font-size: 16px;
  }
  .header-avatar img {
    height: 40px;
    border-radius: 50%;
    margin-left: 10px;
    /* margin-top: 10px; */
  }
  .header-avatar .el-dropdown {
    color: #FFFFFF;
    cursor: pointer;
  }
  .header-avatar .hear-notification {
    font-size: 20px;
    color: #FFFFFF;
    cursor: pointer;
  }
</style>
