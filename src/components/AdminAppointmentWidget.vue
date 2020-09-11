<template>
  <div class="card">
    <div class="card-header">
      <h4 class="title-20 card-title card-title-homepage d-inline-block">{{ title }}</h4>
      <router-link class="btn btn-dark btn-small float-right" :to="to">View all</router-link>
    </div>
    <div class="card-body p-0">
      <div class="table-responsive table--appointment">
        <table class="table mb-0 b-0">
          <tbody>
          <tr v-bind:key="appt.id" v-for="appt in appts">
            <td>
              <div style="width: 70px;height:40px;background-color: #c4c4c4;float:left;margin-right:20px"></div>
              <h2 class="time-title title-15 pb-2">
                Client
              </h2>
              <div class="text-desc desc-11">{{ appt.client ? appt.client.name : '' }}</div>
            </td>
            <td>
              <h2 class="time-title title-15">
                Clinic
              </h2>
              <div class="text-desc desc-11">{{ appt.clinic ? appt.clinic.name : '' }}</div>
            </td>
            <td>
              <h2 class="time-title title-15">
                Treatment
              </h2>
              <div class="text-desc desc-11">{{ appt_treatments[appt.treatment_id] }}</div>
            </td>
            <td>
              <h2 class="time-title title-15">
                Appt. Date
              </h2>
              <div class="text-desc desc-11">{{appt.date|convertTimeSecondToDate}}</div>
            </td>
            <td>
              <h2 class="time-title title-15">
                Appt. Time
              </h2>
              <div class="text-desc desc-11">{{appt.date|convertDateToTime}}</div>
            </td>
            <td class="text-center">
              <p :class="Const.STATUS.intToStatusClass(appt.status)" class="alert appt--status">
                {{Const.STATUS.intToString( appt.status )}}
              </p>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Const from "./../utils/const"

  export default {
    props: {
      to: {
        type: String
      },
      title: {
        type: String
      },
      appts: {
        type: Array
      },
    },
    computed: {
      ...mapGetters(['appt_treatments'])
    },
    data() {
      return {
        Const: Const,
      }
    },
  }
</script>

<style>

  .table--appointment td {
    border-bottom: 0.5px solid #dee2e6;
  }

  .table--appointment tr:last-child td {
    border-bottom: 0px !important;
  }
</style>
