// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import $ from 'jquery'
import './assets/css/global.css'
// import axios from 'axios'
import qs from 'qs'

const Vue = require('vue')
const axios = require('axios')
const ElementUI = require('element-ui')

Vue.config.productionTip = false

Vue.use(ElementUI)
// https request 拦截器
axios.interceptors.request.use(
  config => {
    if (!(config.data instanceof FormData)) {
      config.data = qs.stringify(config.data)
    }
    config.headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'token': localStorage.token
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)
// https response 拦截器
axios.interceptors.response.use(
  response => {
    if (response.data.code === 1001) {
      window.localStorage['token'] = ''
      router.replace({
        path: '/login',
        query: {redirect: router.currentRoute.fullPath}
      })
    }
    if (response.headers.file_name) {
      return {
        data: {
          fileName: decodeURI(response.headers.file_name),
          data: response.data
        }
      }
    } else {
      return response
    }
  },
  error => {
    return Promise.reject(error.response.data)
  }
)
axios.defaults.baseURL = process.env.API_BASE_PATH
axios.defaults.withCredentials = true
Vue.prototype.$axios = axios

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (localStorage.token) {
      next()
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  axios,
  components: { App },
  template: '<App/>'
})

$('#app')
