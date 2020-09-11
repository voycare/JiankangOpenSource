<template>
  <div class="row list-content">
    <div class="col-md-12">
      <div class="table-responsive">
        <table class="table table-striped custom-table table--appt">
          <thead>
          <tr>
            <th>No.</th>
            <th @click="orderCreated" class="date"><span class="title-date">Order Date</span><img
                class="img-down"
                src="/assets/img/icon_down.png"><img
                src="/assets/img/icon_up.png"></th>
            <th>Clinic</th>
            <th>Appt.Date</th>
            <th>Appt.Time</th>
            <th>Type</th>
            <th>Notes</th>
            <th>Docs</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
          <tr :key="appt.id" v-for="appt in appts">
            <td>
              <span class="text-blue desc-12">{{ appt.id | convertAppointmentID }}</span>
            </td>
            <td>{{ appt.created|convertTimeSecondToDate }}</td>
            <td>{{ appt.clinic.name }}</td>
            <td>{{ appt.date|convertTimeSecondToDate }}</td>
            <td>{{ appt.date|convertDateToTime }}</td>
            <td>
              <span v-if="appt.type_id == 1">Online</span>
              <span v-if="appt.type_id == 2">Site Visit</span>
            </td>
            <td>
              <span v-if="appt.note">Y</span>
              <span v-else>N</span>
            </td>
            <td>
              <span v-if="appt.documents_count">Y</span>
              <span v-else>N</span>
            </td>
            <td>
              <p :class="Const.STATUS.intToStatusClass(appt.status)" class="alert appt--status">
                {{Const.STATUS.intToString( appt.status )}}
              </p>
            </td>
            <td>
              <router-link :to="'appointments/' + appt.id"
                           class="btn btn-round btn-small btn-white">View
              </router-link>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import Const from "./../utils/const"

  export default {
    props: ['appts'],
    data() {
      return {
        Const
      }
    },
    methods: {
      orderCreated() {
        let self = this

        self.$emit('orderCreated')
      }
    }
  }
</script>
