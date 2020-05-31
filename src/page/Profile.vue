<template>
  <div class="profile-page" v-if="owner && user">
    <PhotoEditingModal :onClose="handleModal" v-if="modal" v-model="photos[editIndex]" :user="owner"/>
    <div>
      <div class="profile-header">
        <ProfileImage size="175px" :image="owner.displayImage"/>
        <h4 class="mt-4">{{owner.displayName}}</h4>
        <div class="button-container">
          <div class="add circle-button mr-4" @click="handleModal" v-if="isOwner">
            <ion-icon name="add-outline" size="large"/>
            <div class="button-text">Add photo</div>
          </div>
          <div class="edit circle-button" v-if="isOwner">
            <ion-icon name="pencil-outline" size="large"></ion-icon>
            <div class="button-text">Edit profile</div>
          </div>
        </div>
      </div>
      <div class="profile-content">
        <div class="spinner-grow text-secondary" style="width: 10rem; height: 10rem;" role="status" v-if="isLoading"/>
        <div class="conetent-wrapper" v-if="!isLoading && user">
          <div class="empty-state" v-if="!photos || photos.length === 0">
            <h4>You didn't have photo</h4>
          </div>
          <PhotoBox v-for="(photo, index) in photos" :key="index" :photo="photos[index]" :user="user" :onClickEdit="handleEdit" :index="index"/>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import ProfileImage from '../components/ProfileImage'
import PhotoBox from '../components/PhotoBox';
import PhotoEditingModal from '../components/PhotoEditingModal'
import {getPhotoByUserId, getUser} from '../api'

export default {
  props:['user'],
  data() {
    return {
      modal: false,
      photos: null,
      editIndex: null,
      owner: null,
      isLoading: false,
    }
  },
  components: {
    ProfileImage,
    PhotoBox,
    PhotoEditingModal,
  },
  created() {
    this.load()
  },
  watch: {
    $route() {
      this.load()
    }
  },
  computed: {
    isOwner() {
      if (this.$route.params.id == this.user.id) {
        return true;
      }
      return false
    }
  },
  methods: {
    handleModal(){
      this.modal = !this.modal;      
      console.log(this.modal);
    },
    async getUserById() {
      const response = await getUser(this.$route.params.id)
      this.owner = response.data;
    },
    async loadPhotos() {
      const response = await getPhotoByUserId(this.$route.params.id);
      this.photos = response.data;
    },
    async load() {
      this.isLoading = true;
      this.owner = null;
      await this.getUserById();
      await this.loadPhotos();
      this.isLoading = false;
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
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

.empty-state {
  display: flex;
  align-items: center;
  height: 20vh;
  color: gray;
}
</style>
