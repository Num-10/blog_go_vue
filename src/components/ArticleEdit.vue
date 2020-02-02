<template>
  <div class="article_content_edit">
    <el-page-header @back="goBack" content="文章详情"></el-page-header>
    <br><br>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <div class="article_top">
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
          <el-switch v-model="status"></el-switch>
        </el-form-item>
        <el-form-item label="是否加精" class="form_switch">
          <el-switch v-model="is_marrow"></el-switch>
        </el-form-item>
        <el-form-item label="是否置顶" class="form_switch">
          <el-switch v-model="is_top"></el-switch>
        </el-form-item><br>
        <el-form-item label="排序" prop="sort">
          <el-input type="text" v-model.number="ruleForm.sort" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="" class="upload_img">
          <el-upload
            action=""
            :http-request="handleFile"
            :multiple="false"
            :limit="1"
            :file-list="fileList"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip upload_tip">上传图片格式，且不超过2M</div>
          </el-upload>
        </el-form-item>
      </div>
      <div class="content">
        <EditorMd ref="EditorMd"></EditorMd>
      </div>
      <div class="sub_btn">
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import EditorMd from '@/components/EditorMd'

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
  components: {
    EditorMd
  },
  data () {
    return {
      article_id: 0,
      tagList: [],
      fileList: [],
      status: true,
      is_top: false,
      is_marrow: false,
      ruleForm: {
        title: '1',
        desc: '1',
        sort: 0,
        tag_id: 1,
        cover_image: ''
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
    if (this.$route.query.article_id) {
      this.$data.article_id = this.$route.query.article_id
      this.$axios({
        method: 'get',
        url: '/oo/article/' + this.$data.article_id,
        data: {}
      }).then(response => {
        if (response.data.code === 200) {
          _this.$data.ruleForm.title = response.data.data.title
          _this.$data.ruleForm.sort = response.data.data.sort
          _this.$data.ruleForm.desc = response.data.data.desc
          _this.$data.ruleForm.tag_id = response.data.data.tag_id
          _this.$data.ruleForm.status = response.data.data.for_status
          _this.$refs.EditorMd.content = response.data.data.content
          if (response.data.data.is_marrow === 1) {
            _this.$data.ruleForm.is_marrow = true
          } else {
            _this.$data.ruleForm.is_marrow = false
          }
          if (response.data.data.is_top === 1) {
            _this.$data.ruleForm.is_top = true
          } else {
            _this.$data.ruleForm.is_top = false
          }
          if (response.data.data.cover_image_url !== '') {
            _this.$data.fileList = [{
              name: 'exists.png',
              url: response.data.data.cover_image_url
            }]
          }
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
          let formData = new FormData()
          if (_this.$data.status) {
            _this.$data.ruleForm.status = 1
          } else {
            _this.$data.ruleForm.status = -1
          }
          if (_this.$data.is_marrow) {
            _this.$data.ruleForm.is_marrow = 1
          } else {
            _this.$data.ruleForm.is_marrow = 0
          }
          if (_this.$data.is_top) {
            _this.$data.ruleForm.is_top = 1
          } else {
            _this.$data.ruleForm.is_top = 0
          }
          Object.keys(_this.$data.ruleForm).forEach((key) => {
            formData.append(key, _this.$data.ruleForm[key])
          })
          formData.append('content', _this.$refs.EditorMd.content)
          _this.$axios.post('/ao/article/save/' + _this.$data.article_id, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
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
    },
    handleFile: function (file, fileList) {
      this.$data.ruleForm.cover_image = file.file
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
.article_top {
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
.upload_img {
  text-align: left;
  width: 80%;
}
.upload_tip {
  display: inline-block;
  margin-left: 1.25rem;
}
.sub_btn {
  margin: 3.125rem;
}
</style>
