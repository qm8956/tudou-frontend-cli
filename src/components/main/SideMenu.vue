<template>
  <el-menu :default-active="$route.name" class="el-menu-vertical" data-simplebar @open="handleOpen" @close="handleClose" @select="handSelected" :collapse="isCollapse">
    <template v-for="(menu, index) in menuList" >
      <!-- 只有一个的菜单 -->
      <el-menu-item :index="menu.children[0].name"  v-if="menu.children.length <= 1" :key="index">
        <i :class="menu.icon"></i>
        <span slot="title">{{menu.title}}</span>
      </el-menu-item>
      <!-- 二级菜单 -->
      <el-submenu :index="menu.title" v-if="menu.children.length > 1" :key="index">
        <template slot="title">
          <i :class="menu.icon"></i>
          <span slot="title" v-show="!isCollapse">{{menu.title}}</span>
        </template>
        <el-menu-item :index="i.name"  v-for="i in menu.children" :key="i.name">
          <i :class="i.icon"></i>
          <span slot="title">{{i.title}}</span>
        </el-menu-item>
      </el-submenu>
    </template>
  </el-menu>
</template>

<script>
export default {
  name: "side-menu",
  title: "侧边导航菜单",
  data () {
    return {
      isCollapse: false
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    handSelected (key, keyPath) {
      console.log(key);
      this.$router.push({name: key})
    },
    openOrClose () {
      this.isCollapse = !this.isCollapse
    }
  },
  computed: {
    menuList () {
      return this.$store.state.app.menuList
    }
  }
}
</script>

<style lang="scss">
  .el-menu {
    width: 200px;
    i[class^='icon-'] {
      font-size: 20px;
    }
  }
  .el-menu--collapse {
    i[class^='icon-'] {
      font-weight: 400;
      color: #FFFFFF;
    }
  }
  .el-menu-vertical {
    background-color: transparent!important;
    border: none!important;
    max-height: 700px!important;
    overflow: auto!important;
    overflow-x: hidden!important;
    .el-menu {
      border: none!important;
      background-color: transparent!important;

      .el-menu-item {
        color: #e0e0e0;
        // border-bottom: 1px solid #666666;
      }
    }
    .el-menu-item {
      color: #e0e0e0;
      // border-bottom: 1px solid #666666;
    }
    .el-menu-item:focus, .el-menu-item:hover {
      background-color: rgba(0,0,0, 0.2);
    }
    .el-menu-item.is-active {
      color: #FFFFFF;
      background-color: rgba(0,0,0, 0.2);
    }
    .el-submenu__title:hover {
      background-color: rgba(0,0,0, 0.2);
    }
    .el-submenu__title {
      color: #e0e0e0;
      // border-bottom: 1px solid #666666;
    }

  }
  .el-menu--collapse {
    width: 60px;
  }
</style>
