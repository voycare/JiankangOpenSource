<template>
  <div class="main-wrapper">
    <div class="header">
      <img alt="" class="m-l-30 m-t-10" id="logoMain"
           src="../assets/logo-hera-main.svg" style="height: 45px; width: 150px">
      <!--<a id="toggle_btn" href="javascript:void(0);"><i class="fa fa-bars"></i></a>-->
      <a class="mobile_btn float-left" href="#sidebar" id="mobile_btn"><i class="fa fa-bars"></i></a>
      <ul class="nav user-menu float-right m-t-10" v-if="user">
        <li class="nav-item dropdown has-arrow">
          <a class="dropdown-toggle nav-link user-link" data-toggle="dropdown" href="#">
                        <span class="user-img">
							<img alt="Admin" class="rounded-circle" src="assets/img/user.jpg" width="24">
							<span class="status online"></span>
						</span>
            <span>{{user.first_name}}</span>
          </a>
          <div class="dropdown-menu">
            <router-link class="dropdown-item" to="/">Dashboard</router-link>
            <router-link class="dropdown-item" to="/my-profile">My Profile</router-link>
            <a @click.prevent="logout" class="dropdown-item" href="javascript:void(0)">Logout</a>
          </div>
        </li>
      </ul>
      <div class="dropdown mobile-user-menu float-right">
        <a aria-expanded="false" class="dropdown-toggle" data-toggle="dropdown" href="#"><i
            class="fa fa-ellipsis-v"></i></a>
        <div class="dropdown-menu dropdown-menu-right">
          <a class="dropdown-item" href="profile.html">My Profile</a>
          <a class="dropdown-item" href="edit-profile.html">Edit Profile</a>
          <a class="dropdown-item" href="settings.html">Settings</a>
          <a class="dropdown-item" href="login.html">Logout</a>
        </div>
      </div>
    </div>
    <div class="sidebar" id="sidebar">
      <div class="sidebar-inner slimscroll">
        <div class="sidebar-menu" id="sidebar-menu">
          <ul v-if="! is_clinic_parts && ! is_settings">
            <li class="menu-title">Main</li>
            <router-link
                tag="li"
                to="/"
            >
              <a href="#">
                <i class="icon-dashboard-un"></i> <span>Dashboard</span>
              </a>
            </router-link>
            <li class="submenu">
              <a href="#">
                <i class="fa fa-calendar"></i> <span>Appointments</span>
                <span
                    class="menu-arrow"></span>
              </a>
              <ul style="display: none;">
                <router-link
                    active-class="active"
                    tag="li"
                    to="/appointments">
                  <a href="#">
                    <span>All</span>
                  </a>
                </router-link>
                <router-link
                    active-class="active"
                    tag="li"
                    to="/appointment-24h">
                  <a href="#">
                    <span>24 - Hour</span>
                  </a>
                </router-link>
                <router-link
                    active-class="active"
                    tag="li"
                    to="/appointment-7d">
                  <a href="#">
                    <span>7 - Day</span>
                  </a>
                </router-link>
                <router-link
                    active-class="active"
                    tag="li"
                    to="/appointment-cr">
                  <a href="#">
                    <span>Cancellation Requests</span>
                  </a>
                </router-link>
              </ul>
            </li>
            <!-- <li class="submenu">
              <a href="#"> <i class="icon-setting-un"></i> <span> Settings</span> <span
                  class="menu-arrow"></span></a>
              <ul style="display: none;">
                <router-link
                    active-class="active"
                    tag="li"
                    to="/settings/notification">
                  <a href="#">
                    <span class="icon-notification-un m-r-15"></span> <span>Notifications</span>
                  </a>
                </router-link>
              </ul>
            </li> -->
            <li class="submenu">
              <a href="#"><i class="fa fa-home"></i> <span>Clinics</span><span class="menu-arrow"></span></a>
              <ul class="">
                <router-link
                    active-class="active"
                    tag="li"
                    to="/clinic-applicants">
                  <a href="#">
                    <span>Applicants</span>
                  </a>
                </router-link>

                <router-link
                    active-class="active"
                    tag="li"
                    to="/clinic-approved">
                  <a href="#">
                    <span>Approved</span>
                  </a>
                </router-link>
              </ul>
            </li>
            <router-link
                active-class="active"
                tag="li"
                to="/doctors"
            >
              <a href="#">
                <i class="fa fa-user-md"></i>
                <span>Doctors</span>
              </a>
            </router-link>
            <router-link
                to="/clients"
                active-class="active"
                tag="li"
            >
              <a href="#"><i class="fa fa-user"></i> <span>Clients</span></a>
            </router-link>
            <router-link
                to="/translators"
                active-class="active"
                tag="li"
            >
              <a href="#"><i class="fa fa-language"></i> <span>Translators</span></a>
            </router-link>
            <li class="submenu">
              <a href="#"><i class="fa fa-envelope"></i> <span> Messages</span> <span
                  class="menu-arrow"></span></a>
              <ul style="display: none;">
                <router-link to="/messages-compose"
                             active-class="active"
                             tag="li"
                >
                  <a href="#">Compose</a>
                </router-link>
                <router-link to="/message/sent"
                             active-class="active"
                             tag="li"
                >
                  <a href="#">Sent</a>
                </router-link>
                <router-link to="/message/draft"
                             active-class="active"
                             tag="li"
                >
                  <a href="#">Draft</a>
                </router-link>
                <router-link to="/message/trash"
                             active-class="active"
                             tag="li"
                >
                  <a href="#">Trash</a>
                </router-link>
              </ul>
            </li>
            <router-link
                active-class="active"
                tag="li"
                to="/reviews"
            >
              <a href="#"><i class="fa fa-commenting"></i> <span>Reviews</span></a>
            </router-link>
            <router-link
                active-class="active"
                tag="li"
                to="/feedbacks"
            >
              <a href="#"><i class="fa fa-commenting"></i> <span>Feedbacks</span></a>
            </router-link>
            <router-link
                active-class="active"
                tag="li"
                to="/news"
            >
              <a href="#"><i class="fa fa-newspaper-o"></i> <span>News</span></a>
            </router-link>
            <router-link
                active-class="active"
                tag="li"
                to="/settings/notification">
              <a href="#"><i class="fa fa-cog"></i> <span>Settings</span></a>
            </router-link>
            <li class="submenu">
              <a href="#"><i class="fa fa-credit-card"></i> <span>Payments</span> <span
                  class="menu-arrow"></span></a>
              <ul style="display: none;">
                <router-link
                    active-class="active"
                    tag="li"
                    to="/payments">
                  <a href="#">Client Invoice</a>
                </router-link>
                <router-link
                    active-class="active"
                    tag="li"
                    to="/statements">
                  <a href="#">Clinic Statement</a>
                </router-link>
              </ul>
            </li>
            <router-link
                active-class="active"
                tag="li"
                to="/subscribers">
              <a href="#">
                <i class="fa fa-user"></i><span>Subscriber</span>
              </a>
            </router-link>
          </ul>
          <ul v-if="is_clinic_parts">
            <router-link
                active-class="active"
                tag="li"
                to="/clinic-approved"
            >
              <a href="#">
                <img src="../assets/clinic-home.svg"> <span class="title-15">Back to Clinics</span>
              </a>
            </router-link>
            <div class="view-title">
              <span class="title-18">Clinic Profile</span>
            </div>
            <b-progress max="100">
              <b-progress-bar value="20" label="20%"></b-progress-bar>
            </b-progress>
            <router-link
                :to="'/clinics/' + clinic_id"
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
                to="doctors"
            >
              <a href="#">
                <i class="fa fa-user-md"></i>
                <span class="title-15">Doctors</span>
              </a>
            </router-link>
            <router-link
                :to="'/clinics/' + clinic_id + '/services'"
                active-class="active"
                tag="li"
            >
              <a href="#">
                <i class="fa fa-comment" aria-hidden="true"></i>
                <span class="title-15">Services</span>
              </a>
            </router-link>
            <router-link
                :to="'/clinics/' + clinic_id + '/available'"
                active-class="active"
                tag="li"
            >
              <a href="#">
                <i class="fa fa-calendar-check-o" aria-hidden="true"></i>
                <span class="title-15">Availability</span>
              </a>
            </router-link>
            <router-link
                :to="'/clinics/' + clinic_id + '/photos'"
                active-class="active"
                tag="li"
            >
              <a href="#">
                <i class="fa fa-file-image-o" aria-hidden="true"></i><span class="title-15">Gallery</span>
              </a>
            </router-link>
          </ul>
          <ul v-if="is_settings">
            <router-link
                tag="li"
                to="/"
            >
              <a href="#">
                <i class="icon-dashboard-un"></i> <span>Dashboard</span>
              </a>
            </router-link>
            <div class="view-title">
              <span class="title-18">Settings</span>
            </div>
            <router-link
                active-class="active"
                tag="li"
                to="/settings/basic"
            >
              <a href="#">
                <i class="fa fa-globe" aria-hidden="true"></i> <span>Localization</span>
              </a>
            </router-link>
            <router-link
                active-class="active"
                tag="li"
                to="/settings/notification"
            >
              <a href="#">
                <i class="fa fa-bell" aria-hidden="true"></i> <span>Notifications</span>
              </a>
            </router-link>
            <router-link
                active-class="active"
                tag="li"
                to="/settings/password">
              <a href="#">
                <i class="fa fa-lock fa-2x" style="font-size: 22px;" aria-hidden="true"></i> <span>Change Password</span>
              </a>
            </router-link>
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
    name: "AdminLayout",
    data() {
      return {
        clinic_id: null,
        user: null,
        is_clinic_parts: false,
        is_settings: false
      }
    },
    watch: {
      '$route.name': function (name) {
        this.showClinicMenusByName(name)
      }
    },
    mounted() {
      let self = this

      if (!Utils.getLocalAdmin()) {
        return self.$router.push({path: '/login'})
      } else {
        self.user = Utils.getLocalAdmin();
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
              Utils.removeLocalAdmin()
              return self.$router.push({path: '/login'})
            }
          }
        })
      },
      showClinicMenusByName(name) {
        let self = this
        self.is_clinic_parts = ['ClinicDetail', 'ClinicEdit', 'ClinicServicesEdit', 'ClinicServicesDetail', 'ClinicAvailableDetail', 'ClinicGallery', 'DoctorsEdit'].includes(name) ? true : false
        if (self.is_clinic_parts) {
          self.clinic_id = self.$route.params.id
        }

        self.is_settings = ['SettingBasic', 'AdminSettingNotification', 'SettingPassword'].includes(name) ? true : false
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
