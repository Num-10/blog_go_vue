<template>
  <div class="category_content_edit">
    <el-page-header @back="goBack" content="标签详情"></el-page-header>
    <br><br>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <div class="top">
        <el-form-item label="标签名" prop="title">
          <el-input type="text" maxlength="20" show-word-limit v-model="ruleForm.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input type="text" v-model.number="ruleForm.sort" autocomplete="off"></el-input>
        </el-form-item>
      </div>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
const validateAcquaintance = (rule, value, callback) => {
  // 输入 8--，value 为 8
  // 估计这里内部使用了 parseInt() / parseFloat()
  if (value < 0 || value > 99) {
    callback(new Error('排序在 0 至 99 之间'))
  } else {
    callback()
  }
}

export default {
  name: 'CategoryEdit',
  data () {
    return {
      tag_id: 0,
      ruleForm: {
        title: '',
        sort: 0
      },
      rules: {
        title: [
          { required: true, message: '请输入标签名', trigger: 'blur' },
          { max: 20, message: '长度最大 20 个字符', trigger: 'blur' }
        ],
        sort: [
          {
            type: 'number',
            message: '排序必须为数字',
            trigger: 'blur'
          }, {
            validator: validateAcquaintance, // 自定义验证
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created: function () {
    let _this = this
    this.$data.tag_id = this.$route.params.tag_id
    if (this.$data.tag_id > 0) {
      this.$axios({
        method: 'get',
        url: '/ao/tag/find/' + this.$data.tag_id,
        data: {}
      }).then(response => {
        if (response.data.code === 200) {
          _this.$data.ruleForm.title = response.data.data.title
          _this.$data.ruleForm.sort = response.data.data.sort
        } else {
          _this.$message.error(response.data.message)
        }
      })
    }
  },
  methods: {
    submitForm (formName) {
      let _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios({
            method: 'post',
            url: '/ao/tag/save/' + this.$data.tag_id,
            data: this.$data.ruleForm
          }).then(response => {
            if (response.data.code === 200) {
              _this.$message.success('操作成功！')
              setTimeout(function () {
                _this.$router.push('/category_list')
              }, 1000)
            } else {
              _this.$message.error(response.data.message)
            }
          })
        } else {
          return false
        }
      })
    },
    goBack: function () {
      this.$router.go(-1)
    }
  }
}
</script>

<style>
.category_content_edit {
  width: 50%;
  padding: 1.25rem 1.875rem 1.25rem 0.625rem;
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
