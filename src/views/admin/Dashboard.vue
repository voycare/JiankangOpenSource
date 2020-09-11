<template>
  <div >
    <div class="row">
      <div class="col-md-6 col-sm-6 col-lg-6 col-xl-3">
        <div class="dash-widget">
          <span class="dash-widget-bg1"><i aria-hidden="true" class="fa fa-stethoscope"></i></span>
          <div class="dash-widget-info text-right">
            <h3>{{ totals.clinics }}</h3>
            <span class="widget-title1">Clinics <i aria-hidden="true"
                                                   class="fa fa-check"></i></span>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-sm-6 col-lg-6 col-xl-3">
        <div class="dash-widget">
          <span class="dash-widget-bg2"><i class="fa fa-user-o"></i></span>
          <div class="dash-widget-info text-right">
            <h3>{{ totals.clients }}</h3>
            <span class="widget-title2">Clients <i aria-hidden="true"
                                                   class="fa fa-check"></i></span>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-sm-6 col-lg-6 col-xl-3">
        <div class="dash-widget">
          <span class="dash-widget-bg3"><i aria-hidden="true" class="fa fa-user-md"></i></span>
          <div class="dash-widget-info text-right">
            <h3>{{ totals.doctors }}</h3>
            <span class="widget-title3">Doctors <i aria-hidden="true" class="fa fa-check"></i></span>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-sm-6 col-lg-6 col-xl-3">
        <div class="dash-widget">
          <span class="dash-widget-bg4"><i aria-hidden="true" class="fa fa-heartbeat"></i></span>
          <div class="dash-widget-info text-right">
            <h3>{{ totals.revenues }}</h3>
            <span class="widget-title4">Revenues <i aria-hidden="true"
                                                    class="fa fa-check"></i></span>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-8 ">
        <AdminAppointmentWidget to="/appointment-24h" :appts="appts_24h" title="24 - Hour"></AdminAppointmentWidget>

        <AdminAppointmentWidget to="/appointment-7d" :appts="appts_7d" title="7 - Day"></AdminAppointmentWidget>

        <div class="card">
          <div class="card-header">
            <h4 class="title-20 card-title card-title-homepage d-inline-block">Cancellation Requests</h4>
            <router-link class="btn btn-dark btn-small float-right" to="/appointment-cr">View all</router-link>
          </div>
          <div class="card-body p-0">
            <div class="table-responsive table--appointment">
              <table class="table mb-0 b-0">
                <tbody>
                <tr v-bind:key="appt.id" v-for="appt in appts_cr">
                  <td>
                    <h2 class="time-title title-15 pb-2">
                      Client
                    </h2>
                    <div class="text-desc desc-11">{{ appt.appointment.client.name }}</div>
                  </td>
                  <td>
                    <h2 class="time-title title-15">
                      Clinic
                    </h2>
                    <div class="text-desc desc-11">{{ appt.appointment.clinic.name }}</div>
                  </td>
                  <td>
                    <h2 class="time-title title-15">
                      Cancellation Date
                    </h2>
                    <div class="text-desc desc-11">{{ appt.created |convertTimeSecondToDate }}</div>
                  </td>
                  <td class="text-center">
                    <p class="alert appt--status alert-process" v-if="appt.appointment.status == 2 && appt.status == 1">
                      Processing</p>
                    <p class="alert appt--status alert-refunded"
                       v-if="appt.appointment.status == 2 && appt.status == 2">
                      Refunded</p>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <AdminAppointmentWidget to="/appointments?type_ids=1" :appts="appts_ct"
                                title="New Consulations"></AdminAppointmentWidget>

        <AdminAppointmentWidget to="/appointments?type_ids=2" :appts="appts_sv"
                                title="New Site Visit Requests"></AdminAppointmentWidget>

        <div class="card">
          <div class="card-header">
            <h4 class="title-20 card-title card-title-homepage d-inline-block">New Clients</h4>
            <router-link class="btn btn-dark btn-small float-right" to="/clients">View all</router-link>
          </div>
          <div class="card-body p-0">
            <div class="table-responsive table--appointment">
              <table class="table mb-0 b-0">
                <tbody>
                <tr v-bind:key="client.id" v-for="client in clients">
                  <td>
                    <h2 class="time-title title-15 pb-2">{{ client.email }}</h2>
                  </td>
                  <td>
                    <h2 class="time-title title-15 pb-2">{{ client.created | convertTimeSecondToDateTime }}</h2>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div id="dashboard-right" class="col-4 col-lg-4 col-xl-4">

        <AdminWigetAppointmentType :header="'Consultations'" :total="total_csl"
                                   @search="onSearchCSL"/>

        <AdminWigetAppointmentType :header="'Site Visits'" :total="total_sv"
                                   @search="onSearchSV"/>

        <AdminWigetAppointmentType :header="'Revenues'" :total="total_rv"
                                   @search="onSearchRevenue"/>

        <div class="card">
          <div class="p-3">
            <div class="d-flex justify-content-between mb-4">
              <span class="title-20">Top Clinics</span>
              <select @change="onTopClinics" v-model="top_clinic_filter.type" class="form-control form-control-sm" style="width: 150px;">
                <option value="1">Ratings</option>
                <option value="2">Revenures</option>
              </select>
            </div>
            <div v-for="(clinic) in top_clinics" :key="clinic.id">
              <div class="d-flex justify-content-between my-2 align-items-center"
                   style="border-bottom: 0.2px solid #979797;">
                <div class="row mx-0">
                  <div class="mr-1 mb-2" style="width: 72px; height: 40px; background: #C4C4C4;">
                  </div>
                  <div>
                    <span class="title-15 d-block">{{ clinic.name }}</span>
                    <span class="desc-11" style="color: #898989;">{{ clinic.address.full_address }}</span>
                  </div>
                </div>
                <div>
                  <span class="font-weight-500">${{ clinic.total }}</span>
                </div>
              </div>
            </div>
            <div class="text-center">
              <router-link to="/clinics" class="btn btn-text" style="color: #898989;">
                View all Clinics
              </router-link>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import rf from "../../api/RequestFactory"
  import AdminAppointmentWidget from '../../components/AdminAppointmentWidget'
  import DatePicker from 'vue2-datepicker'
  import {mapGetters} from "vuex"
  import AdminWigetAppointmentType from '../../components/AdminWigetAppointmentType'

  export default {
    name: "AdminDashboard",
    components: {
      AdminAppointmentWidget, DatePicker, AdminWigetAppointmentType
    },
    data() {
      return {
        totals: {
          clients: 0,
          doctors: 0,
          clinics: 0,
          revenues: 0
        },
        appts_24h: [],
        appts_7d: [],
        appts_cr: [],
        appts_ct: [],
        appts_sv: [],
        clients: [],
        search_rv: {
          from: null,
          to: null
        },
        total_csl: 0,
        total_sv: 0,
        total_rv: 0,
        top_clinic_filter: {
          type: 1,
          limit: 5
        },
        top_clinics: []
      }
    },
    computed: {},
    mounted() {
      let self = this

      self.$store.dispatch('getCountries')
      self.$store.dispatch('getAppointmentMetas')

      rf.getRequest('AdminRequest').getDashboardTotals().then(res => {
        self.totals = res.data
      })

      self.get24Hours()
      self.get7Days()
      self.getCRs()
      self.getConsulationTypes()
      self.getSiteVisits()
      self.getClients()
      self.onTopClinics()
    },
    methods: {
      onSearchCSL(search_csl) {
        let self = this
        let params = {}
        params = search_csl
        params.from = params.from ? params.from / 1000 : null
        params.to = params.to ? params.to / 1000 : null
        params.type_ids = [1]

        rf.getRequest('AdminRequest').getAppointments(params).then(res => {
          self.total_csl = res.data.total
        })
      },
      onSearchSV(search_sv) {
        let self = this
        let params = {}
        params = search_sv
        params.from = params.from ? params.from / 1000 : null
        params.to = params.to ? params.to / 1000 : null
        params.type_ids = [2]

        rf.getRequest('AdminRequest').getAppointments(params).then(res => {
          self.total_sv = res.data.total
        })
      },
      onSearchRevenue(search_rv) {
        let self = this
        let params = {}
        params = search_rv
        params.from = params.from ? params.from / 1000 : null
        params.to = params.to ? params.to / 1000 : null

        rf.getRequest('AdminRequest').getAppointmentTotal(params).then(res => {
          self.total_rv = res.data.total
        })
      },
      getClients() {
        let self = this
        let params = {
          limit: 3,
          sort_created: 'desc'
        }

        rf.getRequest('AdminRequest').getClients(params).then(res => {
          self.clients = res.data.datas
        })
      },
      get24Hours() {
        let self = this
        let params = {
          limit: 3,
          type: '24h',
          sort_created: 'desc'
        }

        rf.getRequest('AdminRequest').getAppointments(params).then((res) => {
          self.appts_24h = res.data.datas
        })
      },
      get7Days() {
        let self = this
        let params = {
          limit: 3,
          type: '7d',
          sort_created: 'desc'
        }

        rf.getRequest('AdminRequest').getAppointments(params).then((res) => {
          self.appts_7d = res.data.datas
        })
      },
      getConsulationTypes() {
        let self = this

        let params = {
          limit: 3,
          type_ids: [1],
          sort_created: 'desc'
        }

        rf.getRequest('AdminRequest').getAppointments(params).then((res) => {
          self.appts_ct = res.data.datas
        })
      },
      getSiteVisits() {
        let self = this

        let params = {
          limit: 3,
          type_ids: [2],
          sort_created: 'desc'
        }

        rf.getRequest('AdminRequest').getAppointments(params).then((res) => {
          self.appts_sv = res.data.datas
        })
      },
      getCRs() {
        let self = this
        let params = {
          limit: 3,
          sort_created: 'desc'
        }

        rf.getRequest('AdminRequest').getAppointmentsCR(params).then((res) => {
          self.appts_cr = res.data.datas
        })
      },
      onTopClinics() {
        let self = this
        let params = self.top_clinic_filter

        rf.getRequest('AdminRequest').getAppointmentsTop(params).then((res) => {
          self.top_clinics = res.data
          console.log(self.top_clinics)
        })
      }
    }
  }
</script>


