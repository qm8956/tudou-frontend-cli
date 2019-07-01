<template>
  <el-container>
    <el-header id="appheader" class="bg-dark">
      <MainHeader />
    </el-header>
    <el-main class="p-0">
      <keep-alive>
        <router-view />
      </keep-alive>
    </el-main>
    <el-footer class="p-0" style="height: 240px;">
      <MainFooter />
    </el-footer>
  </el-container>
</template>
<script>
import MainHeader from './MainHeader'
import MainFooter from './MainFooter'
export default {
  name: 'home',
  title: '首页',
  components: {
    MainHeader,
    MainFooter
  },
  data() {
    return {}
  },
  mounted() {
    if (window.performance) {
      var timeSincePageLoad = Math.round(performance.now())
      console.log('总计耗时：', timeSincePageLoad)
    }
  }
}
</script>
<style lang="scss">
#appheader {
  // background: #0575e6; /* fallback for old browsers */
  // background: -webkit-linear-gradient(to right, #0575e6, #021b79); /* Chrome 10-25, Safari 5.1-6 */
  // background: linear-gradient(to right, #0575e6, #021b79); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.home-header .el-menu-item,
.home-header .el-submenu__title {
  font-size: 18px !important;
}
.home-header .el-menu-item.is-active,
.home-header .el-submenu.is-active .el-submenu__title {
  color: #94c05a !important;
  border-bottom: 0px !important;
  border-bottom-color: transparent !important;
}
.home-header .el-submenu__title .el-submenu__icon-arrow {
  display: none;
}
.el-menu--horizontal {
  border: none !important;
}
.el-menu--horizontal .el-menu .el-menu-item.is-active {
  color: #94c05a !important;
}
</style>
