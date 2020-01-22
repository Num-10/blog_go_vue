<template>
  <div class="article_content">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <div class="top">
        <el-form-item label="网址名称" prop="title">
          <el-input type="text" maxlength="20" show-word-limit v-model="ruleForm.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="网址描述" prop="desc">
          <el-input type="text" maxlength="100" show-word-limit v-model="ruleForm.desc" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="网址链接" prop="link">
          <el-input type="text" maxlength="255" show-word-limit v-model="ruleForm.link" autocomplete="off"></el-input>
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
  name: 'LinkEdit',
  data () {
    return {
      tag_id: 0,
      ruleForm: {
        title: '',
        desc: '',
        link: '',
        sort: 0
      },
      rules: {
        title: [
          { required: true, message: '请输入网址名称', trigger: 'blur' },
          { max: 20, message: '长度最大 20 个字符', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '请输入网址描述', trigger: 'blur' },
          { max: 100, message: '长度最大 20 个字符', trigger: 'blur' }
        ],
        link: [
          { required: true, message: '请输入网址链接', trigger: 'blur' },
          { max: 255, message: '长度最大 255 个字符', trigger: 'blur' }
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
  },
  methods: {
    submitForm (formName) {
      let _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios({
            method: 'post',
            url: '/ao/link/save/' + this.$data.tag_id,
            data: this.$data.ruleForm
          }).then(response => {
            if (response.data.code === 200) {
              _this.$message.success('操作成功！')
            } else {
              _this.$message.error(response.data.message)
            }
          })
        } else {
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
