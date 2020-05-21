<template>
  <div class="modal-container">
    <div class="modal-background" />
    <div class="modal-content">
      <div class="modal-header">
        <h3>Upload photo</h3>
        <button type="button" class="close p-0" data-dismiss="modal" aria-label="Close" @click="onClose">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="input-picture-container">
        <input class="input-picture" accept="image/*" type="file" @change="onInputDisplayImage" v-if="!picture"/>
        <img :src="picture" class="preview-image" v-else/>
      </div>
      <div>
        <p class="font-weight-bold">Description</p>
        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="description" />
      </div>
      <div class="button-container">
        <button class="btn btn-primary mt-4 ml-auto">Upload</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['onClose'],
  data() {
    return {
      picture: null,
      description: '',
    }
  },
  methods: {
    onInputDisplayImage(e) {
      const files = e.target.files[0]
      this.picture = URL.createObjectURL(files);
      if (!files.length)
        return;
    }
  }
}
</script>

<style scoped>
  .modal-background {
    background-color: black;
    opacity: 0.3;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
  }
  .modal-content {
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    /* text-align: center; */
    padding: 1.5rem 1rem;
    width: 750px;
    background-color: white;
    z-index: 99;
  }
  .input-picture-container {
    display: flex;
    background-color: red;
    align-items: center;
    justify-content: center;
    margin-top: 1rem;
    /* position: relative; */
    width: 100%;
    height: 300px;
    border: 0.5px solid lightgray;
    overflow: hidden;
    margin-bottom : 1rem;
    background: white;
  }
  .input-picture {
    cursor: pointer;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
  .button-container {
    display: flex;
    justify-content: flex-end;
  }
  .preview-image {
    width: 100%;
  }
  .modal-header {
    display: flex;
    align-items: center;
  }
</style>
