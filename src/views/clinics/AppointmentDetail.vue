<template>
  <div>
    <div class="row">
      <div class="col-sm-12">
        <router-link to="/appointments"><h4 class="page-title"><i class="fa fa-arrow-left mr-3"></i>Back to
          Appointments</h4></router-link>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-9">
        <div class="card" v-if="appt && appt.schedule_times.length">
          <div class="card-body">
            <div class="text-center mb-4 mt-4 title-15 text-danger">The following appointment times have been sent to
              patient. Please wait for confirmation.
            </div>
            <AppointmentScheduleTime :appt="appt" :hideRadio="true"></AppointmentScheduleTime>
          </div>
        </div>

        <div class="card" v-if="appt">
          <AppointmentDetailTable :appt="appt" :isClinic="true" @onRefresh="onRefresh"></AppointmentDetailTable>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-9">
        <div class="row">
          <div class="col-lg-6">
            <div v-if="appt" class="text-center">
              <button v-if="appt.status == Const.STATUS.stringToInt('pending')" class="btn btn-success"
                      @click="onAcceptAppointment">Accept
              </button>
            </div>
          </div>
          <div class="col-lg-6">
            <div v-if="appt" class="text-center">
              <router-link v-if="appt.status == Const.STATUS.stringToInt('pending')" class="btn btn-dark btn-round"
                           :to="'/appointments/' + id + '/reschedule'">Reschedule
              </router-link>
            </div>
          </div>
        </div>

        <div class="text-center">
          <router-link v-if="appt && appt.status == Const.STATUS.stringToInt('confirmed')" class="btn btn-dark btn-round"
                       :to="'/appointments/' + id + '/reschedule'">Reschedule
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import rf from "../../api/RequestFactory";
  import Const from "./../../utils/const"
  import AppointmentDetailTable from './../../components/AppointmentDetailTable'
  import AppointmentScheduleTime from './../../components/AppointmentScheduleTime'

  export default {
    components: {
      AppointmentDetailTable,
      AppointmentScheduleTime
    },
    data() {
      return {
        Const,
        appt: null,
        id: null
      }
    },
    mounted() {
      let self = this
      self.id = parseInt(this.$route.params.id)

      self.onRefresh()
    },
    methods: {
      onRefresh() {
        let self = this

        rf.getRequest('ClinicRequest').getAppointmentDetail(self.id).then((res) => {
          self.appt = res.data
        });
      },
      onAcceptAppointment() {
        let self = this

        let params = {
          status: Const.STATUS.stringToInt('confirmed'),
        }

        rf.getRequest('ClinicRequest').postAppointmentStatus(self.appt.id, params).then((res) => {
          self.appt = res.data

          if (self.appt.status == Const.STATUS.stringToInt('confirmed')) {
            self.onRefresh()
          }
        })
      }
    }
  }
</script>
<style>
</style>
