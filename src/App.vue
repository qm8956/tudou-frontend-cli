<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted () {
    window.onresize = this.reHeight
    this.reHeight()
  },
  methods: {
    reHeight () {
      let he = document.documentElement.clientHeight
      this.$store.dispatch('increment', he - 60 - 32 - 43)
    }
  }
}
</script>
