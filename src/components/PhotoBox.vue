<template>
  <div class="photo-box">
    <img class="photo" src="../assets/output.jpg">
    <div class="text-container">
      <div class="user-information">
        <div class="profile-image-container">
          <img src="../assets/Mark.jpg" class="profile-image">
        </div>
        <p class="display-name">Mark</p>
      </div>
      <p class="description">Example image</p>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style scoped>
.photo-box {
  padding: 0 15vw;
}
.photo {
  width: 100%;
}
.user-information {
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
  margin-bottom: 0.75rem;
}
.profile-image-container {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  overflow: hidden;
  border-radius: 50px;
  margin-right: 0.5rem;
}
.profile-image {
  width: 100%;
}
.text-container {
  margin-top: 1rem;
}
.display-name {
  font-weight: bold;
  margin: 0;
}
</style>
