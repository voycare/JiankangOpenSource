<template>
  <div class="main-wrapper account-wrapper">
    <div class="account-page">
      <div class="account-center">
        <div class="account-box">
          <form class="form-signin" method="post">
            <div class="account-logo">
              <a href="index.html"><img alt="" src="/assets/img/Hera_LOGO.png"></a>
            </div>
            <div class="form-group">
              <label>Email</label>
              <small class="text-danger text-sm-left" style="display: block">{{error.email}}</small>
              <input autofocus="" class="form-control" required type="text" v-model="input.email">
            </div>


            <div class="form-group text-center">
              <button @click.prevent="requestRestorePassword" class="btn btn-primary account-btn btn-pink"
                      type="submit">Restore Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import API from "../utils/api";
  // import UTILS from "../utils/utils";

  export default {
    name: "forgetpasswordLayout",
    data() {
      return {
        input: {
          email: ""
        },
        error: {
          email: ""
        }
      }
    },
    methods: {
      validateInput: function () {
        let result = true;
        if (!this.input.email) {
          this.error.email = "email cannot be empty";
          result = false;
        } else {
          this.error.email = "";
        }
        if (this.input.email && !/\S+@\S+\.\S+/.test(this.input.email)) {
          this.error.email = "email invalid";
          result = false;
        }
        return result;
      },
      requestRestorePassword() {
        let self = this
        if (!this.validateInput()) {
          return null;
        }
        fetch(API.getApi(API.AUTH.FORGET_PASSWORD), {
          method: 'post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "email": this.input.email,
          })
        }).then(res => res.json()).then(res => {
          switch (res.status) {
            case 200: {
              alert("please check your mail box to reset password");
              self.$router.push({path: '/login'})
              return;
            }
            case 404: {
              this.error.email = "account not found for email " + this.input.email;
              return;
            }
            default: {
              return;
            }
          }
        }).catch(e => {
          console.log(e)
        });
      }
    }
  }
</script>

<style scoped>

</style>
