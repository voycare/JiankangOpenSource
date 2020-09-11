<template>
  <div class="row list-content">
    <div class="table-responsive">
      <table class="table table-striped custom-table table--appt">
        <thead>
        <tr>
          <th>No.</th>
          <th>Client</th>
          <th>Country</th>
          <th v-if="! hideClinic">Clinic</th>
          <th>
            <div style="min-width: 90px;">Transaction Date</div>
          </th>
          <th>Treatment</th>
          <th>Rating</th>
          <th class="text-center">Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="review in reviews" :key="review.id">
          <td>{{ review.appointment_id | convertAppointmentID}}
          </td>
          <td>{{ review.client ? review.client.name : '' }}</td>
          <td>{{ (review.client && review.client.address) ? review.client.address.country : '' }}</td>
          <td v-if="! hideClinic">{{ review.clinic ? review.clinic.name : '' }}</td>
          <td>{{ review.appointment.date | convertTimeSecondToDate }}</td>
          <td>{{ appt_treatments[review.appointment.treatment_id] }}</td>
          <td>{{ review.star }}</td>
          <td style="position:relative" class="button-table-review">
            <div style="min-width: 120px;">
              <router-link class="" :to="'/reviews/' + review.id">
              <button class="btn btn-light btn-rounded border-secondary mr-2">
                <span>View</span>
              </button>
            </router-link>
            <button v-if="! hideApprove" class="btn btn-success btn-rounded mr-2" @click="onApprove(review.id)">
              Approve
            </button>
            <button v-if="! hideDecline" class="btn btn-danger btn-rounded" @click="onDecline(review.id)">Decline
            </button>
          </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    props: {
      hideClinic: {
        type: Boolean,
        default: false
      },
      hideApprove: {
        type: Boolean,
        default: false
      },
      hideDecline: {
        type: Boolean,
        default: false
      },
      reviews: {
        type: Array,
        default: () => []
      }
    },
    computed: {
      ...mapGetters(['appt_treatments'])
    },
    methods: {
      onApprove(id) {
        let self = this

        self.$emit('onApprove', id)
      },
      onDecline(id) {
        let self = this

        self.$emit('onDecline', id)
      }
    },
    mounted() {
      let self = this

      self.$store.dispatch('getAppointmentMetas')
    },
  }
</script>
