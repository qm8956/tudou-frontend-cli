<template>
  <div class="main-width mx-auto bg-dark" style="overflow: hidden;">
    <el-menu :default-active="activeIndex" ref="menu" class="home-header" mode="horizontal"
      @select="handleSelect" background-color="#343a40" text-color="#fff">
      <template v-for="menu in headers">
        <!-- 只有一个的菜单 -->
        <el-menu-item :index="menu.name" v-if="!(menu.children && menu.children.length > 0)"
          :key="menu.name">
          <img :src="menu.icon" alt="" v-if="menu.icon && menu.icon.length > 10"
            style="height: 50px;">
          <span slot="title" v-if="!(menu.icon && menu.icon.length > 10)">{{menu.title}}</span>
        </el-menu-item>
        <!-- 二级菜单 -->
        <el-submenu :index="menu.title" v-if="menu.children && menu.children.length >= 1"
          :key="menu.name">
          <template slot="title">
            <img :src="menu.icon" alt="" v-if="menu.icon && menu.icon.length > 10">
            <span slot="title">{{menu.title}}</span>
          </template>
          <el-menu-item :index="i.name" v-for="i in menu.children" :key="i.name">
            <span slot="title">{{i.title}}</span>
          </el-menu-item>
        </el-submenu>
      </template>
      <div class="nav-btn float-right" v-show="!islogin">
        <button type="button" class="" @click="login">登录</button>
        <button type="button" class="" @click="registe">注册</button>
      </div>
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
</template>
<script>
import { headerRouter } from '@/router/router'

export default {
  name: 'mainheader',
  title: '主页顶部导航',
  data() {
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
      this.$router.replace({ name: key, params: { page: key } })
    },
    // 去登录
    login() {
      this.$router.push({ name: 'login' })
    },
    // 去注册
    registe() {
      this.$router.push({ name: 'register' })
    },
    // 登录后点击用户中心
    selected(item) {
      if (item === '用户中心') {
        this.activeIndex = '';
        this.$promptMsg()
      } else if (item === '退出登录') {
        // 通知后台退出登录
        // axios.post('/mscs/user/logout', this.$paramsConvert({userName: this.$store.state.user.user.user.username}))
        this.$store.commit('loginOut')
        // 当用户点击退出登录时，判断用户是否在首页相关页面，不在则要回退首页
        if (!this.getRouterData(this.headers, this.$route.name)) {
          this.$router.push({ name: this.headers[0].name })
        }
      }
    },
    // 激活的内容
    getIndex(to) {
      let routerNames = to.path.split('/')
      this.activeIndex = to.matched.length >= 3 ? routerNames[2] : routerNames[1]
    },
    // 递归处理
    getRouterData(routes, name) {
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
    '$route'(to, from) {
      this.getIndex(to)
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getIndex(to)
    })
  },
  computed: {
    // 用户头像
    imgurl() {
      if (!this.$store.state.user.user) {
        return 'static/temp/temp-2.jpg'
      }
      let url = this.$store.state.user.user.userDetails ? this.$store.state.user.user.userDetails.profilePicture : null
      return url ? url : 'static/temp/temp-2.jpg'
    },
    // 是否登录
    islogin() {
      return this.$store.state.user.isLogin
    },
    // 是否在首页
    isHome() {
      return false

    },
    // 用户昵称
    name() {
      return '用户昵称'
    }
  }
}
</script>
<style lang='scss'>
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
  color: #ffffff;
  cursor: pointer;
}
.header-avatar .hear-notification {
  font-size: 20px;
  color: #ffffff;
  cursor: pointer;
}
</style>