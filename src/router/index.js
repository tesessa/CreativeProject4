import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Review from '../views/Review.vue'
import EitherOr from '../views/EitherOr.vue'
import FavBook from '../views/favBook.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/review',
    name: 'review',
    component: Review
  },
  {
    path: '/either',
    name: 'either',
    component: EitherOr
  },
  {
    path: '/book',
    name: 'book',
    component: FavBook
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
