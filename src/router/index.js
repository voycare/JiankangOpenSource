import Vue from 'vue'
import VueRouter from 'vue-router'
// import BasePage from "../views/BasePage";

import {appHelper} from "../utils/appHelper"
import routes_admin from './admin'
import routes_clinic from './clinic'
import routes_client from './client'

Vue.use(VueRouter)

let routes = {}
if (appHelper.isClinic()) {
  routes = routes_clinic
} else if (appHelper.isClient()) {
  routes = routes_client
} else {
  routes = routes_admin
}

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
