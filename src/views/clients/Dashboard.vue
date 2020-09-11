<template>
  <div>
    <div class="row">
      <div class="col-12 col-md-6 col-lg-8 col-xl-8">
        <appointment-widget :appts="accept_appts" :disableView="true"
                            :title="'Appointment'"></appointment-widget>
        <appointment-widget :appts="pending_appts" :disableView="true"
                            :title="'My Site Visits'"></appointment-widget>
      </div>
      <div class="col-12 col-md-6 col-lg-4 col-xl-4">
        <top-widget :clinics="top_clinics" :title="'Top Providers'"></top-widget>
        <top-widget :clinic="top_favourites" :title="'My Favourites'"></top-widget>
      </div>
    </div>
  </div>

</template>

<script>
  import UTILS from "./../../utils/utils"
  import rf from "./../../api/RequestFactory"
  import AppointmentWidget from './../../components/AppointmentWidget'
  import TopWidget from './../../components/TopWidget'

  export default {
    name: "ClientDashboard",
    components: {
      AppointmentWidget,
      TopWidget
    },
    data() {
      return {
        accept_appts: [],
        accept_appts_total: 0,
        pending_appts: [],
        pending_appts_total: 0,
        top_clinics: [],
        top_favourites: [],
      }
    },
    mounted() {
      let self = this

      // Check login.
      if (!UTILS.getLocalUser()) {
        return self.$router.push({path: '/login'})
      }

      // Init.
      window.initApp();

      // Init.
      self.getAcceptAppts()
      self.getPendingAppts()
      self.getTopClinics()
      self.getMyFavourites()
    },
    methods: {
      getAcceptAppts() {
        let self = this
        let params = {limit: 5}
        params.status_in = '1,4'

        rf.getRequest('UserRequest').getAppointments(params).then((res) => {
          self.accept_appts = res.data.datas
          self.accept_appts_total = res.data.total_page
        });
      },
      getPendingAppts() {
        let self = this
        let params = {limit: 5}
        params.status_in = '0,2'

        rf.getRequest('UserRequest').getAppointments(params).then((res) => {
          self.pending_appts = res.data.datas
          self.pending_appts_total = res.data.total_page
        });
      },
      getTopClinics() {
        let self = this
        let params = {limit: 5}

        rf.getRequest('UserRequest').getTopClinics(params).then((res) => {
          self.top_clinics = res.data.datas
        })
      },
      getMyFavourites() {
        let self = this
        let params = {limit: 5}

        rf.getRequest('UserRequest').getMyFavourites(params).then((res) => {
          self.top_favourites = res.data.datas
        })
      }
    }
  }
</script>

<style scoped>

</style>
