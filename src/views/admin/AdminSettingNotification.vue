<template>
  <div class="container pt-5">
    <div class="row">
      <div class="col-sm-2"></div>
      <div class="col-sm-8">
        <h2 class="title-22 pb-4" style="color: #020644">Notification Settings</h2>

        <ul class="list-group notification-list">
          <li class="list-group-item notification-title">
            Appointments
            <div class="material-switch float-right">
              <input
                  @change="onChangeNotification"
                  id="sw_appointments"
                  type="checkbox"
                  v-model="appointments">
              <label class="badge-primary" for="sw_appointments"></label>
            </div>
          </li>
          <li class="list-group-item justify-content-between notification-title">
            Chat
            <div class="material-switch float-right">
              <input
                  @change="onChangeNotification"
                  id="sw_chat"
                  type="checkbox"
                  v-model="chat">
              <label class="badge-primary" for="sw_chat"></label>
            </div>
          </li>
          <li class="list-group-item justify-content-between notification-title">
            Call
            <div class="material-switch float-right">
              <input
                  @change="onChangeNotification"
                  id="sw_call"
                  type="checkbox"
                  v-model="call">
              <label class="badge-primary" for="sw_call"></label>
            </div>
          </li>

          <li class="list-group-item justify-content-between notification-title" v-if="appHelper.isAdmin()">
            Review
            <div class="material-switch float-right">
              <input
                  @change="onChangeNotification"
                  id="sw_review"
                  type="checkbox"
                  v-model="review">
              <label class="badge-primary" for="sw_review"></label>
            </div>
          </li>

          <li class="list-group-item justify-content-between notification-title" v-if="appHelper.isAdmin()">
            Clinic Applicants
            <div class="material-switch float-right">
              <input
                  @change="onChangeNotification"
                  id="sw_clinic_applicants"
                  type="checkbox"
                  v-model="clinic_applicants">
              <label class="badge-primary" for="sw_clinic_applicants"></label>
            </div>
          </li>
        </ul>
      </div>
      <div class="col-sm-2"></div>
    </div>
  </div>
</template>

<script>
  import {appHelper} from "../../utils/appHelper";
  import rf from "../../api/RequestFactory";

  export default {
    name: "Setting",
    data() {
      return {
        appHelper,
        appointments: false,
        message: false,
        chat: false,
        call: false,
        review: false,
        clinic_applicants: false
      }
    },
    methods: {
      onChangeNotification() {
        let self = this
        let params = {
          appointments: self.appoinments,
          message: self.message,
          chat: self.chat,
          call: self.call
        }

        return rf.getRequest('CommonRequest').updateSettingNotifications(params).then((res) => {
        });
      }
    },
    mounted() {
      let self = this

      rf.getRequest('CommonRequest').getSettingNotification().then((res) => {
        if (res.data) {
          const {appointments, message, chat, call} = res.data
          self.appointments = appointments
          self.message = message
          self.chat = chat
          self.call = call
        }
      });
    }
  }
</script>

<style scoped>

</style>
