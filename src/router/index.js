import Vue from 'vue';
import VueRouter from 'vue-router';
// Component
import Login from '../page/Login.vue'
import Register from '../page/Register.vue'
import Feed from '../page/Feed.vue'
import Profile from '../page/Profile.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Feed,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/register',
    component: Register,
  },
  {
    path: '/profile/:id',
    component: Profile
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;

