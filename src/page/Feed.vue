<template>
  <div class="main-feed-wrapper">
    <div class="main-feed" v-if="user">
      <PhotoBox v-for="(photo, index) in photos" :key="index" :photo="photos[index]" :user="user" :onClickEdit="handleEdit" :index="index"/>
      <PhotoEditingModal :onClose="handleModal" v-if="modal" v-model="photos[editIndex]" :user="user"/>
    </div>
    <div class="spinner-grow text-secondary" style="width: 10rem; height: 10rem;" role="status" v-else/>
  </div>
</template>

<script>
// import firebase from '../config/firebase'
import PhotoBox from '../components/PhotoBox'
import {getAllPhoto} from '../api'
import PhotoEditingModal from '../components/PhotoEditingModal'

export default {
  props:['user'],
  components: {
    PhotoBox,
    PhotoEditingModal
  },
  data() {
    return {
      photos: null,
      modal: false,
      editIndex: null
    }
  },
  created() {
    this.getPhotos();    
  },
  methods: {
    handleModal(){
      this.modal = !this.modal;      
    },
    handleEdit(index) {
      this.editIndex = index;
      this.handleModal();
    },
    async getPhotos() {
      try {
        const response = await getAllPhoto();
        this.photos = response.data;
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<style scoped>
.main-feed-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
