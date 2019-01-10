<template>
  <div id="login" class="text-center">
    <div class="form-signin">
      <img class="mb-4" src="static/logo_index.png" alt="" >
      <label for="inputEmail" class="sr-only">登录名</label>
      <input type="email" id="inputEmail" class="form-control" placeholder="登录名" required autofocus>
      <label for="inputPassword" class="sr-only">密码</label>
      <input type="password" id="inputPassword" class="form-control" placeholder="密码" required>
      <button class="btn btn-lg btn-primary btn-block" type="submit" @click="confirm">提交注册</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'register',
  title: '注册',
  data() {
    return {}
  },
  methods: {
    confirm () {
      // 提交逻辑
      this.$router.replace({name: 'login'})
    }
  }
}
</script>