<template>
  <div class="back-top" v-show="!isTop">
    <el-tooltip class="item" effect="dark" content="返回顶部" placement="left">
      <el-button icon="el-icon-arrow-up" @click="goTop()"></el-button>
    </el-tooltip>
  </div>
</template>

<script>
export default {
  title: '返回顶部',
  name: 'back-top',
  data () {
    return {
      isTop: true
    }
  },
  mounted () {
    window.scroll = this.scroll
  },
  methods: {
    goTop () {
      cancelAnimationFrame(timer)
      let timer = requestAnimationFrame(function fn(){
        var oTop = document.body.scrollTop || document.documentElement.scrollTop
        if(oTop > 0){
          document.body.scrollTop = document.documentElement.scrollTop = oTop - 50
          timer = requestAnimationFrame(fn)
        }else{
          cancelAnimationFrame(timer)
        }
      })
    },
    scroll () {
      this.isTop = document.documentElement.scrollTop <= 0
    }
  }
}
</script>
<style>
  .back-top {
    position: fixed;
    bottom: 200px;
    right: 100px;
  }
  .back-top .el-button{
    background-color: rgba(0,0,0,0.4);
    color: #FFF;
    font-weight: bold;
    font-size: 25px;
    padding: 8px;
  }
</style>
