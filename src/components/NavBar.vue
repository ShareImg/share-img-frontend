<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item active">
          <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/login">Login</router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Pricing</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import _ from 'lodash';

export default {
  props: {
    withBorder: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      currentActiveMenu: 'home',
      menus: [
        {
          name: 'หน้าแรก',
          key: 'home',
          path: '/',
          isHeading: false,
        },
        {
          name: 'คอนเทนท์',
          key: 'content',
          path: '/contents',
          isHeading: false,
        },
        {
          name: 'วีดีโอ',
          key: 'video',
          path: '/videos',
          isHeading: false,
        },
        {
          name: 'Homepage Slider',
          key: 'homepage-slider',
          path: '/homepage-slider',
          isHeading: false,
        },
        {
          name: 'ตั้งค่า',
          key: 'setting',
          path: '/settings',
          isHeading: false,
        },
      ],
    };
  },
  computed: {
    showNavMenu() {
      return _.find(this.menu, { key: this.value });
    },
  },
  created() {},
  watch: {
    currentActiveMenu(value) {
      this.$emit('input', value);
    },
    value() {
      this.currentActiveMenu = this.value;
    },
  },
  methods: {
    changeTab(key) {
      this.$emit('input', key);
    },
    gotoMenu() {
    },
  },
};
</script>

<style lang="css" scoped>
  .navbar {
    height: 60px;
  }
</style>
