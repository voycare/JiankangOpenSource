<template>
  <div class="edit-profile">
    <router-link
        to="/profile"
    >
      <img src="/assets/img/icon_back.png"> <span class="back">Back to My Profile</span>
    </router-link>
    <p class="title-edit">Edit Profile</p>

    <ProfileEditCommon :user="user"></ProfileEditCommon>
  </div>
</template>

<script>
  import utils from "../../utils/utils"
  import ProfileEditCommon from '../../components/ProfileEditCommon'

  export default {
    components: {
      ProfileEditCommon
    },
    data() {
      return {
        user: utils.getLocalUser()
      }
    },
  }
</script>
