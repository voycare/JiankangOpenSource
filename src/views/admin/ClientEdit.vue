<template>
  <div>
    <div class="edit-profile">
      <BackTo :to="'/clients/' + id" :text="'Back to Client Detail'" />
      <p class="title-edit">Edit Profile</p>

      <ProfileEditCommon :user="client"></ProfileEditCommon>
    </div>
  </div>
</template>

<script>
  import rf from "../../api/RequestFactory"
  import ProfileEditCommon from '../../components/ProfileEditCommon'
  import BackTo from '../../components/BackTo'

  export default {
    components: {
      ProfileEditCommon, BackTo
    },
    data() {
      return {
        id: null,
        client: null
      }
    },
    mounted() {
      let self = this

      self.id = self.$route.params.id
      rf.getRequest('AdminRequest').getClientDetail(self.id).then(res => {
        self.client = res.data
      })
    }
  }
</script>
