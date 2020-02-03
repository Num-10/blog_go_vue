// import Vue from 'vue'
// import Router from 'vue-router'
import Index from '@/components/Index'
import Category from '@/components/Category'
import TimeLine from '@/components/TimeLine'
import FriendLink from '@/components/FriendLink'
import Login from '@/components/Login'
import Article from '@/components/Article'
import ArticleEdit from '@/components/ArticleEdit'
import ArticleList from '@/components/ArticleList'
import CategoryEdit from '@/components/CategoryEdit'
import CategoryList from '@/components/CategoryList'
import LinkList from '@/components/LinkList'
import LinkEdit from '@/components/LinkEdit'
import EditorMd from '@/components/EditorMd'

const Vue = require('vue')
const Router = require('vue-router')

Vue.use(Router)

const VueRouterPush = Router.prototype.push
Router.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

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
      name: 'CategoryEdit',
      component: CategoryEdit,
      meta: { requireAuth: true }
    },
    {
      path: '/category_list',
      name: 'CategoryList',
      component: CategoryList,
      meta: { requireAuth: true }
    },
    {
      path: '/article_edit',
      name: 'ArticleEdit',
      component: ArticleEdit,
      meta: { requireAuth: true }
    },
    {
      path: '/article_list',
      name: 'ArticleList',
      component: ArticleList,
      meta: { requireAuth: true }
    },
    {
      path: '/link_list',
      name: 'LinkList',
      component: LinkList,
      meta: { requireAuth: true }
    },
    {
      path: '/link_edit',
      name: 'LinkEdit',
      component: LinkEdit,
      meta: { requireAuth: true }
    },
    {
      path: '/editor_md',
      name: 'EditorMd',
      component: EditorMd,
      meta: { requireAuth: true }
    }
  ]
})
