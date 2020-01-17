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

                    <div class="article-box">
                        <div class="ab-content">
                            <div class="article-title"> <a href="article-detail.html">Django常用ORM方法</a> </div>
                            <div class="article-cate"><a href="category.html">后台</a> <a style="color:#a6a6a6">/</a>
                                <a href="label.html">Django</a>
                            </div>
                            <a href="article-detail.html" class="article-img-box">
                                <img class="article-img" alt=""
                                    src="">
                            </a>
                            <div class="article-detail-box c-666">
                                ![](https://img.hacpai.com/bing/20171230.jpg?imageView2/1/w/768/h/432/interlace/1/q/100)

                                # 前言
                                Django内置了数据库抽象API，通过调用指定函数，封装对象的方法来完成对数据库检索、增加、删除、修改、聚合等操作，无需手写SQL，可以大大提升开发效率。

                                - 开始教程之前，我们已经在 **mysite/b </div> <span class="article-tail-box"> <i class="fl"
                                    style="background-image: url('./static/img/read-index.svg')"></i>
                                <span class="read-number c-999 fl">62</span>
                                <i class="fl" style="background-image: url('./static/img/comment-index.svg')"></i>
                                <span class="comment-number c-999 fl">0</span> <span class="article-date c-999">8月7日
                                    22:23</span> <span class="article-author one-line-overflow c-999">admin</span>
                            </span>
                        </div>
                    </div>
                </div>

                <!--分页指示器-->
                <div id="pagination" class="pagination fl"></div>
            </div>

        </article>
    </div>
</template>

<script>
export default {
  name: 'TimeLine',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style>
  @import "../assets/css/index.css";
</style>
