<template>
  <div class="container pt-5">
    <div class="row">
      <div class="col-sm-2">

      </div>
      <div class="col-sm-8">
        <h2 class="title-22 pb-4" style="color: #020644;">Change Password</h2>
        <validation-observer ref="form_register" v-slot="{passed}">
          <form @submit.prevent="updatePassword"
                method="post">
            <div class="row mb-3">
              <div class="col-sm-12">
                <div class="form-group">
                  <span>Old Password</span>
                  <validation-provider
                      name="Old Password"
                      rules="required|special"
                      v-slot="{ errors }"
                      vid="old_password">

                    <div style="display: flex;position: relative;">
                      <input class="form-control" id="old__password" placeholder="Old Password"
                             type="password" v-model="password.old_password">
                      <span @click="onTogglePassword('old__password', 'show_pwd_old')"
                            class="tick--eye"><i
                          :class="show_pwd_old ? 'fa fa-eye' : 'fa fa-eye-slash'"></i></span>
                    </div>
                    <small class="text-danger text-sm-left">{{errors[0]}}</small>
                  </validation-provider>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-sm-6">
                <div class="form-group">
                  <span>New Password</span>
                  <validation-provider
                      name="New Password"
                      rules="required|special"
                      v-slot="{ errors }"
                      vid="new_password">
                    <div style="display: flex;position: relative;">
                      <input class="form-control"
                             id="new__password"
                             placeholder="New Password"
                             type="password"
                             v-model="password.new_password">
                      <span @click="onTogglePassword('new__password', 'show_pwd')"
                            class="tick--eye"
                            style="right: 20px"><i
                          :class="show_pwd ? 'fa fa-eye' : 'fa fa-eye-slash'"></i></span>
                      <span class="tick-save"><i
                          class="fa fa-check-circle text-muted"></i></span>
                    </div>

                    <small class="text-danger text-sm-left">{{errors[0]}}</small>
                  </validation-provider>
                </div>
              </div>

              <div class="col-sm-6">
                <div class="form-group">
                  <span>Confirm Password</span>
                  <validation-provider name="Confirm Password"
                                       rules="required|special|confirmed:new_password"
                                       v-slot="{ errors }"
                                       vid="new_password_confirmation">
                    <div style="display: flex;position: relative;">
                      <input class="form-control"
                             id="new__password_confirm"
                             placeholder="Confirm Password"
                             type="password"
                             v-model="password.new_password_confirmation">
                      <span @click="onTogglePassword('new__password_confirm', 'show_pws_confirm')"
                            class="tick--eye"
                            style="right: 20px"><i
                          :class="show_pws_confirm ? 'fa fa-eye' : 'fa fa-eye-slash'"></i></span>
                      <span class="tick-save"><i
                          class="fa fa-check-circle text-muted"></i></span>
                    </div>

                    <small class="text-danger text-sm-left">{{errors[0]}}</small>
                  </validation-provider>
                </div>
              </div>
            </div>

            <div class="row m-t-20">
              <div class="col-sm-3"></div>
              <div class="col-sm-5">
                <button :disabled="!passed"
                        class=" btn-savepassword "
                        type="submit">
                  UPDATE PASSWORD
                </button>
              </div>
              <div class="col-sm-4"></div>
            </div>
          </form>
        </validation-observer>
      </div>
      <div class="col-sm-2">
      </div>
    </div>
  </div>
</template>

<script>
  import rf from "../api/RequestFactory";
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        show_pwd_old: false,
        show_pwd: false,
        show_pws_confirm: false,
        password: {
          old_password: null,
          new_password: null,
          new_password_confirmation: null
        }
      }
    },
    methods: {
      updatePassword() {
        let self = this
        let params = self.password

        rf.getRequest('AuthRequest').postChangePassword(params).then(res => {
        });
      },

      onTogglePassword(selectorId, show_pwd) {
        let self = this
        let x = document.getElementById(selectorId)
        if (x.type === 'password') {
          self[show_pwd] = true
          x.type = 'text'
        } else {
          self[show_pwd] = false
          x.type = 'password'
        }
      },
    }
  }
</script>

<style>
  .tick--eye {
    display: block;
    position: absolute;
    width: 30px;
    line-height: 40px;
    right: -5px;
  }
</style>
