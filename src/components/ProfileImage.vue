<template>
  <div class="profile-image-container" :style="{ width: size, height: size, 'border-radius': size}">
    <img src="../assets/Mark.jpg" class="profile-image">
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: '50px',
    },
  }
}
</script>

<style scoped>
.profile-image-container {
  display: flex;
  align-items: center;
  overflow: hidden;
  margin-right: 0.5rem;
}
.profile-image {
  width: 100%;
}
</style>
