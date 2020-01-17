<template>
  <div id="app">
    <div style="height: 100%;">
      <!--导航栏-->
      <div class="nav-bar-holder">
          <div class="nav-bar" id="nav-bar">
              <div class="logo-box">
                <router-link active-class="_active" class="blog-title ta-c" to="/index">
                  <img alt="logo" src="./assets/img/logo.jpg" />
                </router-link>
              </div>

              <div class="nb-a-holder" id="home"><router-link active-class="_active" class="nb-a ta-c" to="/index">首页</router-link></div>
              <div class="nb-a-holder">
                  <router-link active-class="_active" class="nb-a ta-c" to="/category">分类</router-link>
                  <ul id="category-ul" class="nav-ul" style="display: none;">

                  </ul>
              </div>
              <div class="nb-a-holder"><router-link active-class="_active" class="nb-a ta-c" to="/time_line">时间线</router-link></div>
              <div class="nb-a-holder"><router-link active-class="_active" class="nb-a ta-c" to="/about">关于</router-link></div>
              <div class="nb-a-holder"><router-link active-class="_active" class="nb-a ta-c" to="/friend_link">友情链接</router-link></div>

              <div id="search-nb">
                  <span class="search-s fl">
                      <label for="search-input"></label>
                      <input class="fl search_i" type="text" id="search-input" v-on:keyup.enter="search_method" placeholder="请输入关键字">
                      <a class="search-icon fl" v-on:click="search_method" href="javascript:;"></a>
                  </span>
              </div>
              <!-- <div class="nb-a-holder-last">
                <div class="nb-a-holder-small">
                  <router-link class="a-login" to="/login">登录</router-link>
                </div>
                <div class="nb-a-holder-small">
                  <router-link class="a-login" to="/register">注册</router-link>
                </div>
              </div> -->
          </div>
      </div>
      <!-- 导航栏结束 -->

      <!-- 移动端导航栏 -->
      <div class="mobile-nav">
          <div class="logo-box">
              <router-link active-class="_active" class="blog-title ta-c" to="/index">
                <img alt="logo" src="./assets/img/logo.jpg" />
              </router-link>
          </div>
          <a id="mobile_cate" style="background-image: url('./static/img/cate.svg')" href="javascript:void(0);" v-on:click="show_nav"></a>
      </div>

      <ul id="nav-m-list">
          <li><p v-on:click="to_nav('/index')">首页</p></li>
          <!-- <li><p v-on:click="to_nav('/login')">登录</p></li> -->
          <!-- <li><p v-on:click="to_nav('/register')">注册</p></li> -->
          <li><p v-on:click="to_nav('/category')">分类</p></li>
          <li><p v-on:click="to_nav('/time_line')">时间线</p></li>
          <li><p v-on:click="to_nav('/about')">关于</p></li>
          <li><p v-on:click="to_nav('/friend_link')">友情链接</p></li>
          <li>
              <span class="search-s fl">
                  <label for="search-input-m"></label><input class="fl search_i" :search="search" v-on:keyup.enter="search_method" type="text" id="search-input-m" placeholder="关键词">
                  <a class="search-icon fl" v-on:click="search_method" href="javascript:;"></a>
              </span>
          </li>
      </ul>
      <div style="height: 3.75rem;"></div>
      <!-- 移动端导航栏结束 -->
      <!-- 主要内容 -->
      <div class="container">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
$(function () {
  let html = `<!--尾部-->
    <footer class="footer">
      <div class="container">
        <p class="pull-left">
          由 <a href="http://weibo.com/u/1837553744?is_hot=1" target="_blank">num10</a> 设计和编码 <span style="color: #e27575;font-size: 14px;">❤</span> | Copyright © 2020
        </p>
        <p class="pull-right"><a href="mailto:name@email.com">联系我们</a></p>
      </div>
    </footer>`
  $('#app').after(html)
  $('#search-input').focus(function () {
    $('.search-s').addClass('search-on')
    $('.search-icon').addClass('icon-on')
  })

  $('#search-input').blur(function () {
    $('.search-s').removeClass('search-on')
    $('.search-icon').removeClass('icon-on')
  })

  $('#search-input-m').focus(function () {
    $('.search-s').addClass('search-on')
    $('.search-icon').addClass('icon-on')
  })

  $('#search-input-m').blur(function () {
    $('.search-s').removeClass('search-on')
    $('.search-icon').removeClass('icon-on')
  })

  $('.a-login').hover(
    function () {
      $(this).next('.nav-ul-m').stop(true, false).toggle()
    }, function () {
      $(this).next('.nav-ul-m').stop(true, false).toggle()
    }
  )

  $('.nav-li-m').hover(
    function () {
      $(this).parent('.nav-ul-m').stop(true, false).toggle()
    }, function () {
      $(this).parent('.nav-ul-m').stop(true, false).toggle()
    }
  )

  $('.nb-a').hover(
    function () {
      $(this).addClass('nb-a-hover')
    }, function () {
      $(this).removeClass('nb-a-hover')
    }
  )
})

export default {
  name: 'App',
  data () {
    return {
      search: '',
      is_search: false
    }
  },
  methods: {
    search_method: function (event) {
      let searchValue = $('.search_i').val()
      if (this.$router.currentRoute.path !== '/index') {
        this.$router.push({
          name: 'Index',
          params: {
            search: searchValue
          }
        })
      } else {
        console.log(this.$children)
        /* this.$refs.Index.$data.search = searchValue
        this.$refs.Index.getIndex() */
      }
    },
    show_nav: function (event) {
      let dis = $('#nav-m-list').css('display')
      if (dis === 'none') {
        $('#nav-m-list').show(300)
      } else {
        $('#nav-m-list').hide(300)
      }
    },
    to_nav: function (event) {
      if (this.$router.currentRoute.path !== event) {
        this.$router.push(event)
      }
      $('#nav-m-list').fadeOut()
    }
  }
}
</script>

<style>
body, html {
    height: 100%;
    margin: 0;
    padding: 0;
}
#app {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 85.5%;
}
#search-nb span {
  border-radius: 0.3125rem;
}
.nav-bar-holder {
  border-top: 0.25rem solid #409EFF;
  position: fixed;
  z-index: 999;
}
</style>
