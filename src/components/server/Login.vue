<template>
  <div id="login" class="text-center">
    <div class="form-signin">
      <img class="mb-4" src="static/logo_index.png" alt="" >
      <label for="inputEmail" class="sr-only">登录名</label>
      <input type="text" id="inputEmail" class="form-control" placeholder="登录名" required autofocus>
      <label for="inputPassword" class="sr-only">密码</label>
      <input type="password" id="inputPassword" class="form-control" placeholder="密码" required>
      <div class="checkbox mb-3 text-left">
        <label>
          <input type="checkbox" value="remember-me"> 记住密码
        </label>
      </div>
      <button class="btn btn-lg btn-primary btn-block" @click="login">登 录</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'login',
  title: '登录',
  data() {
    return {}
  },
  methods: {
    login () {
      // 登录逻辑
      this.$store.commit('login', {name: 'ceshi'})
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss">
  #login {
    min-height: 800px;
    display: -ms-flexbox;
    display: -webkit-box;
    display: flex;
    -ms-flex-align: center;
    -ms-flex-pack: center;
    // -webkit-box-align: center;
    // align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    padding-top: 40px;
    padding-bottom: 40px;
    background-color: #f5f5f5;
  }
  .form-signin {
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: 0 auto;
    .checkbox {
      font-weight: 400;
    }
    .form-control {
      position: relative;
      box-sizing: border-box;
      height: auto;
      padding: 10px;
      font-size: 16px;
    }
    .form-control:focus {
      z-index: 2;
    }
     input[type="email"] {
      margin-bottom: -1px;
      border-bottom-right-radius: 0;
      border-bottom-left-radius: 0;
    }
    input[type="password"] {
      margin-bottom: 10px;
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    }
  }
</style>
