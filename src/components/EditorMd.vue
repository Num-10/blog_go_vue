<template>
  <div>
    <mavon-editor
      v-model="content"
      ref="md"
      @change="change"
      @imgAdd="$imgAdd"
      v-bind:class="[only_show ? 'low_index' : '', 'min_height']"
      :editable=editable
      :toolbarsFlag=toolbarsFlag
      :defaultOpen=defaultOpen
      :subfield=subfield
      :navigation=navigation
      :boxShadow=boxShadow
    />
  </div>
</template>

<script>
// 导入组件 及 组件样式
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

export default {
  name: 'EditorMd',
  // 注册
  components: {
    mavonEditor
  },
  props: ['only_show'],
  data () {
    return {
      content: '',
      html: '',
      editable: true,
      toolbarsFlag: true,
      defaultOpen: 'preview',
      subfield: true,
      navigation: true,
      boxShadow: true,
      navigationHtml: ''
    }
  },
  created () {
  },
  mounted () {
    if (this.$props.only_show) {
      this.fonly_show()
    }
  },
  methods: {
    // 所有操作都会被解析重新渲染
    change (value, render) {
      // render 为 markdown 解析后的结果[html]
      this.$data.html = render
      this.$data.content = value
    },
    $imgAdd (pos, $file) {
      // 将图片上传到服务器，返回地址替换到md中
      let formData = new FormData()
      formData.append('image', $file)
      this.$axios.post('/ao/upload/image_local', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(response => {
        this.$refs.md.$img2Url(pos, response.data.data.url)
      }).catch(err => {
        console.log(err)
      })
    },
    fonly_show () {
      this.$data.editable = false
      this.$data.toolbarsFlag = false
      this.$data.defaultOpen = 'preview'
      this.$data.subfield = false
      this.$data.boxShadow = false
      // this.$data.navigationHtml = $('.v-note-navigation-content')
      // $('.v-note-navigation-wrapper').remove()
      // console.log($('.v-note-navigation-content').children())
      // $('.v-note-navigation-content')
    }
  }
}
</script>

<style>
  .min_height {
    min-height: 37.5rem !important;
  }
  .low_index {
    z-index: 998 !important;
  }
</style>
