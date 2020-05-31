<template>
  <div class="profile-image-container" :style="{ width: size, height: size, 'border-radius': size}">
    <div v-if="image" class="profile-image">
      <img :src="image" class="profile-image" />
    </div>
    <img src="https://cdn.onlinewebfonts.com/svg/img_568656.png" class="profile-image" v-else/>
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: '50px',
    },
    image: {
      type: String,
      default: null
    }
  }
}
</script>

<style scoped>
.profile-image-container {
  display: flex;
  align-items: center;
  overflow: hidden;
  margin-right: 0.5rem;
  cursor: pointer;
}
.profile-image {
  width: 100%;
  height: 100%;
}
</style>
