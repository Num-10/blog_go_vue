<template>
<!--主体-->
    <div class="big-container">
        <article class="article">

            <!--左容器-->
            <div class="right-holder">

                <div class="column-container">
                        <ul class="column_box" id="like-box">
                            <li class="column-title b-b-ece c-29">日期归档</li>

                            <li class="column-category b-b-ece">

                                <a href="">
                                    2019年 8月&nbsp;&nbsp;4&nbsp;篇
                                </a>

                            </li>

                            <li class="column-category b-b-ece">

                                <a id="a-active" href="">
                                    2019年 7月&nbsp;&nbsp;6&nbsp;篇
                                </a>

                            </li>

                            <li class="column-category b-b-ece">

                                <a href="">
                                    2019年 6月&nbsp;&nbsp;1&nbsp;篇
                                </a>

                            </li>

                            <li class="column-category b-b-ece">

                                <a href="">
                                    2018年 8月&nbsp;&nbsp;1&nbsp;篇
                                </a>

                            </li>

                        </ul>
                    </div>

            </div>

            <!--右容器-->
            <div class="result-box fl">
                <!--文章内容-->
                <div id="article-holder" style="width: 100%; float: left">
                    <div :class="item.cover_image_url ? 'article-box' : 'article-box article-box-height'" v-for="item in articleList" v-bind:key="item.id">
                        <div class="ab-content">
                            <div class="article-title"> <a href="article-detail.html">{{ item.title }}</a> </div>
                            <div class="article-cate">
                              <a href="category.html">{{ item.tag_name }}</a>
                            </div>
                            <a href="article-detail.html" class="article-img-box" v-if="item.cover_image_url">
                              <img class="article-img" alt="" :src="item.cover_image_url">
                            </a>
                            <div :class="item.cover_image_url ? 'article-detail-box c-666' : 'article-detail-box-no-img c-666'">
                              {{ item.content }}
                            </div>
                            <span class="article-tail-box">
                              <i class="fl" style="background-image: url('./static/img/read-index.svg')"></i>
                              <span class="read-number c-999 fl">{{ item.view_count }}</span>
                              <i class="fl" style="background-image: url('./static/img/comment-index.svg')"></i>
                              <span class="comment-number c-999 fl">0</span>
                              <span class="article-date c-999">{{ item.author }}</span>
                              <span class="article-author one-line-overflow c-999">{{ item.created_format }}</span>
                            </span>
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

        </article>
    </div>
</template>

<script>
export default {
  name: 'TimeLine',
  data () {
    return {
      page: 1,
      page_size: 1,
      total_page: 0,
      count: 0,
      articleList: []
    }
  },
  created () {
    this.getIndex()
  },
  methods: {
    getIndex: function () {
      let _this = this
      this.$axios.get('/oo', {
        params: {
          page: this.$data.page,
          page_size: this.$data.page_size
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

<style>
  @import "../assets/css/index.css";
</style>
