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
        <div class="card" v-if="Const.STATUS.isRescheduled(appt.status)">
          <div class="card-body">
            <div class="text-center mb-4 mt-4 title-15 text-danger">New available appointment times provided
              by clinic. Please select one before time expires.
            </div>
            <AppointmentScheduleTime @onChangeSchedule="onChangeSchedule" :appt="appt"></AppointmentScheduleTime>
          </div>
        </div>

        <div class="card" v-if="appt">
          <AppointmentDetailTable :appt="appt" :isClient="true" @onRefresh="onRefresh"></AppointmentDetailTable>

          <div v-if="Const.STATUS.isPending(appt.status) || Const.STATUS.isRescheduled(appt.status)">
            <div class="text-center mt-3 pb-20">
              <input class="mr-2" id="chk__policy" type="checkbox" v-model="policy"><label
                for="chk__policy">I agree to the Cancellation Policy</label>
            </div>
          </div>
          <div v-if="Const.STATUS.isPending(appt.status)">
            <div class="text-center mb-5">
              <button :disabled="! policy" @click="onCancellAppointment()"
                      class="btn btn-lg btn-rounded btn-primary btn-pink">Cancel Appointment
              </button>
            </div>
          </div>
          <div class="text-center mb-5" v-if="Const.STATUS.isConfirmed(appt.status)">
            <button :disabled="! policy" @click="onCancellAppointmentConfirmed()"
                    class="btn btn-lg btn-rounded btn-light">Cancel Appointment
            </button>
          </div>
          <div class="text-center mb-5" v-if="Const.STATUS.isRescheduled(appt.status)">
            <button :disabled="! schedule_selected" @click="onAcceptAppointment()"
                    class="btn btn-lg btn-rounded btn-success mr-5 pl-5 pr-5">Accept
            </button>
            <button :disabled="! policy" @click="onCancellAppointmentSchedule()"
                    class="btn btn-lg btn-rounded btn-light">Cancel Appointment
            </button>
          </div>
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
        policy: false,
        schedule_selected: false,
        id: null
      }
    },
    mounted() {
      let self = this
      self.id = parseInt(this.$route.params.id)

      self.onRefresh()
    },
    methods: {
      onChangeSchedule(id) {
        this.schedule_selected = id
      },
      onRefresh() {
        let self = this
        rf.getRequest('UserRequest').getAppointmentDetail(self.id).then((res) => {
          self.appt = res.data
        })
      },
      onCancellAppointment() {
        let self = this

        if (!self.policy) {
          return
        }

        let params = {
          status: Const.STATUS.stringToInt('cancelled')
        }

        rf.getRequest('UserRequest').postAppointmentStatus(self.appt.id, params).then((res) => {
          self.appt = res.data

          if (self.appt.status == Const.STATUS.stringToInt('cancelled')) {
            self.onRefresh()
          }
        })
      },
      onCancellAppointmentSchedule() {
        let self = this

        if (!self.policy) {
          return
        }

        return self.$router.push({path: '/appointments/' + self.appt.id + '/cancel'})
      },
      onCancellAppointmentConfirmed() {
        let self = this

        if (!self.policy) {
          return
        }

        rf.getRequest('UserRequest').postCheckCancelable(self.appt.id).then((res) => {
          if (res.data) {
            return self.$router.push({path: '/appointments/' + self.appt.id + '/cancel'})
          }
        })
      },
      onAcceptAppointment() {
        let self = this

        if (!self.schedule_selected) {
          return
        }

        let params = {
          status: Const.STATUS.stringToInt('confirmed'),
          schedule_item_id: self.schedule_selected
        }

        rf.getRequest('UserRequest').postAppointmentStatus(self.appt.id, params).then((res) => {
          self.appt = res.data

          if (self.appt.status == Const.STATUS.stringToInt('confirmed')) {
            self.onRefresh()
          }
        })
      }
    }
  }
</script>
