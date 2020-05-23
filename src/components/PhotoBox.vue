<template>
  <div class="photo-box">
    <div class="content-wrapper">
      <img class="photo" :src="photo.url">
      <div class="text-container">
        <div class="user-information information-box">
          <div @click="goToProfile()">
            <ProfileImage :image="user.displayImage"/>
          </div>
          <p class="display-name" @click="goToProfile()">{{photo.ownerName}}</p>
        </div>
        <div class="information-box">
          <p class="description mb-0">{{photo.description}}</p>
          <ion-icon class="edit-button" name="pencil-outline" v-if="user.id === photo.ownerId" @click="onClickEdit(index)"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProfileImage from './ProfileImage.vue'

export default {
  props:['photo', 'user', 'onClickEdit', 'index'],
  components: {
    ProfileImage,
  },
  methods: {
    goToProfile() {
      this.$router.push(`/profile/${this.userId}`)
    },
  }
}
</script>

<style scoped>
.photo-box {
  /* padding: 0 15vw; */
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
}
.content-wrapper {
  border: 1px solid rgb(233, 232, 232);
  max-width: 600px;
  min-width: 400px;
}
.photo {
  width: 100%;
}
.user-information {
  margin-top: 0.5rem;
  margin-bottom: 0.75rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgb(233, 232, 232);
}
.information-box {
  display: flex;
  align-items: center;
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
.edit-button {
  margin-left: auto;
  cursor: pointer;
}
</style>
