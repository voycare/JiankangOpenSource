<template>
  <div class="card">
    <div class="card-header">
      <h4 class="title-20 card-title card-title-homepage d-inline-block">{{ title }}</h4>
      <router-link class="btn btn-dark btn-small float-right" to="/appointments">View all</router-link>
    </div>
    <div class="card-body p-0">
      <div class="table-responsive table--appointment">
        <table class="table mb-0 b-0">
          <thead class="d-none">
          <tr>
            <th>Appointment with</th>
            <th>Treatment</th>
            <th>Appt. Date</th>
            <th>Appt. Time</th>
            <th>Status</th>
            <th v-if="disableView">Actions</th>
          </tr>
          </thead>
          <tbody>
          <tr v-bind:key="appt.id" v-for="appt in appts">
            <td>
              <div style="width: 70px;height:40px;background-color: #c4c4c4;float:left;margin-right:20px"></div>
              <h2 class="time-title title-15 pb-2">
                Appointment with
              </h2>
              <div class="text-desc desc-11">{{ appt.doctor.first_name }}&nbsp;{{ appt.doctor.last_name
                }}
              </div>
            </td>
            <td>
              <h2 class="time-title title-15">
                Treatment
                <span>{{ appt.clinic.name }}</span>
              </h2>
            </td>
            <td>
              <h2 class="time-title title-15">
                Appt. Date
                <span>{{appt.date|convertTimeSecondToDate}}</span>
              </h2>
            </td>
            <td>
              <h2 class="time-title title-15">
                Appt. Time
                <span>{{appt.date|convertDateToTime}}</span>
              </h2>
            </td>
            <td class="text-center">
              <p :class="Const.STATUS.intToStatusClass(appt.status)" class="alert appt--status">
                {{Const.STATUS.intToString( appt.status )}}
              </p>
            </td>
            <td class="text-center" v-if="! disableView">
              <router-link :to="'appointment/' + appt.id" class="btn btn-round btn-primary"
                           v-if="appt.status !== 1">View
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
    props: {
      title: {
        type: String
      },
      appts: {
        type: Array
      },
      disableView: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        Const: Const,
      }
    }
  }
</script>
