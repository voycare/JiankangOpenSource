<template>
  <div>
    <div class="mt-5 mb-4 text-center">
      <h2 class="text-primary text-400">Welcome to Voycare.</h2>
    </div>
    <div class="row">
      <div class="col-md-2"></div>
      <div class="col-sm-12 col-md-8 vertical-center">
        <div
            style="border: 1px solid #C7C7C7; border-radius: 12px; background-color: white">
          <ul class="nav nav-tabs nav-tabs-bottom nav-justified pl-lg-200 pr-lg-200 pl-2 pr-2 mt-sm-50"
              style="border-bottom: 1px solid #C7C7C7;border-top: 0px;">
            <li class="nav-item"><a class="nav-link active" data-toggle="tab" href="#tab-sign-in">Sign
              in</a></li>
            <!--<li class="nav-item"><a class="nav-link text-nowrap" data-toggle="tab" href="#tab-sign-up">Create-->
              <!--account</a></li>-->
            <li class="nav-item"><a class="nav-link text-nowrap" :href="VUE_APP_HOME + '/sign-up'">Create
              account</a></li>
          </ul>

          <div class="tab-content login--content pl-lg-200 pr-lg-200 pl-3 pr-3 mt-3">
            <div class="tab-pane show active" id="tab-sign-in">
              <validation-observer ref="form_login" v-slot="{passed}">
                <form @submit.prevent="login" class="form-material" method="post">
                  <div class="form-group">
                    <validation-provider
                        name="Email Address"
                        rules="required|email"
                        v-slot="{ errors }"
                        vid="email">
                      <input class="form-control"
                             placeholder="Email Address" type="email" v-model="email">
                      <span class="form-bar"></span>
                      <small class="text-danger text-sm-left">{{ errors[0] }}</small>
                    </validation-provider>
                  </div>
                  <div class="form-group">
                    <validation-provider
                        name="Password"
                        rules="required|special"
                        v-slot="{ errors }"
                        vid="password">
                      <input class="form-control" placeholder="Password" type="password"
                             v-model="password">
                      <span class="form-bar"></span>
                      <small class="text-danger text-sm-left">{{errors[0]}}</small>
                    </validation-provider>
                  </div>
                  <div class="form-group">
                    <label><input style="margin-top: 2px" type="checkbox"> Remember me</label>
                    <span class="text-right" style="float: right">
                    <router-link class="pink" to="/forget-password">Forgot your password?</router-link>
                    </span>
                  </div>

                  <div class="form-group text-center">
                    <button :disabled="! passed" class="btn btn-pink btn-round btn-block bold"
                            type="submit">
                      Sign In
                    </button>
                  </div>
                  <div class="text-center mb-5 mt-3">
                    I'm a Provider. Please sign in <a :href="providerLoginUrl" class="pink bold">HERE</a>.
                  </div>
                </form>
              </validation-observer>
            </div>
            <!--<div class="tab-pane" id="tab-sign-up">-->
              <!--<validation-observer ref="form_register" v-slot="{passed}">-->
                <!--<form @submit.prevent="register"-->
                      <!--class="form-material"-->
                      <!--method="post">-->
                  <!--<div class="form-group">-->
                    <!--<validation-provider-->
                        <!--name="Email Address"-->
                        <!--rules="required|email"-->
                        <!--v-slot="{ errors }"-->
                        <!--vid="email_register">-->
                      <!--<input class="form-control" placeholder="Email Address" type="email"-->
                             <!--v-model="email_register">-->
                      <!--&lt;!&ndash;<span class="form-bar"></span>&ndash;&gt;-->
                      <!--<small class="text-danger text-sm-left">{{errors[0]}}</small>-->
                    <!--</validation-provider>-->
                  <!--</div>-->
                  <!--<div class="form-group">-->
                    <!--<validation-provider-->
                        <!--name="Password"-->
                        <!--rules="required|special"-->
                        <!--v-slot="{ errors }"-->
                        <!--vid="password_register">-->
                      <!--<input class="form-control" placeholder="Password" type="password"-->
                             <!--v-model="password_register">-->
                      <!--&lt;!&ndash;<span class="form-bar"></span>&ndash;&gt;-->
                      <!--<small class="text-danger text-sm-left">{{errors[0]}}</small>-->
                    <!--</validation-provider>-->
                  <!--</div>-->
                  <!--<div class="form-group">-->
                    <!--<validation-provider name="Re-enter Password"-->
                                         <!--rules="required|special|confirmed:password_register"-->
                                         <!--v-slot="{ errors }"-->
                                         <!--vid="password_confirm_register">-->
                      <!--<input class="form-control"-->
                             <!--placeholder="Re-enter Password"-->
                             <!--type="password"-->
                             <!--v-model="password_confirm_register">-->
                      <!--&lt;!&ndash;<span class="form-bar"></span>&ndash;&gt;-->
                      <!--<small class="text-danger text-sm-left">{{errors[0]}}</small>-->
                    <!--</validation-provider>-->
                  <!--</div>-->
                  <!--<div class="form-group">-->
                    <!--<label><input style="margin-top: 2px" type="checkbox" v-model="terms" value="1">-->
                      <!--I agree to-->
                      <!--the</label><a class="pink" href="#"> Terms and Conditions</a>-->
                    <!--<div>-->
                      <!--<small :class="terms ? 'hide' : (terms === null ? 'hide' : 'show')"-->
                             <!--class="text-danger text-sm-left">Please-->
                        <!--Check the I agree Terms and Conditions-->
                      <!--</small>-->
                    <!--</div>-->
                  <!--</div>-->
                  <!--<div class="form-group text-center">-->
                    <!--<button :disabled="!passed || (terms === false || terms === null)"-->
                            <!--class="btn btn-pink btn-round btn-block bold"-->
                            <!--type="submit">-->
                      <!--Create Account-->
                    <!--</button>-->
                  <!--</div>-->
                  <!--<div class="text-center mb-5 mt-3">-->
                    <!--Are you a Provider? Create an account <a :href="providerRegisterUrl"-->
                                                             <!--class="pink bold">HERE</a>.-->
                  <!--</div>-->
                <!--</form>-->
              <!--</validation-observer>-->
            <!--</div>-->
          </div>
        </div>
      </div>
      <div class="col-md-2"></div>
    </div>
  </div>
