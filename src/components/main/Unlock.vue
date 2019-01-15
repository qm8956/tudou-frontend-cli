<template>
<div class="unlock d-flex align-items-center justify-content-center">
  <img src="static/timg.jpg" alt="">
  <el-input
    placeholder="输入登陆密码"
    type="password"
    @keyup.enter.native="handleUnlock()"
    v-model="password">
    <el-button slot="suffix" type="success" round @click="handleUnlock">解锁</el-button>
  </el-input>
</div>
</template>

<script>
export default {
  name: 'Unlock',
  data() {
    return {
      password: '',
    };
  },
  computed: {
    avatorPath() {
      return localStorage.avatorImgPath
    }
  },
  methods: {
    // 解锁
    handleUnlock() {
      if (this.password === '123456') {
        localStorage.locking = 0
        this.$emit('on-unlock')
      } else {
        this.$message.error('密码错误')
      }
    }
  }
};
</script>
<style lang="scss">
  .unlock {
    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      margin-right: -20px;
      z-index: 1;
    }
    input {
      border-radius: 20px;
      height: 44px;
      width: 300px;
      padding-left: 30px;
      padding-right: 90px!important;
    }
    button {
      outline: none;
    }
    .el-input__suffix {
      margin: 2px 0;
    }
  }
</style>
