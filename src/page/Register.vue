<template>
  <div class="register-container">
    <form class="register-form" @submit="onClickRegister">
      <div class="form-group">
        <label>Email</label>
        <input class="form-control" type="email" v-model="email"/>
      </div>
      <div class="form-group">
        <label>Display name</label>
        <input class="form-control" type="email" v-model="username"/>
      </div>
      <div class="form-group">
        <label>Password</label>
        <input class="form-control" type="password" v-model="password" />
      </div>
      <button class="btn btn-primary" type="button" @click="onClickRegister">Register</button>
    </form>
  </div>
</template>

<script>
import firebase from '../config/firebase'

export default {
  data() {
    return {
      email: '',
      password: '',
      username: '',
    }
  },
  methods: {
    async onClickRegister() {
      await firebase.auth().createUserWithEmailAndPassword(this.email, this.password).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>
  .register-container {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .register-form {
    width: 70%;
  }
</style>
