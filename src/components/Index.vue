<template>
  <!--主体-->
      <div class="big-container">
          <article class="article">
              <!--左容器-->
              <div class="left-holder">

                  <!--文章内容-->
                  <div id="article-holder" style="width: 100%; float: left">
                      <div :class="item.cover_image_url ? 'article-box' : 'article-box article-box-height'" v-for="item in articleList" v-bind:key="item.id">
                          <div class="ab-content">
                            <router-link :to="{ name: 'Article', query:{article_id: item.article_id} }">
                              <div class="article-title"> <router-link :to="{ name: 'Article', query:{article_id: item.article_id} }">{{ item.title }}</router-link> </div>
                              <div class="article-cate">
                                <router-link :to="{ name: 'Category', params: { tag_id: item.tag_id } }">{{ item.tag_name }}</router-link>
                              </div>
                              <router-link :to="{ name: 'Article', query:{article_id: item.article_id} }" class="article-img-box" v-if="item.cover_image_url">
                                <img class="article-img" alt="" :src="item.cover_image_url">
                              </router-link>
                              <div :class="item.cover_image_url ? 'article-detail-box c-666' : 'article-detail-box-no-img c-666'">
                                <VueShowdown
                                  :markdown="item.content"
                                  flavor="github"
                                  :options="{ emoji: true }"/>
                              </div>
                              <span class="article-tail-box">
                                <i class="fl" style="background-image: url('./static/img/read-index.svg')"></i>
                                <span class="read-number c-999 fl">{{ item.view_count }}</span>
                                <i class="fl" style="background-image: url('./static/img/comment-index.svg')"></i>
                                <span class="comment-number c-999 fl">0</span>
                                <span class="article-date c-999">{{ item.author }}</span>
                                <span class="article-author one-line-overflow c-999">{{ item.created_format }}</span>
                              </span>
                            </router-link>
                          </div>
                      </div>
                  </div>
                  <!--分页指示器-->
                  <div class="pagination">
                    <el-pagination
                      background
                      hide-on-single-page
                      layout="prev, pager, next"
                      :page-count="total_page"
                      :page-size="page_size"
                      :total="count"
                      @current-change="change_page">
                    </el-pagination>
                  </div>
              </div>
              <!--右容器-->
              <div class="right-holder">
                  <!--个人介绍-->
                  <ul class="info-container">
                      <!-- <li class="person-intro-title">
                          <h1>我的名片</h1>
                      </li> -->
                      <li class="person-img-li">
                          <img alt="头像" id="person-img" src="../assets/img/index.jpg">
                      </li>
                      <li class="person-intro-detail gradient-text">
                          <h2>num_10's blog</h2>
                      </li>
                      <li class="person-intro-detail">
                          <h3>分享 · 热爱</h3>
                      </li>
                      <!-- <li class="person-intro-detail">
                          <h3>昵称：</h3>
                      </li> -->
                      <li class="person-intro-detail">
                          <h3>所在地：广州</h3>
                      </li>
                      <li class="person-intro-detail">
                          <h3>爱好：不吹牛</h3>
                      </li>
                      <li class="person-intro-detail">
                          <h3>QQ：1103947448</h3>
                      </li>
                  </ul>

                  <!-- <div class="column-container">
                      <ul class="column_box" id="like-box">
                          <li class="column-title b-b-ece c-29">猜你喜欢</li>

                          <li class="column-category b-b-ece">
                              <a href="article-detail.html">如何在Django中新建一个App，连接Mysql数据库，并获取数据。</a>
                          </li>
                      </ul>
                  </div>

                  <div class="column-container">
                      <ul class="column_box" id="like-box">
                          <li class="column-title b-b-ece c-29">点击排行</li>

                          <li class="column-category b-b-ece">
                              <a href="article-detail.html">如何在Django中新建一个App，连接Mysql数据库，并获取数据。</a>
                          </li>
                      </ul>
                  </div> -->

              </div>
          </article>
      </div>
</template>

<script>
import { VueShowdown } from 'vue-showdown'

export default {
  name: 'Index',
  components: {
    VueShowdown
  },
  data () {
    return {
      page: 1,
      page_size: 10,
      search: '',
      is_search: false,
      total_page: 0,
      count: 0,
      articleList: []
    }
  },
  created () {
    this.$data.search = this.$route.params.search
    this.getIndex()
  },
  watch: {
    is_search: function (val, oldVal) {
      this.getIndex()
      this.$data.is_search = false
    }
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    this.$parent.search = ''
    next()
  },
  methods: {
    getIndex: function () {
      let _this = this
      this.$axios.get('/oo', {
        params: {
          page: this.$data.page,
          page_size: this.$data.page_size,
          search: this.$data.search
        }
      }).then(function (response) {
        _this.$data.articleList = response.data.data.list
        _this.$data.count = response.data.data.count
        _this.$data.total_page = Math.ceil(response.data.data.count / _this.$data.page_size)
      })
    },
    change_page: function (page) {
      this.$data.page = page
      this.getIndex()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../assets/css/index.css";
</style>
