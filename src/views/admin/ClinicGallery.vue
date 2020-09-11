<template>
  <div>
    <p class="title title-22 pb-5">Gallery</p>

    <p>Please upload photos no more than 2MB each, JPG format only.</p>

    <ClinicGallery :photos="photos" @onAfterPickPhoto="onAfterPickPhoto" @onRemovePhoto="onRemovePhoto"></ClinicGallery>
  </div>
</template>
<script>
  import rf from "../../api/RequestFactory"
  import ClinicGallery from '../../components/ClinicGallery'

  export default {
    components: {
      ClinicGallery
    },
    data() {
      return {
        id: null,
        photos: []
      }
    },
    mounted() {
      let self = this

      self.id = self.$route.params.id
      self.getDetail()
    },
    methods: {
      getDetail() {
        let self = this

        rf.getRequest('AdminRequest').getClinicPhotos(self.id).then(res => {
          self.photos = res.data
        })
      },
      onAfterPickPhoto(file) {
        let self = this
        const form_data = new FormData()
        form_data.append('image', file)
        rf.getRequest('AdminRequest').postClinicPhotosUpload(self.id, form_data)
          .then(res => {
            self.getDetail()
          })
      },
      onRemovePhoto(photo) {
        let self = this
        var r = confirm("Are you want to remove this clinic?");
        if (!r)
          return

        rf.getRequest('AdminRequest').postClinicPhotoRemove(self.id, {photo_id: photo.id}).then(res => {
          self.getDetail()
        })
      }
    }
  }
</script>
