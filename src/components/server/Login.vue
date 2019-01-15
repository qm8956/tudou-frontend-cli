<template>
  <el-row id="login">
    <el-col hidden-md-and-down :md="13">
      <el-carousel trigger="click" height="150px">
        <el-carousel-item v-for="(item, index) in imgs" :key="index">
          <div class="zoomImage-100" :style="{backgroundImage: 'url(' + item.src + ')'}"></div>
        </el-carousel-item>
      </el-carousel>
    </el-col>
    <el-col :xs="24" :sm="24" :md="11" style="position: relative;">
      <div>
         <div class="login-rigth wow fadeInUp" data-wow-duration="2s" data-wow-offset="100">
           <p>登录</p>
           <h3>Loign with your account</h3>
           <div class="icon-input">
             <img src="static/username.png" alt="">
             <input type="text"  placeholder="User name" v-model="user.username"/>

           </div>
           <div class="icon-input">
             <img src="static/password.png" alt="">
             <input type="password" placeholder="Password" v-model="user.password"/>

           </div>
           <div class="remeber">
             <el-checkbox v-model="checked">记住我</el-checkbox>
           </div>
           <button class="btn btn-default" type="button" name="button" @click="login()">登录</button>
           <span @click="register()">
             如果你还没有账号，点击注册
           </span>
         </div>
       </div>
    </el-col>
  </el-row>
</template>

<script>
import axios from 'axios'

export default {
  name: "login",
  title: "登录",
  data () {
    return {
      user: {
        username: '',
        password: ''
      },
      checked: false,
      imgs: [
        {src: 'static/login1.jpg'},
        {src: 'static/login2.jpg'},
        {src: 'static/login3.jpg'},
        {src: 'static/login4.jpg'},
      ]
    }
  },
  mounted () {
    // new WOW().init()
  },
  methods: {
    login () {
      this.$store.dispatch('setUser', {
        isLogin: true,
        token: `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NDc1M
          TU1MjcsImlhdCI6MTU0NzUxNTQyNywiaXNzIjoia2VuIiwiZGF0YSI6eyJpZCI6
          MSwibG9naW5fdGltZSI6MTU0NzUxNTQyNn19.rfj6HZE5upTSGLBLILufyZEpx-gZsX4MlCINIy15tyA`,
        user: {
          avatar: "static/timg.jpg",
          email: "qianming@126.com",
          id: 1,
          login_time: 1547515426,
          nick_name: "雏田",
          password: "pbkdf2:sha256:50000$6DtHzrUc$64babc013f9561cc7b7c1fd51f7a54b80c397df851a0abdc26986597a2ee37e6",
          phone: "1234567980",
          self_introduction: "哈哈",
          username: "qm"
        }
      })
      this.$router.push({name: 'home_index'})
      // axios.post('login', this.$paramsConvert(this.user)).then(res => {
      //   if (res.data.status) {
      //     this.$store.dispatch('setUser', res.data.data)
      //     this.$router.push({name: 'home_index'})
      //   } else {
      //     this.$codeError(res)
      //   }
      // }).catch(error => {
      //   this.$catchError(error)
      // })
    },
    register () {
      this.$router.push({name: 'regist'})
    }
  }
}
</script>
<style lang="scss">
  @import './login.scss'
</style>
