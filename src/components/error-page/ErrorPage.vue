<template>
  <div :style="{height: height+'px'}" class="error-page">
    <div class="error-container error" v-if="errorNum === 400">
      <img :src="imgurl" alt="">
      <p>出错了！请求参数错误，无法处理...</p>
      <div class="tc">
        <el-button type="success width-100" plain round @click="back()" style="margin-right: 50px;">返回</el-button>
        <el-button type="success width-100" round @click="goHome()">去首页</el-button>
      </div>
    </div>
    <div class="error-container error" v-if="errorNum === 401">
      <img :src="imgurl" alt="">
      <p>出错了！未有相应权限，访问被拒绝，请重新登录后再访问...</p>
      <div class="tc">
        <el-button type="success width-100" plain round @click="back()" style="margin-right: 50px;">返回</el-button>
        <el-button type="success width-100" round @click="goHome()">去首页</el-button>
      </div>
    </div>
    <div class="error-container error" v-if="errorNum === 403">
      <img :src="imgurl" alt="">
      <p>出错了！你的访问被禁止了...</p>
      <div class="tc">
        <el-button type="success width-100" plain round @click="back()" style="margin-right: 50px;">返回</el-button>
        <el-button type="success width-100" round @click="goHome()">去首页</el-button>
      </div>
    </div>
    <div class="error-container error" v-if="errorNum === 404">
      <img :src="imgurl" alt="">
      <p>访问路径错误！你所查找的页面不存在...</p>
      <div class="tc">
        <el-button type="success width-100" plain round @click="back()" style="margin-right: 50px;">返回</el-button>
        <el-button type="success width-100" round @click="goHome()">去首页</el-button>
      </div>
    </div>
    <div class="error-container error" v-if="errorNum === 405">
      <img :src="imgurl" alt="">
      <p>出错了！用来访问的 HTTP 不被允许...</p>
      <div class="tc">
        <el-button type="success width-100" plain round @click="back()" style="margin-right: 50px;">返回</el-button>
        <el-button type="success width-100" round @click="goHome()">去首页</el-button>
      </div>
    </div>
    <div class="error-container error" v-if="errorNum === 500">
      <img :src="imgurl" alt="">
      <p>出错了！你所访问的服务出问题了...</p>
      <div class="tc">
        <el-button type="success width-100" plain round @click="back()" style="margin-right: 50px;">返回</el-button>
        <el-button type="success width-100" round @click="goHome()">去首页</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    title: '错误页面',
    name: 'error-page',
    data () {
      return {
        errorNum: ''
      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        let path = to.path.split('/')[to.path.split('/').length - 1]
        vm.setPage(path)
      })
    },
    beforeRouteUpdate (to, from, next) {
      this.setPage(to.path.substring(1, to.path.length))
      next()
    },
    methods: {
      back () {
        this.$router.go(-1)
      },
      goHome () {
        this.$router.push({name: 'Home'})
      },
      setPage (str) {
        if (str === '400') {
          this.errorNum = 400
        } else if (str === '401') {
          this.errorNum = 401
        } else if (str === '402') {
          this.errorNum = 402
        } else if (str === '403') {
          this.errorNum = 403
        } else if (str === '405') {
          this.errorNum = 405
        } else if (str === '500') {
          this.errorNum = 500
        } else {
          this.errorNum = 404
        }
      }
    },
    computed: {
      height () {
        return this.$store.state.height.client
      },
      imgurl () {
        return `static/${this.errorNum}.png`
      }
    },
  }
</script>
<style>
  .error-page {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #FFF;
    z-index: 999;
  }
  .error-container {
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
    padding-top: 100px;
  }
  .error-container p{
    font-size: 25px;
    font-weight: bold;
    color: #4d5542;
  }
</style>
