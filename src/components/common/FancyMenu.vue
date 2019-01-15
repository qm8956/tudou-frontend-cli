<template>
  <div class="" id="fancy-menu" ref="menu" style="top: 100px; left: 100px;position: absolute;"
    @mousedown="mouseDown($event)"
    @mousemove="mouseMove($event)"
    @mouseup="mouseUp($event)">
    <nav class="menu">
      <input type="checkbox" v-model="open" href="#" class="menu-open" name="menu-open" id="menu-open"/>
      <label class="menu-open-button" for="menu-open">
        <span class="hamburger hamburger-1"></span>
        <span class="hamburger hamburger-2"></span>
        <span class="hamburger hamburger-3"></span>
      </label>

      <a href="#" class="menu-item"> <i class="icon-home"></i> </a>
      <a href="#" class="menu-item"> <i class="icon-look"></i> </a>
      <a href="#" class="menu-item"> <i class="icon-qr-code"></i> </a>
      <a href="#" class="menu-item"> <i class="icon-solid-like"></i> </a>
      <a href="#" class="menu-item"> <i class="icon-safe"></i> </a>
      <a href="#" class="menu-item"> <i class="icon-lock"></i> </a>

    </nav>
  </div>
</template>

<script>
export default {
  name: "fancymenu",
  title: "幻彩菜单",
  data () {
    return {
      open: false,
      isDowm: false,
      objX: 0,
      objY: 0,
      mouseX: 0,
      mouseY: 0
    }
  },
  methods: {
    mouseDown(e) {
      let el = this.$refs.menu
      el.style.cursor = "move"
      this.objX = el.style.left
      this.objY = el.style.top
      this.mouseX = e.clientX
      this.mouseY = e.clientY
      this.isDowm = true
    },
    mouseMove(e) {
      let el = this.$refs.menu
      let x = e.clientX
      let y = e.clientY
      if (this.isDowm) {
        el.style.left = parseInt(this.objX) + parseInt(x) - parseInt(this.mouseX) + "px"
        el.style.top = parseInt(this.objY) + parseInt(y) - parseInt(this.mouseY) + "px"
      }
    },
    mouseUp(e) {
      if (this.isDowm) {
        let el = this.$refs.menu
        el.style.cursor = "default"
        this.isDowm = false
      }
    }
  }
}
</script>

<style lang="scss">
  @import './fancy.scss'
</style>
