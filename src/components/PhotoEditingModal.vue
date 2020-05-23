<template>
  <div class="modal">
    <div class="content-container">
      <div class="modal-content">
        <div class="modal-header">
          <h3 v-if="!isEdit">Upload photo</h3>
          <h3 v-else>Edit photo</h3>
          <button type="button" class="close p-0" data-dismiss="modal" aria-label="Close" @click="onClose">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="input-picture-container">
          <div class="helper-text" v-if="!photo">Click this box to upload photo</div>
          <input class="input-picture" accept="image/*" type="file" @change="onInputDisplayImage" v-if="!photo"/>
          <img :src="photo" class="preview-image" v-else/>
        </div>
        <div>
          <p class="font-weight-bold">Description *</p>
          <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="description" />
        </div>
        <div class="button-container">
          <button class="btn btn-outline-danger mt-4" type="button" @click="onClickReset" v-if="!value">Reset</button>
          <button class="btn btn-outline-danger mt-4" type="button" @click="onClickDelete" v-else>Delete</button>
          <button class="btn btn-primary mt-4 ml-auto" type="button" @click="onClickSubmit" :disabled="!photo || !description">Submit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { deletePhoto, editPhotoDescription, uploadPhoto } from '../api' 

export default {
  props: ['onClose', 'value', 'user'],
  data() {
    return {
      photo: null,
      description: '',
      isEdit: false,
    }
  },
  created() {
    if(this.value) {
      this.photo = this.value.url;
      this.description = this.value.description;
      this.isEdit = true;
    }
  },
  methods: {
    onInputDisplayImage(e) {
      const files = e.target.files[0]
      this.photo = URL.createObjectURL(files);
      if (!files.length)
        return;
    },
    onClickReset() {
      this.photo = null;
      this.description = '';
    },
    async onClickDelete() {
      try {
        await deletePhoto(this.value.id);
        this.$router.go();
      } catch(error) {
        console.log(error)
      }
    },
    async onClickSubmit() {
      if (this.isEdit) {
        if (!this.value.ownerId !== this.user.id) this.onClose();
        const body = {
          ...this.value,
          description: this.description
        }
        await editPhotoDescription(this.value.id, body)
        this.$emit('input', body)
        this.onClose()
      } else {
        const body = {
          url: this.photo,
          description: this.description,
          ownerName: this.user.displayName,
          ownerId: this.user.ownerId
        }
        await uploadPhoto(body);
        this.$router.go()
      }
    }
  }
}
</script>

<style scoped>
  .modal {
    display: block;
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: hidden; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
  }
  .content-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  .modal-content {
    background-color: #fefefe;
    padding: 20px;
    border: 1px solid #888;
    width: 750px; /* Could be more or less, depending on screen size */
  }
  .helper-text {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    color: gray
  }
  .input-picture-container {
    display: flex;
    background-color: red;
    position: relative;
    align-items: center;
    justify-content: center;
    margin-top: 1rem;
    border: 0.5px solid lightgray;
    /* position: relative; */
    width: 100%;
    height: 300px;
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