</template>

<script>
  import API from "./../utils/api"
  import UTILS from "./../utils/utils"
  import {providerUrls} from './../utils/providerUrls'

  export default {
    name: "UserLogin",
    computed: {
      providerLoginUrl: () => providerUrls.login_url,
      providerRegisterUrl: () => providerUrls.register_url
    },
    data() {
      return {
        email: "",
        password: "",
        email_register: '',
        password_register: '',
        password_confirm_register: '',
        terms: null,
        error: {
          email: "",
          password: ""
        }
      }
    },
    mounted() {
      let self = this

      if (UTILS.getLocalUser()) {
        return self.$router.push({path: '/'})
      }
    },
    methods: {
      register: function () {
        let self = this

        fetch(API.getApi(API.AUTH.REGISTER), {
          method: 'post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "email": self.email_register,
            "password": self.password_register
          })
        })
          .then(res => res.json())
          .then(res => {
            switch (res.status) {
              case 200: {
                res.data.user.token = "Bearer " + res.data.token;
                UTILS.setLocalUser(res.data.user);
                self.$router.push({path: '/'})
                return;
              }
              case 414: {
                let errors = {}
                Object.keys(res.message).forEach(index => {
                  errors[index + '_register'] = res.message[index]
                })

                self.$refs.form_register.setErrors(errors)
                return
              }
              default: {
                if (res.message) {
                  alert(res.message)
                }
              }
            }
          })
          .catch(e => {
            alert('Server unavailable!')
          });
      },
      login: function () {
        let self = this

        fetch(API.getApi(API.AUTH.LOGIN), {
          method: 'post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "email": this.email,
            "password": this.password
          })
        })
          .then(res => res.json())
          .then(res => {
            switch (res.status) {
              case 200: {
                res.data.user.token = "Bearer " + res.data.token;
                UTILS.setLocalUser(res.data.user);
                self.$router.push({path: '/'})
                return;
              }
              case 414: {
                self.$refs.form_login.setErrors(res.message)
                return
              }
              case 412: {
                window.alert(res.message)
                return;
              }
              default: {
                this.error.password = "email or password is incorrect";
                return;
              }
            }
          }).catch(e => {
          console.log(e)
          alert('Server unavailable!')
        });
      },
      loginWechat: function () {
        alert("this function will be coming soon")
      }
    }
  }
</script>

<style scoped>

</style>
