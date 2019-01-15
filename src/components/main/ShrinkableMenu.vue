<template>
  <div class="shrinkable-menu d-flex justify-content-between">
    <div class="">
      <el-tabs v-model="currentPageName" type="card" closable @tab-remove="removeTab"  @tab-click="selectTab">
        <el-tab-pane
          class="tab-open-close"
          :key="tab.title"
          v-for="tab in pageOpenedList"
          :label="tab.title"
          :name="tab.name"
        >
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="">
        <el-dropdown @command="clearTags">
         <span class="el-dropdown-link">
           标签选项<i class="el-icon-arrow-down el-icon--right"></i>
         </span>
         <el-dropdown-menu slot="dropdown">
           <el-dropdown-item command="clearOthers">关闭其他</el-dropdown-item>
           <el-dropdown-item command="clearAll">全部关闭</el-dropdown-item>
         </el-dropdown-menu>
       </el-dropdown>
    </div>
  </div>
</template>

<script>

export default {
  name: 'shrinkable-menu',
  title: '顶部导航页签',
  data () {
    return {
      currentPageName: this.$route.name,
    }
  },
  methods: {
    selectTab (tab) {
      this.$router.push({name: tab.name})
    },
    removeTab (name) {
      let lastPageObj = this.pageOpenedList[0];
      if (this.currentPageName === name) {
        // 选出下一个激活的页签
        let len = this.pageOpenedList.length
        for (let i = 1; i < len; i++) {
          if (this.pageOpenedList[i].name === name) {
            if (i < (len - 1)) {
              lastPageObj = this.pageOpenedList[i + 1]
            } else {
              lastPageObj = this.pageOpenedList[i - 1]
            }
            break;
          }
        }
      }
      this.$store.commit('removeTag', name)
      this.$store.commit('closePage', name)
      localStorage.pageOpenedList = JSON.stringify(this.pageOpenedList)
      if (this.currentPageName === name) {
        // 激活下一个
        this.linkTo(lastPageObj)
      }
    },
    linkTo (item) {
      let routerObj = {};
      routerObj.name = item.name
      if (item.argu) {
        routerObj.params = item.argu
      }
      if (item.query) {
        routerObj.query = item.query
      }
      this.$router.push(routerObj)
    },
    clearTags (type) {
      if (type === 'clearAll') {
        this.$store.commit('clearAllTags')
        this.$router.push({
          name: 'home_index'
        })
      } else if (type === 'clearOthers') {
        this.$store.commit('clearOtherTags', this)
      }
    }
  },
  watch: {
    '$route' (to) {
      this.currentPageName = to.name
    }
  },
  computed: {
    pageOpenedList () {
      return this.$store.state.app.pageOpenedList // 打开的页面的页面对象
    }
  }
}
</script>
<style lang="scss">
  .shrinkable-menu {
    height: 35px;
    box-shadow: 0 .125rem 0 rgba(0,0,0,.075);
    margin-bottom: 8px;
    .el-tabs__nav,
    .el-tabs__header,
    .el-tabs__item {
      border: none!important;
    }
    #tab-home_index {
      .el-icon-close {
        display: none;
      }
    }
    .el-icon-close {
      width: 14px!important;
    }
    .is-active {
      &::before {
        background-color: #409EFF;
      }
    }
    div[id^='tab-']{
      height: 30px;
      line-height: 30px;
      padding: 0 9px!important;
      margin-right: 8px;
      border: none;
      border-radius: 5px;
      background-color: #FFFFFF;
      &:hover {
        padding: 0 9px!important;
      }
      &::before {
        content: '';
        width: 12px;
        height: 12px;
        margin-top: 9px;
        margin-right: 5px;
        border-radius: 50%;
        background-color: #E8E9EB;
        float: left;
      }
    }
    .is-active {
      &::before {
        background-color: #409EFF!important;
      }
    }
    .el-dropdown {
      background-color: #409EFF;
      height: 30px;
      line-height: 30px;
      color: #FFFFFF;
      padding: 0 10px;
      border-radius: 5px;
    }
  }
</style>
