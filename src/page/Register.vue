<template>
  <div class="register-container">
    <form class="register-form" @submit.prevent="onClickRegister">
      <div class="form-group image-form">
        <div class="input-picture-container">
          <label class="input-label" v-if="!displayImage && !isLoading">Choose Image</label>
          <input class="input-picture" accept="image/*" type="file" @change="onInputDisplayImage" v-if="!displayImage && !isLoading"/>
          <div class="spinner-border text-secondary" role="status" v-if="isLoading">
            <span class="sr-only">Loading...</span>
          </div>
          <img class="preview-image" :src="displayImage" v-if="displayImage && !isLoading"/>
        </div>
      </div>
      <div class="form-group">
        <label>Email</label>
        <input class="form-control" type="email" v-model="email"/>
      </div>
      <div class="form-group">
        <label>Display name</label>
        <input class="form-control" v-model="displayName"/>
      </div>
      <div class="form-group">
        <label>Password</label>
        <input class="form-control" type="password" v-model="password" />
      </div>
      <button class="btn btn-primary" type="submit">Register</button>
    </form>
  </div>
</template>

<script>
import firebase from '../config/firebase'
import {register} from '../api';

export default {
  data() {
    return {
      email: '',
      password: '',
      displayName: '',
      displayImage: null,
      isLoading: false,
    }
  },
  methods: {
    async onClickRegister() {
      try {
        await firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        const body = {
          email: this.email,
          password: this.password,
          displayName: this.displayName,
          displayImage: this.displayImage,
          uid: firebase.auth().currentUser.uid
        }
        await register(body);
        await firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        this.$router.go()
      } catch(error) {
        console.log(error)
      }
    },
    async onInputDisplayImage(e) {
      const files = e.target.files[0]      
      if(!files) return;
      await this.uploadPhotoToFirebase(files)
    },
    uploadPhotoToFirebase(file) {
      const ref = firebase.storage().ref().child(file.name)
      try {
        this.isLoading = true;
        ref.put(file).then(snapshot => {
          snapshot.ref.getDownloadURL().then(url => {
            this.displayImage = url
            this.isLoading = false
          })
        })
      } catch(error) {
        console.log(error);
      }
    },
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
  .preview-image {
    width: 100%;
    height: 100%;
  }
</style>
