<template>
  <div class="d-flex flex-row justify-content-between h-100">
    <!-- 左侧 -->
    <div class="d-flex flex-row">
      <el-button type="text" icon="icon-menu" :class="{'hide-menu': isHide}" style="outline: none;font-size: 1.5rem;"  @click="openOrClose"></el-button>
    </div>
    <!-- 右侧 -->
    <div class="d-flex align-items-center">
      <lock-screen></lock-screen>
      <el-dropdown class="ml-3" @command="selectTags">
        <span class="el-dropdown-link">
          {{nickName}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="personInfo">个人信息</el-dropdown-item>
          <el-dropdown-item command="changPs">修改密码</el-dropdown-item>
          <el-dropdown-item divided command="loginOut">退出登陆</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <img :src="avatar" alt="..." style="width: 35px;" class="rounded-circle ml-3">
    </div>
  </div>
</template>

<script>
import LockScreen from './LockScreen'
export default {
  name: "main-heard",
  title: "主界面顶部导航区",
  data () {
    return {
      isHide: false
    }
  },
  methods: {
    openOrClose () {
      this.isHide = !this.isHide
      this.$emit('open-close')
    },
    selectTags (str) {
      if (str === 'personInfo') {
        this.$router.push({name: 'person-info'})
      } else if (str === 'changPs') {
        this.$router.push({name: 'change-ps'})
      } else if (str === 'loginOut') {
        this.$router.push({name: 'login'})
        this.$store.dispatch('loginOut')
      }
    }
  },
  computed: {
    avatar () {
      return this.$store.state.user.user.avatar ? this.$store.state.user.user.avatar : 'static/timg.jpg'
    },
    nickName () {
      return this.$store.state.user.user.nick_name ? this.$store.state.user.user.nick_name : this.$store.state.user.user.username
    }
  },
  components: {
    LockScreen
  }
}
</script>

<style>
 .hide-menu {
   transform: rotateZ(-90deg);
 }
 .el-dropdown-link {
    cursor: pointer;
  }
</style>
