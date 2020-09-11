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
              <h2 class="time-title title-15 pb-2">
                Name
              </h2>
              <div class="text-desc desc-11">{{ appt.client.name }}</div>
            </td>
            <td>
              <h2 class="time-title title-15">
                Location
              </h2>
              <div class="text-desc desc-11">{{ appt.client.address.country }}</div>
            </td>
            <td>
              <h2 class="time-title title-15">
                Treatment
              </h2>
              <div class="text-desc desc-11">{{ appt.treatment.type }}</div>
            </td>
            <td>
              <h2 class="time-title title-15">
                Appt. Date
              </h2>
              <div class="text-desc desc-11">{{ appt.created |convertTimeSecondToDate }}</div>
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
  import Const from '../utils/const'

  export default {
    props: ['title', 'to', 'appts'],
    data() {
      return {
        Const
      }
    }
  }
</script>
