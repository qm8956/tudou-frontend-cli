<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created () {
    //在页面加载时读取localStorage里的状态信息
    localStorage.getItem("client-state") && this.$store.replaceState(Object.assign(this.$store.state,JSON.parse(localStorage.getItem("client-state"))))
    //在页面刷新时将vuex里的信息保存到localStorage里
    window.addEventListener("beforeunload",()=>{
      localStorage.setItem("client-state",JSON.stringify(this.$store.state))
    })
  } 
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
