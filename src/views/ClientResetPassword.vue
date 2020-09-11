<template>
  <div>
    <div class="mt-5 mb-4 text-center">
    </div>
    <div class="row">
      <div class="col-sm-2"></div>
      <div class="col-sm-12 col-sm-8 vertical-center">
        <div class="card">
          <div class="card-header text-center">
            Forgot Password
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-sm-3"></div>
              <div class="col-sm-6">
                <form class="form-material" method="post">
                  <div class="text-center mb-4">
                    <span
                        class="desc-18">Please enter your email and we will send you a link to reset your password.</span>
                  </div>
                  <div class="mb-4">
                    <input class="form-control" placeholder="Email Address" type="email"
                           v-model="input.email">
                    <span class="form-bar"></span>
                    <small class="text-danger text-sm-left"
                           style="display: block">{{error.email}}
                    </small>
                  </div>

                  <div class="text-center mb-5">
                    <button @click.prevent="requestResetPassword"
                            class="btn btn-pink account-btn btn-block"
                            type="submit">
                      Reset
                    </button>
                  </div>

                  <div class="mt-5 mb-5 text-center desc-16" v-if="error_msg">{{ error_msg }}</div>

                  <div class="text-center mb-4">
                    <router-link class="pink text-link title-15" to="/login">Back to Sign In
                    </router-link>
                  </div>
                </form>
              </div>
              <div class="col-sm-3"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-2"></div>
    </div>
  </div>
</template>

<script>
  import API from "./../utils/api"
  import utils from "./../utils/utils"
  import {appHelper} from "./../utils/appHelper"
  import rf from '../api/RequestFactory'

  export default {
    name: "UserLogin",
    data() {
      return {
        error_msg: null,
        input: {
          email: "",
        },
        error: {
          email: "",
        }
      }
    },
    mounted() {
      if (utils.getLocalUser() && appHelper.isClient()) {
        window.location.href = "/";
      }
      if (utils.getLocalAdmin() && appHelper.isAdmin()) {
        window.location.href = "/";
      }
      if (utils.getLocalClinic() && appHelper.isClinic()) {
        window.location.href = "/";
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
      requestResetPassword: function () {
        let self = this
        if (!this.validateInput()) {
          return null;
        }

        rf.getRequest('UserRequest').postForgetPassword(self.input).then(res => {
          switch (res.status) {
            case 200: {
              self.error_msg = 'please check your email for new password'
              return;
            }
          }
        })
      },
      loginWechat: function () {
        let self = this
        self.error_msg = 'this function will be coming soon'
      }
    }
  }
</script>

<style scoped>

</style>
