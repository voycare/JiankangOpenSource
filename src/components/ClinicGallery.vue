<template>
  <div class="clinic--gallery">
    <div class="gallery--item" v-for="photo in photos" :key="photo.id"
         @mouseenter="hoveredImage = photo" @mouseleave="hoveredImage = null">
      <img width="180" height="110" :src="getSrc(photo.path)"
           :class="{ 'blur': hoveredImage && hoveredImage.id === photo.id }">
      <i class="fa fa-trash-o pointer hide-icon deleteIcon" aria-hidden="true"
         @click="onRemovePhoto(photo)"
         :class="{ 'show-icon': hoveredImage && hoveredImage.id === photo.id }"></i>
    </div>
    <a href="javascript:void(0)" @click="onAddPhoto" class="gallery--item">
      <i class="fa fa-plus mr-2"></i>
      <input @change="onAfterPickPhoto" accept="image/*" capture="environment" ref="file"
             style="display: none" type="file">
    </a>
  </div>
</template>

<script>
  export default {
    props: ['photos'],
    data() {
      return {
        hoveredImage: null
      }
    },
    methods: {
      getSrc(src) {
        if (!src) {
          return 'data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=='
        }

        return src.startsWith('data:image') ? src : (process.env.VUE_APP_BASE_URL + src)
      },
    },

    async onAfterPickPhoto(e) {
      let self = this
      const file = e.target.files[0]

      self.$emit('onAfterPickPhoto', file)
    },

    onAddPhoto() {
      let self = this

      self.$refs.file.click()
    },

    toBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      })
    },

    onRemovePhoto(photo) {
      let self = this

      self.$emit('onRemovePhoto', photo)
    }
  }
</script>

<style>
  .gallery--item {
    background-color: #fff;
    height: 110px;
    width: 180px;
    display: inline-block;
    text-align: center;
    line-height: 110px;
    margin: 2rem 1rem;
    position: relative;
  }

  .gallery--item:hover {
    background: #434343;
  }

  .blur {
    opacity: 0.2;
  }

  .clinic--gallery {
    display: flex;
    flex-flow: wrap;
  }

  .show-icon {
    visibility: visible !important;
  }

  .hide-icon {
    visibility: hidden;
  }


</style>
