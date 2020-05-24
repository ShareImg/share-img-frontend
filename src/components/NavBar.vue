<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light" v-if="user">
    <router-link class="navbar-brand" to="/">ShareImg</router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <div @click="goToProfile">
          <ProfileImage size="35px" :image="user.displayImage"/>
        </div>
        <li class="nav-item">
          <div class="nav-link sign-out" @click="onClickSignOut">Sign out</div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import _ from 'lodash';
import firebase from '../config/firebase'
import ProfileImage from './ProfileImage.vue'

export default {
  props:['user'],
  components: {
    ProfileImage,
  },
  computed: {
    showNavMenu() {
      return _.find(this.menu, { key: this.value });
    },
  },
  created() {},
  watch: {
    // currentActiveMenu(value) {
    //   this.$emit('input', value);
    // },
    value() {
      this.currentActiveMenu = this.value;
    },
  },
  methods: {
    // changeTab(key) {
    //   this.$emit('input', key);
    // },
    goToProfile() {      
      this.$router.push(`/profile/${this.user.id}`)
    },
    onClickSignOut() {
      firebase.auth().signOut();
    },
  },
};
</script>

<style lang="css" scoped>
  .navbar {
    height: 60px;
  }
  .navbar-nav {
    width: 100%;
    justify-content: flex-end;
    align-items: center;
  }
  .sign-out:hover {
    cursor: pointer;
    color: crimson !important;
  }
</style>
