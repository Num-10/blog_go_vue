<template>
<!--主体-->
    <section class="main">
        <input hidden id="user_id" name="user_id" value="">
        <input hidden id="article_id" name="article_id" value="24">
        <div class="left-box">
            <div class="article-container">
                <div class="sort-box">
                    <span class="location fl c-666">
                        <span class="at-sort-detail c-666">当前位置：
                            <router-link to="/index">首页</router-link> >
                            <a href="javascript:;">{{ articleInfo.title }}</a>
                        </span>
                    </span>
                </div>
                <div class="article-content markdown-body">
                  <h1 style="margin: 10px 0">{{ articleInfo.title }}</h1>
                  <div class="writer-info">
                      <span style="margin: 5px 0;">Author: </span>
                      <span id="writer">{{ articleInfo.author }} </span>
                      <span id="write-time">{{ articleInfo.created_format }}</span>
                      <span>阅读(<span id="read-number">{{ articleInfo.view_count }}</span>)</span>
                      <!-- <span>评论(<span id="read-number">0</span>)</span> -->
                  </div>
                  <div>
                    {{ articleInfo.content }}
                  </div>
                </div>

                <!-- <div class="prev-next">
                    <div class="p-div">
                        <span class="fl">上一篇：</span>
                        <a class="one-line-overflow fl" href="https://www.zhaoyangkun.top/front/articleDetail/23/"
                            id="prev-a">Django中ajax上传图片详细步骤</a>
                    </div>

                    <div class="n-div">
                        <span class="fl">下一篇：</span>
                        <a class="one-line-overflow fl" href="https://www.zhaoyangkun.top/front/articleDetail/29/" id="next-a">CentOS 利用 Docker 部署
                            pipe 具体步骤</a>
                    </div>
                </div> -->
            </div>

            <!-- <div class="comment-container" style="margin-top: 20px;">

                <div class="sort-box">
                    <span class="at-sort-s fl"><a style="box-sizing: content-box;"
                            class="at-sort-comment-a c-666">评论</a></span>
                    <span class="location fl c-666"><a class="at-sort-detail c-666"></a> </span>
                </div>

                <div class="text-area-holder">
                    <div id="vditor">

                    </div>

                </div>

                <div class="button-line">
                    <span id="error-info"></span>
                    <button type="button" id="publish-btn" onclick="">发布</button>
                </div>

                <div class="total-count">
                    共 <span id="comment-count">2</span> 条评论
                </div>

                <div class="comment-item">
                    <div class="user-img-box">
                        <img src="" id="user-img" alt="">
                    </div>
                    <div class="comment-box">
                        <div class="user-info">
                            <span class="user-name">admin</span>
                            <span class="publish-time">2019年08月12日 11:14:48</span>
                        </div>

                        <div class="reply-box">
                            <div class="user-info">
                                <span class="reply-user-name">@admin</span>
                                <span class="publish-time">2019年08月12日 11:11:39</span>
                            </div>
                            <p class="comment-content c-666" style="padding-bottom: 5px">
                                蛮想出一个重装win10的详细教程，但是身边没有电脑给我做测试😂 。蛮想出一个重装win10的详细教程，但是身边没有电脑给我做测试😂 。蛮想出一个重装win10的详细教程，但是身边没有电脑给我做测试😂 。
                            </p>

                        </div>

                        <p class="comment-content c-666">
                        </p>
                        <p>唉，说实话做博客还是花了蛮多心思的，就是没什么流量，不管了，做好自己就行了。唉，说实话做博客还是花了蛮多心思的，就是没什么流量，不管了，做好自己就行了。唉，说实话做博客还是花了蛮多心思的，就是没什么流量，不管了，做好自己就行了。</p>
                        <p></p>

                        <div class="icon-line">
                            <a href="javascript:void(0)" class="delete-icon"
                                style="background-image: url('../static/img/delete.svg');" onclick=""></a>

                            <a href="javascript:void(0)" class="comment-icon"
                                style="background-image: url('../static/img/comment.svg');"
                                onclick="show_reply(this)"></a>
                            <span class="reply_count c-666">0</span>

                            <a href="javascript:void(0)" class="liked-icon"
                                style="background-image: url('../static/img/liked.svg');" onclick=""></a>

                            <span class="liked_count c-666">0</span>
                        </div>

                        <div class="reply-holder" style="display: none;">
                            <input class="reply-btn" type="button" onclick="" value="回复">
                        </div>

                    </div>
                </div>

                <div class="comment-item">
                    <div class="user-img-box">

                        <img src="" id="user-img" alt="">

                    </div>
                    <div class="comment-box">

                        <div class="user-info">
                            <span class="user-name">admin</span>
                            <span class="publish-time">2019年08月12日 11:11:39</span>
                        </div>

                        <p class="comment-content c-666">
                        </p>
                        <p>蛮想出一个重装win10的详细教程，但是身边没有电脑给我做测试😂 。</p>
                        <p></p>

                        <div class="icon-line">

                            <a href="javascript:void(0)" class="delete-icon"
                                style="background-image: url('../static/img/delete.svg');" onclick=""></a>

                            <a href="javascript:void(0)" class="comment-icon"
                                style="background-image: url('../static/img/comment.svg');"
                                onclick="show_reply(this)"></a>
                            <span class="reply_count c-666">1</span>

                            <a href="javascript:void(0)" class="liked-icon"
                                style="background-image: url('../static/img/liked-on.svg');" onclick=""></a>

                            <span class="liked_count c-666">1</span>
                        </div>

                        <div class="reply-holder" style="display: none;">
                            <input class="reply-btn" type="button" onclick="reply_comment(this,8,22,30)" value="回复">
                        </div>

                    </div>
                </div>
            </div> -->
        </div>

        <div class="right-box">

            <div class="column-holder">
              <ul>
                 <li><a href="#_1">一. 前言</a></li>
                 <li><a href="#app">二. 创建App</a></li>
                 <li><a href="#_2">三. 连接数据库</a></li>
                 <li><a href="#model">四. 反向生成Model</a></li>
                 <li><a href="#_3">五. 从数据库获取数据</a></li>
                 <li><a href="#_4">六. 在网页中显示</a></li>
                 <li><a href="#_5">七. 最后</a></li>
              </ul>
            </div>

            <!-- <div class="column-holder" style="margin-top: 20px">
                <ul class="column_box">
                    <li class="column-title b-b-ece c-29">点击排行</li>

                    <li class="column-category b-b-ece">
                        <a href="/front/articleDetail/22/">做博客网站的初衷</a>
                    </li>

                    <li class="column-category b-b-ece">
                        <a href="/front/articleDetail/23/">Django中ajax上传图片详细步骤</a>
                    </li>

                    <li class="column-category b-b-ece">
                        <a href="/front/articleDetail/24/">如何在Django中新建一个App，连接Mysql数据库，并获取数据。</a>
                    </li>

                    <li class="column-category b-b-ece">
                        <a href="/front/articleDetail/32/">Django常用ORM方法</a>
                    </li>

                    <li class="column-category b-b-ece">
                        <a href="/front/articleDetail/21/">Django模板语言——if-else</a>
                    </li>

                    <li class="column-category b-b-ece">
                        <a href="/front/articleDetail/17/">Python递归遍历图片文件</a>
                    </li>

                    <li class="column-category b-b-ece">
                        <a href="/front/articleDetail/20/">Django模板语言——for</a>
                    </li>

                    <li class="column-category b-b-ece">
                        <a href="/front/articleDetail/29/">CentOS 利用 Docker 部署 pipe 具体步骤</a>
                    </li>

                </ul>
            </div> -->
        </div>
    </section>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      article_id: 0,
      articleInfo: []
    }
  },
  created () {
    this.$data.article_id = this.$route.query.article_id
    if (this.$data.article_id <= 0) {
      this.$router.push({
        name: 'Index'
      })
    }
    this.getArticle()
  },
  methods: {
    getArticle: function () {
      let _this = this
      this.$axios.get('/oo/article/' + this.$data.article_id, {
        params: {}
      }).then(function (response) {
        if (response.data.data.length <= 0) {
          _this.$router.push({
            name: 'Index'
          })
        }
        _this.$data.articleInfo = response.data.data
      })
    }
  }
}
</script>

<style>
@import "../assets/css/article-detail.css";
@import "../assets/css/code.css";
@import "../assets/css/github-markdown.css";
@import "../assets/css/vditor.classic.css";
</style>
