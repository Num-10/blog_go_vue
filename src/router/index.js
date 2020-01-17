import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Category from '@/components/Category'
import TimeLine from '@/components/TimeLine'
import FriendLink from '@/components/FriendLink'
import Login from '@/components/Login'
import Article from '@/components/Article'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'Index',
      component: Index
    },
    {
      path: '/category',
      name: 'Category',
      component: Category
    },
    {
      path: '/time_line',
      name: 'TimeLine',
      component: TimeLine
    },
    {
      path: '/friend_link',
      name: 'FriendLink',
      component: FriendLink
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/article',
      name: 'Article',
      component: Article
    },
    {
      path: '/category_edit',
      name: 'Article',
      component: Article,
      meta: { requireAuth: true }
    },
    {
      path: '/article_edit',
      name: 'Article',
      component: Article,
      meta: { requireAuth: true }
    }
  ]
})
