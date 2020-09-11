<template>
  <div >
    <div class="profile">
      <div class="header-profile">
        <span class="title">My Profile</span>
        <router-link v-if="id" :to="'/clients/' + id + '/edit'">
          <span class="btn-edit"><img src="/assets/img/icon_pen.png">Edit Client</span>
        </router-link>
      </div>

      <ProfileDetail :user="client"></ProfileDetail>
    </div>

  </div>
</template>

<script>
  import rf from "../../api/RequestFactory"
  import ProfileDetail from '../../components/ProfileDetailCommon'

  export default {
    components: {ProfileDetail},
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
    },
  }
</script>
