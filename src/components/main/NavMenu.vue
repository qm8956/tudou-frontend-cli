<template>
  <v-container fluid class="pa-0">
    <v-layout column fill-height>
      <nav-header ref="header"></nav-header>
        <v-window 
          v-model="activeBtn" 
          class="nav-menu-body"
          :touch="{
            left: () => swipe('left'),
            right: () => swipe('right'),
          }">
            <v-window-item>
              <one></one>
            </v-window-item>
            <v-window-item>
              <two></two>
            </v-window-item>
            <v-window-item>
              <three></three>
            </v-window-item>
          </v-window>
        <v-bottom-nav
          :active.sync="activeBtn"
          :value="showNav"
          absolute
          color="transparent"
        >
        <v-btn flat color="teal">
          <span>首页</span>
          <v-icon>import_contacts</v-icon>
        </v-btn>

        <v-btn flat color="teal">
          <span>动态</span>
          <v-icon>mode_comment</v-icon>
        </v-btn>

        <v-btn flat color="teal">
          <span>我的</span>
          <v-icon>account_circle</v-icon>
        </v-btn>
      </v-bottom-nav>
    </v-layout>
  </v-container>
</template>
<script>
import NavHeader from './NavHeader.vue'
import One from './One.vue'
import Two from './Two.vue'
import Three from './Three.vue'

export default {
  name: 'nav-menu',
  title: '导航菜单',
  components: {
    NavHeader,
    One,
    Two,
    Three
  },
  data() {
    return {
      activeBtn: 1,
      showNav: true,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
    }
  },
  methods: {
    swipe (direction) {
      if (direction === 'left') {
        if (this.activeBtn < 2) {
          this.activeBtn +=1
        } else {
          this.$refs.header.sheet = true
        }
        
      } else if (direction === 'right') {
        if (this.activeBtn > 0) {
          this.activeBtn -=1
        } else {
          console.log('zenmelaoshibudui');
          this.$refs.header.drawer = true
        }
      }
    }
  }
}
</script>
<style lang="scss">
  .nav-menu-body {
    flex: 1;
    height: 500px;
    padding: 0;
    margin-bottom: 56px;
    overflow-y: auto;
  }
</style>
