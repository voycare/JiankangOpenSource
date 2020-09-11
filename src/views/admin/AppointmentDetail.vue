<template>
  <div>
    <div class="row">
      <div class="col-sm-12 mb-4">
        <BackTo :to="'/appointments'" :text="'Back to Appointments'" />
      </div>
    </div>
    <div class="row">
      <div class="col-lg-9">
        <div class="card" v-if="appt">
          <AppointmentDetailTable :appt="appt" :isAdmin="true" @onRefresh="onRefresh" @onGetDocuments="onGetDocuments"></AppointmentDetailTable>
        </div>
      </div>
      <div class="col-sm-3">
        <div class="app--div " style="display: flex ">
          <p class="title-15" style="color: #FFFFFF ; margin: auto;">Extra Docs: </p>
          <p class="title-15 appt--p m-l-20" style="margin: auto;">
            <span v-if="documents.length">Completed</span>
            <span v-else>Incompleted</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import rf from "../../api/RequestFactory";
  import Const from "./../../utils/const"
  import AppointmentDetailTable from './../../components/AppointmentDetailTable'
  import BackTo from '../../components/BackTo'

  export default {
    components: {
      AppointmentDetailTable, BackTo
    },
    data() {
      return {
        Const,
        appt: null,
        policy: false,
        schedule_selected: false,
        id: null,
        documents: []
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

        rf.getRequest('AdminRequest').getAppointmentDetail(self.id).then((res) => {
          self.appt = res.data
        });
      },
      onGetDocuments(documents) {
        let self = this
        self.documents = documents
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
<style>
  .page-wrapper > .content {
    padding-top: 5px;
  }
  .card--detail {
    width: 751px;
    margin: 0 auto;
  }
  .width-card {
    width: 751px;
    margin-top: 30px !important;
  }
  .page-title {
    color: #020644;
    font-size: 18px;
  }
  .appt--detail td {
    padding-left: 15px;
    padding-right: 15px;
  }
</style>
