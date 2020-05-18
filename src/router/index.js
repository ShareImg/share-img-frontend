import Vue from 'vue';
import VueRouter from 'vue-router';
// Component
import Login from '../page/Login.vue'
import Register from '../page/Register.vue'
import Feed from '../page/Feed.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/register',
    component: Register,
  },
  {
    path: '/',
    component: Feed,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;

