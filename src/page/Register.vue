<template>
  <div class="register-container">
    <form class="register-form" @submit="onClickRegister">
      <div class="form-group image-form">
        <div class="input-picture-container">
          <label class="input-label">Choose Image</label>
          <input class="input-picture" accept="image/*" type="file" @change="onInputDisplayImage"/>
        </div>
      </div>
      <div class="form-group">
        <label>Email</label>
        <input class="form-control" type="email" v-model="email"/>
      </div>
      <div class="form-group">
        <label>Display name</label>
        <input class="form-control" v-model="username"/>
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
      displayImage: null,
    }
  },
  methods: {
    async onClickRegister() {
      await firebase.auth().createUserWithEmailAndPassword(this.email, this.password).catch((error) => {
        console.log(error)
      })
    },
    onInputDisplayImage(e) {
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
    }
  }
}
</script>

<style scoped>
  .register-container {
    height: calc(100vh - 60px);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .register-form {
    width: 70%;
  }
  .image-form {
    display: flex;
    justify-content: center;
  }
  .input-picture-container {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 200px;
    height: 200px;
    border: 0.5px solid lightgray;
    border-radius: 200px;
    overflow: hidden;
    margin-bottom : 1rem;
    background: white;
  }
  .input-label {
    position: absolute;
    text-align: center;
    color: lightgray
  }
  .input-picture {
    cursor: pointer;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
</style>
