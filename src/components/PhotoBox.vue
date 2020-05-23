<template>
  <div class="photo-box">
    <div class="content-wrapper">
      <img class="photo" :src="photo.url">
      <div class="text-container">
        <div class="user-information">
          <ProfileImage />
          <p class="display-name" @click="goToProfile()">{{photo.ownerName}}</p>
        </div>
        <p class="description mb-0">{{photo.description}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import ProfileImage from './ProfileImage.vue'

export default {
  props:['photo'],
  components: {
    ProfileImage,
  },
  methods: {
    goToProfile() {
      this.$router.push(`/profile/${this.photo.ownerId}`)
    }
  }
}
</script>

<style scoped>
.photo-box {
  padding: 0 15vw;
  margin-bottom: 1rem;
}
.content-wrapper {
  border: 1px solid rgb(233, 232, 232);
}
.photo {
  width: 100%;
}
.user-information {
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
  margin-bottom: 0.75rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgb(233, 232, 232);
}
.text-container {
  padding: 1rem;
  background-color: white;
}
.display-name {
  font-weight: bold;
  margin: 0;
}
.display-name:hover {
  cursor: pointer;
  text-decoration: underline;
}
</style>
