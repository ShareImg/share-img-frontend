<template>
  <div class="login-container">
    <form class="login-form" @submit="onClickLogin">
      <div class="form-group">
        <label>Email</label>
        <input class="form-control" type="email" v-model="email"/>
      </div>
      <div class="form-group">
        <label>Password</label>
        <input class="form-control" type="password" v-model="password" />
      </div>
      <button class="btn btn-primary" type="submit">Login</button>
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
      await firebase.auth().signInWithEmailAndPassword(this.email, this.password).catch((error) => {
        this.error = error.message;
      });
    }
  },
  created() {
  }
}
</script>

<style scoped>
  .login-container {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .login-form {
    width: 70%;
  }
</style>
