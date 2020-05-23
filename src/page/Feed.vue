<template>
  <div>
    <PhotoBox v-for="(photo, index) in photos" :key="index" :photo="photos[index]"/>
  </div>
</template>

<script>
// import firebase from '../config/firebase'
import PhotoBox from '../components/PhotoBox'
import {getAllPhoto} from '../api'

export default {
  components: {
    PhotoBox,
  },
  data() {
    return {
      photos: null,
    }
  },
  created() {
    this.getPhotos();
  },
  methods: {
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

</style>
