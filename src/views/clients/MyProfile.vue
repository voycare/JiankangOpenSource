<template>
  <div >
    <div class="profile">
      <div class="header-profile">
        <span class="title">My Profile</span>
        <router-link to="/profile-edit">
          <span class="btn-edit"><img src="/assets/img/icon_pen.png">Edit Profile</span>
        </router-link>
      </div>

      <ProfileEditCommon :user="user"></ProfileEditCommon>
    </div>

  </div>
</template>

<script>
  import utils from "../../utils/utils"
  import ProfileEditCommon from '../../components/ProfileDetailCommon'

  export default {
    name: "MyProfile",
    components: {ProfileEditCommon},
    data() {
      return {
        user: utils.getLocalUser()
      }
    }
  }
</script>
