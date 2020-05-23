<template>
  <div class="profile-page" :class="{ 'overflow-hidden': true}">
    <PhotoEditingModal :onClose="handleModal" v-if="modal"/>
    <div>
      <div class="profile-header">
        <ProfileImage size="200px"/>
        <div class="button-container">
          <div class="add circle-button mr-4" @click="handleModal">
            <ion-icon name="add-outline" size="large"/>
            <div class="button-text">Add photo</div>
          </div>
          <div class="edit circle-button">
            <ion-icon name="pencil-outline" size="large"></ion-icon>
            <div class="button-text">Edit profile</div>
          </div>
        </div>
      </div>
      <div class="profile-content">
        <PhotoBox v-for="(photo, index) in photos" :key="index" :photo="photos[index]" />
      </div>
    </div>
  </div>
</template>

<script>
import ProfileImage from '../components/ProfileImage'
import PhotoBox from '../components/PhotoBox';
import PhotoEditingModal from '../components/PhotoEditingModal'
import {getPhotoByUserId} from '../api'

export default {
  data() {
    return {
      modal: false,
      photos: null
    }
  },
  components: {
    ProfileImage,
    PhotoBox,
    PhotoEditingModal
  },
  created() {
    this.loadPhotos();
  },
  methods: {
    handleModal(){
      this.modal = !this.modal;
      console.log(this.modal);
      
    },
    async loadPhotos() {
      const response = await getPhotoByUserId(this.$route.params.id);
      this.photos = response.data;
      console.log(this.photos)
    }
  }
}
</script>

<style scoped>
  .profile-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-bottom: 3rem;
    border-bottom: 1px solid lightgray;
  }
  .button-container {
    display: flex;
    margin-top: 1.5rem;
  }
  .circle-button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 125px;
    height: 125px;
    border-radius: 100px;
    border: 1px solid lightgray;
  }
  .button-text {
    margin-top: 0.25rem;
  }
  .profile-content {
    margin-top: 3rem;
  }
</style>
