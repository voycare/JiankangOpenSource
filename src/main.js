import Vue from 'vue'
import App from './App.vue'
import router from './router'
import LoginLayout from "./layouts/LoginLayout";
import UserLayout from "./layouts/UserLayout";
import RegisterLayout from "./layouts/RegisterLayout";
import ForgetPasswordLayout from "./layouts/ForgetPasswordLayout";
import DraftLayout from "./layouts/DraftLayout";
import ClientLayout from "./layouts/ClientLayout";
import AdminLayout from "./layouts/AdminLayout";
import Vuex from 'vuex';
import {store} from "./store";
import './Filters'
import VueToast from 'vue-toast-notification';
import 'vue2-datepicker/index.css';


import {ValidationProvider, ValidationObserver} from 'vee-validate'
import {extend, configure} from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
import EmptyLayout from "./layouts/EmptyLayout";

// import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap-vue/dist/bootstrap-vue-icons.css'
import {BootstrapVue } from 'bootstrap-vue'

import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import ClinicLayout from "./layouts/ClinicLayout"

Vue.use(Multiselect)

// Install BootstrapVue
Vue.use(BootstrapVue)

const config = {
  mode: 'eager'
}
configure(config)

Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});

// with typescript
for (let [rule, validation] of Object.entries(rules)) {
  extend(rule, {
    ...validation
  });
}

extend('confirmed', (value, objTarget) => {
  if (value === objTarget.target) {
    return true
  }

  return 'Password and Re-enter passwords are different'
})
extend('special', (value) => {
  let regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Z]).{8,}$/
  if (value.length >= 8 && regex.test(value)) {
    return true
  }

  return 'Password must include 8 characters with at least one Capital letter, a number and a $pecial character'
})
Vue.component('validation-provider', ValidationProvider)
Vue.component('validation-observer', ValidationObserver)

// // Add a rule.
// extend('secret', {
//   validate: value => value === 'example',
//   message: 'This is not the magic word'
// });

Vue.config.productionTip = false
Vue.component('login-layout', LoginLayout)
Vue.component('admin-layout', AdminLayout)
Vue.component('clinic-layout', ClinicLayout)
Vue.component('draft-layout', DraftLayout)
Vue.component('register-layout', RegisterLayout)
Vue.component('user-layout', UserLayout)
Vue.component('client-layout', ClientLayout)
Vue.component('forget-password-layout', ForgetPasswordLayout)
Vue.component('empty-layout', EmptyLayout)
Vue.use(Vuex);
Vue.use(VueToast);

Vue.prototype.VUE_APP_BASE_URL = process.env.VUE_APP_BASE_URL
Vue.prototype.VUE_APP_HOME = process.env.VUE_APP_HOME
Vue.config.devtools = true

window.axios = require('axios');
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
