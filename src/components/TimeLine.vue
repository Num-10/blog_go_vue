<template>
  <main class="big-container">
    <article class="line_article">
        <ul class="achieve-box">
          <ul v-for="(item, key) in articleList" :key="item.id">
            <li class="year">
              {{ key }} <span style="color: #3aa4ff">&nbsp;&nbsp;{{ item.length }}</span> 篇
            </li>
            <li class="detail-item" v-for="ite in item" :key="ite.id">
              <span class="date">{{ ite.date }}</span>
              <router-link :to="{ name:'Article', params:{article_id: ite.article_id} }" class="title">{{ ite.title }}</router-link>
            </li>
          </ul>
        </ul>
    </article>
  </main>
</template>

<script>
export default {
  name: 'TimeLine',
  data () {
    return {
      articleList: []
    }
  },
  created () {
    this.getIndex()
  },
  methods: {
    getIndex: function () {
      let _this = this
      this.$axios.get('/oo/time_line', {
        params: {
        }
      }).then(function (response) {
        _this.$data.articleList = response.data.data.list
      })
    }
  }
}
</script>

<style>
  @import "../assets/css/index.css";
  @import "../assets/css/time_line.css";
</style>
