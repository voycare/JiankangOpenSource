<template>
  <div class="main-wrapper">
    <div class="header">
      <div class="header-left">
        <a class="logo" href="/">
          <img alt="" height="35" src="assets/img/title.png" width="35"> <span>Voycare</span>
        </a>
      </div>
      <a href="javascript:void(0);" id="toggle_btn"><i class="fa fa-bars"></i></a>
      <a class="mobile_btn float-left" href="#sidebar" id="mobile_btn"><i class="fa fa-bars"></i></a>
      <ul class="nav user-menu float-right m-t-10">
        <li class="nav-item dropdown">
          <a class="dropdown-toggle nav-link" data-toggle="dropdown" href="#"><i class="fa fa-bell-o"></i>
            <span
                class="badge badge-pill bg-danger float-right">3</span></a>
          <div class="dropdown-menu notifications">
            <div class="topnav-dropdown-header">
              <span>Notifications</span>
            </div>
            <div class="drop-scroll">
              <ul class="notification-list">
                <li class="notification-message">
                  <a href="activities.html">
                    <div class="media">
											<span class="avatar">
												<img alt="John Doe" class="img-fluid rounded-circle"
                             src="assets/img/user.jpg">
											</span>
                      <div class="media-body">
                        <p class="noti-details"><span class="noti-title">John Doe</span> added
                          new task <span
                              class="noti-title">Patient appointment booking</span></p>
                        <p class="noti-time"><span class="notification-time">4 mins ago</span>
                        </p>
                      </div>
                    </div>
                  </a>
                </li>
                <li class="notification-message">
                  <a href="activities.html">
                    <div class="media">
                      <span class="avatar">V</span>
                      <div class="media-body">
                        <p class="noti-details"><span class="noti-title">Tarah Shropshire</span>
                          changed the task name
                          <span class="noti-title">Appointment booking with payment gateway</span>
                        </p>
                        <p class="noti-time"><span class="notification-time">6 mins ago</span>
                        </p>
                      </div>
                    </div>
                  </a>
                </li>
                <li class="notification-message">
                  <a href="activities.html">
                    <div class="media">
                      <span class="avatar">L</span>
                      <div class="media-body">
                        <p class="noti-details"><span class="noti-title">Misty Tison</span>
                          added <span
                              class="noti-title">Domenic Houston</span> and <span
                              class="noti-title">Claire Mapes</span> to project <span
                              class="noti-title">Doctor available module</span>
                        </p>
                        <p class="noti-time"><span class="notification-time">8 mins ago</span>
                        </p>
                      </div>
                    </div>
                  </a>
                </li>
                <li class="notification-message">
                  <a href="activities.html">
                    <div class="media">
                      <span class="avatar">G</span>
                      <div class="media-body">
                        <p class="noti-details"><span class="noti-title">Rolland Webber</span>
                          completed task <span
                              class="noti-title">Patient and Doctor video conferencing</span>
                        </p>
                        <p class="noti-time"><span class="notification-time">12 mins ago</span>
                        </p>
                      </div>
                    </div>
                  </a>
                </li>
                <li class="notification-message">
                  <a href="activities.html">
                    <div class="media">
                      <span class="avatar">V</span>
                      <div class="media-body">
                        <p class="noti-details"><span class="noti-title">Bernardo Galaviz</span>
                          added new task <span
                              class="noti-title">Private chat module</span></p>
                        <p class="noti-time"><span class="notification-time">2 days ago</span>
                        </p>
                      </div>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
            <div class="topnav-dropdown-footer">
              <a href="activities.html">View all Notifications</a>
            </div>
          </div>
        </li>
        <li class="nav-item dropdown">
          <a class="hasnotifications nav-link" href="javascript:void(0);" id="open_msg_box"><i
              class="fa fa-comment-o"></i> <span
              class="badge badge-pill bg-danger float-right">8</span></a>
        </li>
        <li class="nav-item dropdown has-arrow">
          <a class="dropdown-toggle nav-link user-link" data-toggle="dropdown" href="#">
                        <span class="user-img"><img alt="Admin" class="rounded-circle" src="assets/img/user.jpg"
                                                    width="40">
							<span class="status online"></span></span>
            <span>{{user.first_name}}</span>
          </a>
          <div class="dropdown-menu">
            <a @click="logout" class="dropdown-item">Logout</a>
          </div>
        </li>
      </ul>
      <div class="dropdown mobile-user-menu float-right">
        <a aria-expanded="false" class="nav-link dropdown-toggle" data-toggle="dropdown" href="#"><i
            class="fa fa-ellipsis-v"></i></a>
        <div class="dropdown-menu dropdown-menu-right">
          <a class="dropdown-item" href="profile.html">My Profile</a>
          <a class="dropdown-item" href="edit-profile.html">Edit Profile</a>
          <a class="dropdown-item" href="settings.html">Settings</a>
          <a @click="logout" class="dropdown-item">Logout</a>
        </div>
      </div>
    </div>
    <div class="sidebar" id="sidebar">
      <div class="sidebar-inner slimscroll">
        <div class="sidebar-menu" id="sidebar-menu">
          <ul>
            <li class="menu-title">Main</li>
            <li :class="{active:$route.name === 'Index'}">
              <a href="/"><i class="fa fa-dashboard"></i> <span>Dashboard</span></a>
            </li>

            <li :class="{active:$route.name === 'Appointment'}">
              <a href="/appointments"><i class="fa fa-calendar"></i> <span>Appointments</span></a>
            </li>

            <li :class="{active:$route.name === 'Chat'}">
              <a href="/chat"><i class="fa fa-comments"></i> <span>Chat</span> <span
                  class="badge badge-pill bg-primary float-right">5</span></a>
            </li>
            <li class="submenu">
              <a href="#"><i class="fa fa-video-camera camera"></i> <span> Calls</span> <span
                  class="menu-arrow"></span></a>
              <ul style="display: none;">
                <li :class="{active:$route.name === 'Voice Call'}"><a href="/voice-call">Voice Call</a>
                </li>
                <li><a href="video-call.html">Video Call</a></li>
                <li><a href="incoming-call.html">Incoming Call</a></li>
              </ul>
            </li>
            <li class="submenu">
              <a href="#"><i class="fa fa-envelope"></i> <span> Messages</span> <span
                  class="menu-arrow"></span></a>
              <ul style="display: none;">
                <li><a href="compose.html">Compose Mail</a></li>
                <li><a href="inbox.html">Inbox</a></li>
                <li><a href="mail-view.html">Mail View</a></li>
              </ul>
            </li>
            <li :class="{active:$route.name === 'Payment'}">
              <a href="/payment"><i class="fa fa-book"></i> <span> Payment </span> </a>
            </li>
            <li :class="{active:$route.name === 'Review'}">
              <a href="/reviews"><i class="fa fa-comments"></i> <span>Reviews</span> <span
                  class="badge badge-pill bg-primary float-right">5</span></a>
            </li>
            <li :class="{active:$route.name === 'My Profile'}">
              <a href="/profile"><i class="fa fa-user"></i> <span> My Profile </span></a>
            </li>
            <li :class="{active:$route.name === 'Setting'}">
              <a href="/settings/notification"><i class="fa fa-cog"></i> <span>Settings</span></a>
            </li>
            <li>
              <a href="/"><img height="20px" src="assets/img/title.png"
                                                 width="20px"><span>Voycare Website</span></a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="page-wrapper">
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
  import util from "../utils/utils";
  import rf from "../api/RequestFactory";

  export default {
    name: "BasePage",
    data() {
      return {
        user: util.getLocalUser()
      }
    },
    mounted() {
      this.$store.dispatch('getCountries');
      if (!util.getLocalUser()) {
        // window.location.href = "/login";
      }
    },
    methods: {
    }
  }
</script>

<style scoped>

</style>
