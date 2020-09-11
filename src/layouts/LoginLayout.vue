<template>
  <div>
    <div style="position: relative; background: white; height: 210px">
      <a href="http://hera.health/">
        <img class="logo" src="../../public/assets/img/Hera_LOGO.png"/>
      </a>
    </div>
    <div class="container">
      <router-view/>
    </div>

    <!--    <div class="main-wrapper account-wrapper">-->
    <!--        <img src="../../public/assets/img/Hera_LOGO.png" height="100" width="200"/>-->
    <!--        <div class="account-page">-->
    <!--            <div class="account-center">-->
    <!--                <slot/>-->
    <!--            </div>-->
    <!--        </div>-->
    <!--    </div>-->
  </div>
</template>

<script>
  import API from "./../utils/api"
  import UTILS from "./../utils/utils"

  export default {
    name: "UserLogin",
    data() {
      return {
        input: {
          email: "",
          password: ""
        },
        error: {
          email: "",
          password: ""
        }
      }
    },
    mounted() {
      let self = this
      // if (UTILS.getLocalUser()) {
      //   return self.$router.push({path: '/'})
      // }
    }
  }
</script>

<style>
  @media (min-width: 1200px) {
    .login--content {
      margin-top: 40px;
    }
  }
</style>
