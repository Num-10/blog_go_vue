<template>
  <div class="article_content">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <div class="top">
        <el-form-item label="标签名" prop="title">
          <el-input type="text" v-model="ruleForm.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input type="text" v-model="ruleForm.sort" autocomplete="off"></el-input>
        </el-form-item>
      </div>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'CategoryEdit',
  data () {
    return {
      url: '',
      ruleForm: {
        title: '',
        sort: 0
      },
      ruleCode: {
        id: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入标签名', trigger: 'blur' },
          { max: 20, message: '长度最大 20 个字符', trigger: 'blur' }
        ],
        sort: [
          { type: 'number', range: [0, 99], message: '长度在 1 到 3 个字符' }
        ]
      }
    }
  },
  created: function () {
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
    }
  }
}
</script>

<style>
.article_content {
  width: 50%;
  padding: 3.125rem 0.625rem;
  margin: 1.25rem auto;
  padding-left: 2.375rem;
  background-color: #FFFFFF;
}
.top {
  width: 50%;
  margin: auto;
}
.code_div {
  margin-bottom: 0.625rem;
  width: 8.75rem;
  height: 2.5rem;
}
</style>
