<template>
  <div class="avatar-user">
    <input @change="takePhoto" accept="image/*" capture="environment" ref="file" style="display: none" 
      type="file">
    <img :width="width" :height="height" :src="getSrc(avatar_url)" ref="avatar" v-if="avatar_url">
    <img :width="width" :height="height" class="no-avatar" ref="avatar" v-else>
    <button @click="chooseImage" class="choose-image">Edit</button>
  </div>
</template>

<script>
  export default {
    props: ['avatar_url', 'width', 'height'],
    data() {
      return {
        imgSrc: null
      }
    },
    methods: {
      getSrc(src) {
        if(! src) {
          return 'data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=='
        }

        return src.startsWith('data:image') ? src : (process.env.VUE_APP_BASE_URL + src)
      },
      takePhoto(e) {
        let self = this
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
          self.imgSrc = event.target.result;
          self.$refs.avatar.src = event.target.result;

          self.$emit('onChangeAvatar', self.imgSrc)
        };
        reader.readAsDataURL(file);
      },
      chooseImage() {
        this.$refs.file.click();
      },
    }
  }
</script>

<style>
  .avatar-user {
    position: relative;
  }

  /* .avatar-user img {
    width: 260px;
    height: 170px;
  } */

  .avatar-user button {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 54px;
    height: 31px;
    background: #434343;
    font-family: Poppins;
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    line-height: 22px;
    border: none;
    color: #FFFFFF;
  }
  /* .no-avatar{
    width: 260px;
    height: 170px;
  } */
</style>
