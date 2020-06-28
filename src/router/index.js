import Vue from 'vue'
import VueRouter from 'vue-router'

import Index from '@/components/Index.vue';
import Login from '@/components/Login.vue';
import Branch from '@/components/Branch.vue';
import Movie from '@/components/Movie.vue';
import Studio from '@/components/Studio.vue';
import Schedule from '@/components/Schedule.vue';
import Forbidden from '@/components/Forbidden.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    component: Index,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/branch',
    component: Branch,
    meta: { isAdmin: true }
  },
  {
    path: '/movie',
    component: Movie,
    meta: { isAdmin: true }
  },
  {
    path: '/studio',
    component: Studio,
    meta: { isAdmin: true }
  },
  {
    path: '/schedule',
    component: Schedule,
    meta: { isAdmin: true }
  },
  {
    path: '/forbidden',
    component: Forbidden
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth) || (to.matched.some(record => record.meta.isAdmin))) {
    if(localStorage.getItem('c_token') == null) next('/login');
    else next();
    if(to.matched.some(record => record.meta.isAdmin)) {
      let role = localStorage.getItem('c_role');
      if(role === 'admin') next();
      else next('/forbidden')
    }
  }else next();
})

export default router