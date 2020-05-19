<template>
  <div class="login-container">
    <h1 class="login-header">Login to ShareImg</h1>
    <form class="login-form" @submit.prevent="onClickLogin">
      <div class="form-group">
        <label>Email</label>
        <input class="form-control" type="email" v-model="email"/>
      </div>
      <div class="form-group">
        <label>Password</label>
        <input class="form-control" type="password" v-model="password" />
      </div>
      <div class="button-container">
        <button class="btn btn-primary" type="submit">Login</button>
        <label class="signup-text text-primary ml-4 mb-0" @click="onClickSignUp">Sign up</label>
      </div>
    </form>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  data() {
    return {
      email: '',
      password: '',
      error: '',
    }
  },
  methods: {
    async onClickLogin() {
      try {
        await firebase.auth().signInWithEmailAndPassword(this.email, this.password)
      }
      catch(error) {
        console.log(error);
      }
    },
    onClickSignUp() {
      this.$router.push('/register');
    }
  },
  created() {
  }
}
</script>

<style scoped>
  .login-header {
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid lightgray;
    width: 70%;
  }
  .login-container {
    height: calc(100vh - 60px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .login-form {
    width: 70%;
  }
  .button-container {
    display: flex;
    align-items: center;
  }
  .signup-text:hover {
    cursor: pointer;
    text-decoration: underline;
  }
</style>
