<template>
  <div class="register-container" v-if="user">
    <form class="register-form" @submit.prevent="onClickEdit">
      <div class="form-group image-form">
        <div class="input-picture-container">
          <label class="input-label" v-if="!user.displayImage && !isLoading">Choose Image</label>
          <input class="input-picture" accept="image/*" type="file" @change="onInputDisplayImage" v-if="!user.displayImage && !isLoading"/>
          <div class="spinner-border text-secondary" role="status" v-if="isLoading">
            <span class="sr-only">Loading...</span>
          </div>
          <img class="preview-image" :src="user.displayImage" v-if="user.displayImage && !isLoading"/>
        </div>
      </div>
      <div class="form-group">
        <label>Display name *</label>
        <input class="form-control" v-model="user.displayName"/>
      </div>
      <div class="button-container">
        <button class="btn btn-outline-danger mr-auto" type="button" @click="onClickReset">Reset</button>
        <button class="btn btn-primary" type="submit" :disabled="!user.displayName">Edit</button>
      </div>
    </form>
  </div>
</template>

<script>
import firebase from '../config/firebase'
import {getUser, editUser} from '../api';

export default {
  data() {
    return {
      user: null,
      isLoading: false,
    }
  },
  created() {    
    this.getUser()
  },
  methods: {
    async getUser() {
      const response = await getUser(this.$route.params.id)
      this.user = response.data;
    },
    async onClickEdit() {
      try {
        await editUser(this.user.id, this.user)
        window.location.href = `/profile/${this.user.id}`
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
            this.user.displayImage = url
            this.isLoading = false
          })
        })
      } catch(error) {
        console.log(error);
      }
    },
    onClickReset() {
      this.user.displayImage = null;
      this.user.displayName = '';
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
  .preview-image {
    width: 100%;
    height: 100%;
  }
  .button-container {
    display: flex;
    justify-content: space-between;
  }
</style>
