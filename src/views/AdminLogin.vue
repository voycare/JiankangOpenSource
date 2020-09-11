<template>
  <div>
    <div class="mt-5 mb-4 text-center">
      <h2 class="text-primary text-400">Welcome Administrator!</h2>
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
              <form class="form-material" method="post">
                <div class="form-group">
                  <input class="form-control" placeholder="Email Address" type="email"
                         v-model="input.email">
                  <span class="form-bar"></span>
                  <small class="text-danger text-sm-left"
                         style="display: block">{{error.email}}
                  </small>
                </div>
                <div class="form-group">
                  <input class="form-control" placeholder="Password" type="password"
                         v-model="input.password">
                  <span class="form-bar"></span>
                  <small class="text-danger text-sm-left"
                         style="display: block">{{error.password}}
                  </small>
                </div>
                <div class="form-group">
                  <label><input style="margin-top: 2px" type="checkbox"> Remember me</label>
                  <span class="text-right" style="float: right">
                    <router-link class="pink" to="/forget-password">Forgot your password?</router-link>
                    </span>
                </div>


                <div class="form-group text-center">
                  <button @click.prevent="login" class="btn btn-pink btn-round btn-block"
                          style="font-weight: bold" type="submit">
                    Sign In
                  </button>
                </div>
                <div class="text-center mb-5 mt-3">
                  I'm a Provider. Please sign in <a :href="providerLoginUrl"
                                                    class="pink bold">HERE</a>.
                </div>
              </form>
            </div>
            <!--<div class="tab-pane" id="tab-sign-up">-->
              <!--<form class="form-material" method="post">-->
                <!--<div class="form-group">-->
                  <!--<small class="text-danger text-sm-left"-->
                         <!--style="display: block">{{error.email}}-->
                  <!--</small>-->
                  <!--<input class="form-control" placeholder="Email Address" type="email"-->
                         <!--v-model="input.email">-->
                  <!--<span class="form-bar"></span>-->
                <!--</div>-->
                <!--<div class="form-group">-->
                  <!--<small class="text-danger text-sm-left"-->
                         <!--style="display: block">{{error.password}}-->
                  <!--</small>-->
                  <!--<input class="form-control" placeholder="Password" type="password"-->
                         <!--v-model="input.password">-->
                  <!--<span class="form-bar"></span>-->
                <!--</div>-->
                <!--<div class="form-group">-->

                  <!--<input class="form-control" placeholder="Re-enter Password" type="password">-->
                  <!--<span class="form-bar"></span>-->
                  <!--<small class="text-danger text-sm-left"-->
                         <!--style="display: block">{{error.password}}-->
                  <!--</small>-->
                <!--</div>-->
                <!--<div class="form-group">-->
                  <!--<label><input style="margin-top: 2px" type="checkbox"> I agree to the</label>-->
                  <!--<a class="blue" href="#"> Terms and Conditions</a>-->
                <!--</div>-->
                <!--<div class="form-group text-center">-->
                  <!--<button @click.prevent="register" class="btn btn-pink btn-round btn-block"-->
                          <!--type="submit">-->
                    <!--Create Account-->
                  <!--</button>-->
                <!--</div>-->
                <!--<div class="text-center mb-5 mt-3">-->
                  <!--Are you a Provider? Create an account <a :href="providerRegisterUrl"-->
                                                           <!--class="pink bold">HERE</a>.-->
                <!--</div>-->
              <!--</form>-->
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
      // if (UTILS.getLocalAdmin()) {
      //   window.location.href = "/";
      // }
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
        if (!this.input.password) {
          this.error.password = "password cannot be empty";
          result = false;
        } else {
          this.error.password = "";
        }
        return result;
      },
      login: function () {
        let self = this

        if (!this.validateInput()) {
          console.log(this.error)
          return null;
        }
        fetch(API.getApi(API.ADMIN.AUTH.LOGIN), {
          method: 'post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "email": this.input.email,
            "password": this.input.password
          })
        }).then(res => res.json()).then(res => {
          switch (res.status) {
            case 200: {
              res.data.admin.token = "Bearer " + res.data.token;
              UTILS.setLocalAdmin(res.data.admin);
              self.$router.push({path: '/'})
              return;
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
