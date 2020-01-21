<template>
  <div class="article_content">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <div class="top">
        <el-form-item label="账号" prop="username">
          <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-image
          class="code_div"
          :src="url"
          :fit="fit"
          v-on:click="change_code">
        </el-image>
        <el-form-item label="验证码" prop="code">
          <el-input v-model="ruleForm.code"></el-input>
        </el-form-item>
      </div>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'ArticleEdit',
  data () {
    return {
      fit: 'contain',
      url: '',
      ruleForm: {
        username: 'admin',
        password: '123456',
        code: ''
      },
      ruleCode: {
        id: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { max: 20, message: '长度最大 20 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      }
    }
  },
  created: function () {
    this.change_code_api()
  },
  methods: {
    submitForm (formName) {
      let _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios({
            method: 'get',
            url: '/oo/verify/' + this.$data.ruleCode.id + '/' + this.$data.ruleForm.code
          }).then(response => {
            if (response.data.code === 200) {
              _this.$axios({
                method: 'post',
                url: '/oo/login',
                data: this.$data.ruleForm
              }).then(function (response) {
                if (response.data.code === 200) {
                  window.localStorage['token'] = response.data.data.token
                  _this.$parent.is_login = true
                  if (_this.$route.query.redirect) {
                    _this.$router.push({path: decodeURIComponent(_this.$route.query.redirect)})
                  } else {
                    _this.$router.push('/')
                  }
                } else {
                  _this.$message.error(response.data.message)
                  _this.$data.ruleForm.code = ''
                  _this.change_code_api()
                }
              }).catch(function (error) {
                _this.$message.error(error)
              })
            } else {
              _this.$message.error(response.data.message)
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    change_code (event) {
      this.change_code_api()
    },
    change_code_api () {
      let _this = this
      this.$axios({
        method: 'get',
        url: '/oo/captcha'
      }).then(function (response) {
        _this.$data.url = process.env.API_BASE_PATH + '/oo' + response.data.imageUrl
        _this.$data.ruleCode.id = response.data.captchaId
      })
    }
  }
}
</script>

<style>
.article_content {
  width: 90%;
  padding: 3.125rem 0.625rem;
  margin: 1.25rem auto;
  padding-left: 2.375rem;
  background-color: #FFFFFF;
}
.top {
  width: 30%;
  margin: auto;
}
.code_div {
  margin-bottom: 0.625rem;
  width: 8.75rem;
  height: 2.5rem;
}
</style>
