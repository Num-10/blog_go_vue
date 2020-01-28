<template>
  <div class="article_content_edit">
    <el-page-header @back="goBack" content="文章详情"></el-page-header>
    <br><br>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <div class="top">
        <el-form-item label="标题" prop="title">
          <el-input type="text" maxlength="100" show-word-limit v-model="ruleForm.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类" prop="tag_id" class="form_select">
          <el-select v-model="ruleForm.tag_id" placeholder="请选择分类">
            <el-option
              v-for="item in tagList"
              :key="item.value"
              :label="item.title"
              :value="item.tag_id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述" prop="desc">
          <el-input type="textarea" rows="5" maxlength="100" v-model="ruleForm.desc" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="显示状态" class="form_switch">
          <el-switch v-model="ruleForm.status"></el-switch>
        </el-form-item>
        <el-form-item label="是否加精" class="form_switch">
          <el-switch v-model="ruleForm.is_marrow"></el-switch>
        </el-form-item>
        <el-form-item label="是否置顶" class="form_switch">
          <el-switch v-model="ruleForm.is_top"></el-switch>
        </el-form-item><br>
        <el-form-item label="排序" prop="sort">
          <el-input type="text" v-model.number="ruleForm.sort" autocomplete="off"></el-input>
        </el-form-item>
      </div>
      <div class="content">
        <el-form-item label="标题" prop="title">
          <el-input type="text" maxlength="20" show-word-limit v-model="ruleForm.title" autocomplete="off"></el-input>
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
  name: 'ArticleEdit',
  data () {
    return {
      article_id: 0,
      tagList: [],
      ruleForm: {
        title: '',
        desc: '',
        sort: 0,
        status: true,
        is_top: false,
        is_marrow: false,
        tag_id: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { max: 100, message: '长度最大 100 个字符', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '请输入描述', trigger: 'blur' },
          { max: 255, message: '长度最大 255 个字符', trigger: 'blur' }
        ],
        tag_id: [
          { required: true, message: '请选择分类', trigger: 'blur' },
          { type: 'number', message: '请选择分类', trigger: 'blur' }
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
    this.$data.article_id = this.$route.params.article_id
    if (this.$data.article_id > 0) {
      this.$axios({
        method: 'get',
        url: '/ao/tag/find/' + this.$data.article_id,
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
    this.$axios({
      method: 'get',
      url: '/oo/tag/list',
      params: {
        page: 1,
        page_size: 1000
      }
    }).then(response => {
      if (response.data.code === 200) {
        _this.$data.tagList = response.data.data.list
      } else {
        _this.$message.error(response.data.message)
      }
    })
  },
  methods: {
    submitForm (formName) {
      let _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios({
            method: 'post',
            url: '/ao/article/save/' + this.$data.article_id,
            data: this.$data.ruleForm
          }).then(response => {
            if (response.data.code === 200) {
              _this.$message.success('操作成功！')
              setTimeout(function () {
                _this.$router.push('/article_list')
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
.article_content_edit {
  width: 90%;
  padding: 1.25rem 1.875rem 1.25rem 0.625rem;
  margin: 1.25rem auto;
  padding-left: 2.375rem;
  background-color: #FFFFFF;
}
.top {
  width: 40%;
  margin: auto;
}
.code_div {
  margin-bottom: 0.625rem;
  width: 8.75rem;
  height: 2.5rem;
}
.form_switch {
  text-align: left;
  display: table-cell;
  margin-bottom: 0.625rem;
}
.form_select {
  text-align: left;
}
</style>
