<template>
<div class="big-container">
  <article class="article">
    <!--友情链接-->
    <ul class="link-box">
      <li v-for="item in linkList" :key="item.id">
        <a :href="item.link" target="_blank">{{ item.title }}</a>
        <span class="description">{{ item.desc }}</span>
      </li>
    </ul>
  </article>
</div>
</template>

<script>
export default {
  name: 'FriendLink',
  data () {
    return {
      linkList: []
    }
  },
  created () {
    this.getIndex()
  },
  methods: {
    getIndex: function () {
      let _this = this
      this.$axios.get('/oo/link/list', {
        params: {}
      }).then(function (response) {
        _this.$data.linkList = response.data.data.list
      })
    }
  }
}
</script>

<style>
@import "../assets/css/index.css";
@import "../assets/css/link.css";
</style>
