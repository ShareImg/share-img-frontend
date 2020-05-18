<template>
  <div id="app">
    <NavBar v-if="showNav"/>
    <div class="content">
      <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
      <router-view class="router-container" />
    </div>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import firebase from 'firebase'

export default {
  name: 'App',
  data() {
    return {
      showNav: true,
      user: null,
    }
  },
  components: {
    NavBar,
  },
  watch: {
    $route(to) {
      this.checkPath(to.path);
    }
  },
  created() {
    this.checkPath(this.$route.path)
    this.checkUserState()
  },
  methods: {
    checkPath(path) {
      console.log(path);
      
      if(path == '/login' || path == '/register') {
        this.showNav = false;
      } else {
        this.showNav = true;
      }
    },
    checkUserState() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.user = user;
        // ...
        } else {
          this.user = null;
        }
      });
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.content {
  padding: 2rem 20vw;
  height: calc(100vh - 60px);
}
</style>
