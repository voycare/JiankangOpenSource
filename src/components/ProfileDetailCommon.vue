<template>
  <div class="content-profile" v-if="user">
    <div class="content-1">
      <div class="name-content">
        <img :src="getSrc(user.avatar)" v-if="user.avatar">
        <img class="no-avatar" v-else>
        <div class="name-user">
          <span class="full-name">{{ user.name }}</span><img
            src="/assets/img/flag_american.png">
          <p class="id-user">Voycare ID: {{user.id | convertID}}</p>
        </div>
      </div>
    </div>
    <div class="content-2">
      <div class="infor-user">
        <div class="infor">
          <p class="title">Phone:</p>
          <p>{{user.phone | phoneNumber}}</p>
        </div>
        <div class="infor">
          <p class="title">Email:</p>
          <p>{{user.email}}</p>
        </div>
        <div class="infor">
          <p class="title">Date of Birth:</p>
          <p>{{user.birthday | convertTimeSecondToDate}}</p>
        </div>
        <div class="infor">
          <p class="title">Gender:</p>
          <p>{{user.gender | genderName}}</p>
        </div>
        <div class="infor">
          <p class="title">Country:</p>
          <p>{{user.country}}</p>
        </div>
        <div class="infor"><p class="title">Address:</p>
          <p>{{user.address.street_line_1}}</p></div>
      </div>
    </div>
  </div>
</template>
<script>

  export default {
    props: ['user'],
    methods: {
      getSrc(src) {
        if(! src) {
          return 'data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=='
        }

        return src.startsWith('data:image') ? src : (process.env.VUE_APP_BASE_URL + src)
      },
    }
  }
</script>
