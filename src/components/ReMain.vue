<template>
<el-container  class="h-100 bg-light" style="background-color: #999;">
  <el-aside class="bg-dark text-white" style="width: auto;">
    <h2 class="text-center">测</h2>
    <side-menu ref="menu"></side-menu>
  </el-aside>
  <el-container>
    <el-header class="shadow-sm bg-white">
      <main-heard @open-close="openOrClose"></main-heard>
    </el-header>
    <el-main class="d-flex flex-column p-3">
      <el-container>
        <el-header class="shadow-sm p-0" style="height: auto;">
          <shrinkable-menu></shrinkable-menu>
        </el-header>
        <el-main class="bg-white p-0 d-flex  bd-highlight">
          <keep-alive :include="cachePage">
            <router-view></router-view>
          </keep-alive>
        </el-main>
      </el-container>
    </el-main>
  </el-container>
  <div class="" style="position: fixed;bottom: 300px;right: 200px;">
    <fancy-menu></fancy-menu>
  </div>
</el-container>
</template>

<script>
import SideMenu from './main/SideMenu'
import MainHeard from './main/MainHeard'
import ShrinkableMenu from './main/ShrinkableMenu'
import FancyMenu from './common/FancyMenu'
import util from '@/libs/util.js'

export default {
  name: 'home',
  title: '主页',
  data () {
    return {
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.$store.commit('updateMenulist')
    },
    openOrClose () {
      this.$refs.menu.openOrClose()
    },
    checkTag (tagName) {
      let openpageHasTag = this.pageTagsList.some(item => {
        if (item.name === tagName) {
          return true
        }
      })
      if (!openpageHasTag) { //  解决关闭当前标签后再点击回退按钮会退到当前页时没有标签的问题
        util.openNewPage(this, tagName, this.$route.params || {}, this.$route.query || {})
      }
    },
    show (menu) {
      return menu && menu.isCollapse
    },
  },
  watch: {
    '$route' (to) {
      this.$store.commit('setCurrentPageName', to.name)
      let pathArr = util.setCurrentPath(this, to.name)
      if (pathArr.length > 2) {
        this.$store.commit('addOpenSubmenu', pathArr[1].name)
      }
      this.checkTag(to.name)
      localStorage.currentPageName = to.name
    }
  },
  computed: {
    pageTagsList() {
      return this.$store.state.app.pageOpenedList // 打开的页面的页面对象
    },
    cachePage() {
      return this.$store.state.app.cachePage
    },
  },
  components: {
    SideMenu,
    ShrinkableMenu,
    MainHeard,
    FancyMenu
  }
}
</script>
