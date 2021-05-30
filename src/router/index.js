import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '@/components/Login.vue'
import store from "../store";


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => { 
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const token = store.getters.token || Vue.prototype.$cookie.get("token");
    if (!token) {
      next({
        path: "/login"
      });
    } else {
      next();
    }
  } else {
    next();
  }
})

export default router
