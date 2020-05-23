<template>
  <div class="profile-page" v-if="user">
    <PhotoEditingModal :onClose="handleModal" v-if="modal" v-model="photos[editIndex]" :user="user"/>
    <div>
      <div class="profile-header">
        <ProfileImage size="200px" :image="user.displayImage"/>
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
        <div class="empty-state" v-if="!photos || photos.length === 0">
          <h4>You didn't have photo</h4>
        </div>
        <PhotoBox v-for="(photo, index) in photos" :key="index" :photo="photos[index]" :user="user" :onClickEdit="handleEdit" :index="index" v-else/>
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
  props: ['user'],
  data() {
    return {
      modal: false,
      photos: null,
      editIndex: null,
    }
  },
  components: {
    ProfileImage,
    PhotoBox,
    PhotoEditingModal,
  },
  created() {
    this.loadPhotos();
  },
  methods: {
    handleModal(){
      this.modal = !this.modal;      
    },
    async loadPhotos() {
      const response = await getPhotoByUserId(this.$route.params.id);
      this.photos = response.data;
    },
    handleEdit(index) {
      this.editIndex = index;
      this.handleModal();
    },
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
  .circle-button:hover {
    cursor: pointer;
  }
  .button-text {
    margin-top: 0.25rem;
  }
  .profile-content {
    margin-top: 3rem;
  }

.empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20vh;
  color: gray;
}
</style>
