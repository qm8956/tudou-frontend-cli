<template>
  <el-form :model="person" :rules="rules" ref="person" label-width="100px" class="w-50">
    <el-form-item label="用户名" prop="username">
      <el-input v-model="person.username"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="person.password"></el-input>
    </el-form-item>
    <el-form-item label="邮箱">
      <el-input v-model="person.email"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="regist">注册</el-button>

      <el-button type="default" @click="back">返回</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import axios from 'axios'
export default {
  name: "registe",
  title: "注册表单",
  data () {
    return {
      person: {
        username: '',
        password: '',
        email: ''
      },
      rules: {
        username: [{
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 15,
            message: '用户名长度在 1 到 15 个字符',
            trigger: 'blur'
        }],
        password: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 20,
            message: '密码长度在 6 到 20 个字符',
            trigger: 'blur'
        }],
      }
    }
  },
  methods: {
    regist () {
      this.$refs.person.validate((valid) => {
        if (valid) {
          axios.post('register', this.$paramsConvert(this.person)).then(res => {
            if (res.data.status) {
              this.$message({
                showClose: true,
                message: res.data.msg,
                type: 'success'
              })
              this.$router.push({name: 'login'})
            } else {
              this.$codeError(res)
            }
          }).catch(error => {
            this.$catchError(error)
          })
        }
      })
    },
    back () {
      this.$router.go(-1)
    }

  }
}
</script>
