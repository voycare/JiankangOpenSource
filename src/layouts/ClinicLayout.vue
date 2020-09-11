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
                        <span class="user-img mr-2">
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
          <ul v-if="is_clinic_parts">
            <router-link
                active-class="active"
                tag="li"
                to="/"
            >
              <a href="#">
                <img src="../assets/clinic-home.svg"> <span class="title-15">Back to Dashboard</span>
              </a>
            </router-link>
            <div class="view-title">
              <span class="title-18">Clinic Profile</span>
            </div>
            <b-progress max="100">
              <b-progress-bar value="20" label="20%"></b-progress-bar>
            </b-progress>
            <router-link
                to="/profile"
                active-class="active"
                tag="li"
            >
              <a href="#">
                <i class="fa fa-file-text-o" aria-hidden="true"></i>
                <span class="title-15">Clinic Profile</span>
              </a>
            </router-link>
            <router-link
                active-class="active"
                tag="li"
                to="/profile-doctors"
            >
              <a href="#">
                <i class="fa fa-user-md"></i>
                <span class="title-15">Doctors</span>
              </a>
            </router-link>
            <router-link
                to="/profile-services"
                active-class="active"
                tag="li"
            >
              <a href="#">
                <i class="fa fa-comment" aria-hidden="true"></i>
                <span class="title-15">Services</span>
              </a>
            </router-link>
            <router-link
                to="/profile-availables"
                active-class="active"
                tag="li"
            >
              <a href="#">
                <i class="fa fa-calendar-check-o" aria-hidden="true"></i>
                <span class="title-15">Availability</span>
              </a>
            </router-link>
            <router-link
                to="/profile-photos"
                active-class="active"
                tag="li"
            >
              <a href="#">
                <i class="fa fa-file-image-o" aria-hidden="true"></i><span class="title-15">Gallery</span>
              </a>
            </router-link>
          </ul>
          <ul v-if="! is_clinic_parts">
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

            <router-link
                active-class="active"
                tag="li"
                to="/statements">
              <a href="#"> <span class="icon-appointments-un  "></span>
                <span>Statements</span></a>
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

            <router-link active-class="active" tag="li" to="/messages">
              <a href="#">
                <span class="icon-message-un"></span> <span> Messages</span>
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
    name: "ClinicLayout",
    data() {
      return {
        user: {},
        is_clinic_parts: false,
      }
    },
    mounted() {
      let self = this

      // Init.
      window.initApp();

      if (!Utils.getLocalClinic()) {
        return self.$router.push({path: '/login'})
      } else {
        this.user = Utils.getLocalClinic();
      }
    },
    updated() {
      let self = this

      // Init.
      window.initApp();

      self.showClinicMenusByName(self.$route.name)
    },
    methods: {
      logout: function () {
        let self = this

        rf.getRequest('AuthRequest').logout().then(res => {
          switch (res.status) {
            case 200: {
              Utils.removeLocalClinic()
              return self.$router.push({path: '/login'})
            }
          }
        })
      },
      showClinicMenusByName(name) {
        let self = this
        self.is_clinic_parts = ['ProfileDetail', 'ProfileEdit', 'ProfileDoctorListing', 'ProfileDoctorEdit', 'ProfileServiceListing', 'ProfileServicesEdit', 'ProfileAvailables', 'ProfileGallery'].includes(name) ? true : false
      }
    }
  }
</script>

<style scoped>
  .progress {
    height: 20px;
    border-radius: 0;
    background: #D8D8D8;
  }
  .progress-bar {
    background-color: #FDD3D1;
    color: #434343;
  }
  .view-title{
    width: 100%;
    height: 45px;
    background: #FFAFAE;
    padding: 9px 22px;
  }
  ul i{
    font-size: 20px;
  }
</style>
