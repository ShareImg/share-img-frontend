<template>
  <div id="app">
    <NavBar v-if="showNav"/>
    <div class="content">
      <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
      <router-view class="router-container" :user="user"/>
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
      this.showNav = this.checkPath(to.path);
    }
  },
  created() {
    this.showNav = this.checkPath(this.$route.path)
    this.checkUserState()
  },
  methods: {
    checkPath(path) {      
      if(path == '/login' || path == '/register') {
        return false
      } else {
        return true;
      }
    },
    checkUserState() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          console.log(user)
          this.user = user;
          if(!this.checkPath(this.$route.path)) this.$router.push('/')
        // ...
        } else {
          if(this.checkPath(this.$route.path)) this.$router.push('/login')
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
  background-color: whitesmoke;
}
.content {
  padding: 2rem 20vw 0 20vw;
  min-height: calc(100vh - 60px);
}
</style>
