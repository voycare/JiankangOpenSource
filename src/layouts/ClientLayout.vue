<template>
  <div class="main-wrapper">
    <div class="header">
      <img alt="" class="m-l-30 m-t-10" id="logoMain"
           src="../assets/logo-hera-main.svg" style="height: 45px; width: 150px">
      <!--<a id="toggle_btn" href="javascript:void(0);"><i class="fa fa-bars"></i></a>-->
      <a class="mobile_btn float-left" href="#sidebar" id="mobile_btn"><i class="fa fa-bars"></i></a>
      <ul class="nav user-menu float-right m-t-10">
        <li class="nav-item dropdown has-arrow">
          <a class="dropdown-toggle nav-link user-link" data-toggle="dropdown" href="#">
                        <span class="user-img">
                            <img alt="" src="../assets/avt-circle.png">
							<span class="status online"></span>
						</span>
            <span>{{user.first_name}}</span>
          </a>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="/">Dashboard</a>
            <router-link class="dropdown-item" to="/profile">My Profile</router-link>
            <a @click.prevent="logout" class="dropdown-item" href="#">Logout</a>
          </div>
        </li>
      </ul>
      <div class="dropdown mobile-user-menu float-right">
        <a aria-expanded="false" class="dropdown-toggle" data-toggle="dropdown" href="#"><i
            class="fa fa-ellipsis-v"></i></a>
        <div class="dropdown-menu dropdown-menu-right">
          <a class="dropdown-item" href="/">Dashboard</a>
          <router-link class="dropdown-item" to="/profile">My Profile</router-link>
          <a @click.prevent="logout" class="dropdown-item" href="#">Logout</a>
        </div>
      </div>
    </div>
    <div class="sidebar m-t-10" id="sidebar">
      <div class="sidebar-inner slimscroll">
        <div class="sidebar-menu" id="sidebar-menu">
          <ul>
            <li class="menu-title">Main</li>
            <router-link
                tag="li"
                to="/">
              <a href="/">
                <span class="icon-dashboard-un"></span> <span>Dashboard</span>
              </a>
            </router-link>
            <router-link
                active-class="active"
                tag="li"
                to="/appointments">
              <a href="#"> <span class="icon-appointments-un  "></span>
                <span>Appointments</span></a>
            </router-link>

            <router-link active-class="active" tag="li" to="/messages">
              <a href="#">
                <span class="icon-message-un"></span> <span> Messages</span>
              </a>
            </router-link>
            <router-link active-class="active" tag="li" to="/payments">
              <a href="#">
                <span class="icon-payment-un"></span> <span> Payments</span>
              </a>
            </router-link>
            <router-link
                active-class="active"
                tag="li"
                to="/reviews">
              <a href="#">
                                <span class="icon-reviews-un" style="font-size: 20px"><span class="path1"></span><span
                                    class="path2"></span><span class="path3"></span><span class="path4"></span><span
                                    class="path5"></span><span class="path6"></span><span
                                    class="path7"></span></span> <span>Review</span>
              </a>
            </router-link>
            <router-link
                active-class="active"
                tag="li"
                to="/profile">
              <a href="#">
                <span class="icon-myprofile-un"></span><span>My Profile</span>
              </a>
            </router-link>
            <li class="submenu">
              <a href="#"> <span class="icon-setting-un"></span> <span> Settings</span> <span
                  class="menu-arrow"></span></a>
              <ul style="display: none;">
                <router-link
                    active-class="active"
                    tag="li"
                    to="/setting-localization">
                  <a href="#">
                    <span class="icon-location m-r-15"></span> <span>Localization</span>
                  </a>
                </router-link>
                <router-link
                    active-class="active"
                    tag="li"
                    to="/settings/notification">
                  <a href="#">
                    <span class="icon-notification-un m-r-15"></span> <span>Notifications</span>
                  </a>
                </router-link>
                <router-link
                    active-class="active"
                    tag="li"
                    to="/settings/password">
                  <a href="#">
                    <span class="icon-lock m-r-15"></span><span>Change Password</span>
                  </a>
                </router-link>

                <!--<router-link-->
                <!--tag="li"-->
                <!--active-class="active"-->
                <!--to="setting-password">-->
                <!--<a href="#"><i class="fa fa-cog"></i> <span>Password</span></a>-->
                <!--</router-link>-->
              </ul>
            </li>
            <li>
              <a href="/"> <span><img src="../assets/hera-logo.svg"></span> <span>Voycare Website</span></a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="page-wrapper">
      <div class="content m-t-30">
        <slot/>
      </div>
    </div>
  </div>
</template>

<script>
  import Utils from "../utils/utils"
  import rf from '../api/RequestFactory'

  export default {
    name: "UserLayout",
    data() {
      return {
        user: {}
      }
    },
    mounted() {
      let self = this

      // Init.
      window.initApp();

      if (!Utils.getLocalUser()) {
        return self.$router.push({path: '/login'})
      } else {
        this.user = Utils.getLocalUser();
      }
    },
    methods: {
      logout: function () {
        let self = this

        rf.getRequest('AuthRequest').logout().then(res => {
          switch (res.status) {
            case 200: {
              Utils.removeLocalUser()
              return self.$router.push({path: '/login'})
            }
          }
        })
      }
    }
  }
</script>

<style scoped>
</style>
