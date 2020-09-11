<template>
  <div class="content widget-new-site-visit">
    <div class="row">
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
          <span class="dash-widget-bg4"><i aria-hidden="true" class="fa fa-heartbeat"></i></span>
          <div class="dash-widget-info text-right">
            <h3>{{ totals.ratings }}</h3>
            <span class="widget-title4">Rating <i aria-hidden="true"
                                                  class="fa fa-check"></i></span>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-8 col-md-8">
        <ClinicAppointmentWidget to="/appointments?status_ids[]=1" :appts="appts_7d"
                                 title="7 - Day"></ClinicAppointmentWidget>

        <ClinicAppointmentWidget to="/appointments?type_ids=1" :appts="appts_ct"
                                 title="New Consulations"></ClinicAppointmentWidget>

        <ClinicAppointmentWidget to="/appointments?type_ids[]=2" :appts="appts_sv"
                                 title="New Site Visit Requests"></ClinicAppointmentWidget>

        <!--<div class="card">-->
        <!--<div class="card-header">-->
        <!--<div>-->
        <!--<h4 class="title-20 card-title card-title-homepage d-inline-block">7 - Day</h4>-->
        <!--<p class="title-15">Confirmed appointments only</p>-->
        <!--</div>-->
        <!--<button class="btn btn-dark btn-small float-right btn-view1">View all</button>-->
        <!--</div>-->
        <!--<div class="card-body p-0">-->
        <!--<div class="table-responsive table&#45;&#45;appointment">-->
        <!--<table class="table mb-0 b-0">-->
        <!--<tbody>-->
        <!--<tr>-->
        <!--<td>-->
        <!--<img src="/assets/img/user-pic.png" alt="user picture">-->
        <!--</td>-->
        <!--<td>-->
        <!--<h2 class="time-title title-15">Name</h2>-->
        <!--<p class="size-11">Shan Zhang</p>-->
        <!--</td>-->
        <!--<td>-->
        <!--<h2 class="time-title title-15">Location</h2>-->
        <!--<p class="size-11">China</p>-->
        <!--</td>-->
        <!--<td>-->
        <!--<h2 class="time-title title-15">Treatment</h2>-->
        <!--<p class="size-11">IVF</p>-->
        <!--</td>-->
        <!--<td>-->
        <!--<h2 class="time-title title-15">Appt. Date</h2>-->
        <!--<p class="size-11">2020-06-01</p>-->
        <!--</td>-->
        <!--<td>-->
        <!--<h2 class="time-title title-15">Appt. Time</h2>-->
        <!--<p class="size-11">10:30</p>-->
        <!--</td>-->
        <!--<td>-->
        <!--<p class="alert appt&#45;&#45;status alert-info">Confirmed</p>-->
        <!--</td>-->
        <!--</tr>-->
        <!--<tr>-->
        <!--<td>-->
        <!--<img src="/assets/img/user-pic.png" alt="user picture">-->
        <!--</td>-->
        <!--<td>-->
        <!--<h2 class="time-title title-15">Name</h2>-->
        <!--<p class="size-11">Shan Zhang</p>-->
        <!--</td>-->
        <!--<td>-->
        <!--<h2 class="time-title title-15">Location</h2>-->
        <!--<p class="size-11">China</p>-->
        <!--</td>-->
        <!--<td>-->
        <!--<h2 class="time-title title-15">Treatment</h2>-->
        <!--<p class="size-11">IVF</p>-->
        <!--</td>-->
        <!--<td>-->
        <!--<h2 class="time-title title-15">Appt. Date</h2>-->
        <!--<p class="size-11">2020-06-01</p>-->
        <!--</td>-->
        <!--<td>-->
        <!--<h2 class="time-title title-15">Appt. Time</h2>-->
        <!--<p class="size-11">10:30</p>-->
        <!--</td>-->
        <!--<td>-->
        <!--<p class="alert appt&#45;&#45;status alert-info">Confirmed</p>-->
        <!--</td>-->
        <!--</tr>-->
        <!--<tr>-->
        <!--<td>-->
        <!--<img src="/assets/img/user-pic.png" alt="user picture">-->
        <!--</td>-->
        <!--<td>-->
        <!--<h2 class="time-title title-15">Name</h2>-->
        <!--<p class="size-11">Shan Zhang</p>-->
        <!--</td>-->
        <!--<td>-->
        <!--<h2 class="time-title title-15">Location</h2>-->
        <!--<p class="size-11">China</p>-->
        <!--</td>-->
        <!--<td>-->
        <!--<h2 class="time-title title-15">Treatment</h2>-->
        <!--<p class="size-11">IVF</p>-->
        <!--</td>-->
        <!--<td>-->
        <!--<h2 class="time-title title-15">Appt. Date</h2>-->
        <!--<p class="size-11">2020-06-01</p>-->
        <!--</td>-->
        <!--<td>-->
        <!--<h2 class="time-title title-15">Appt. Time</h2>-->
        <!--<p class="size-11">10:30</p>-->
        <!--</td>-->
        <!--<td>-->
        <!--<p class="alert appt&#45;&#45;status alert-info">Confirmed</p>-->
        <!--</td>-->
        <!--</tr>-->
        <!--</tbody>-->
        <!--</table>-->
        <!--</div>-->
        <!--</div>-->
        <!--</div>-->

        <!--<div class="card">-->
        <!--<div class="card-header">-->
        <!--<div>-->
        <!--<h4 class="title-20 card-title card-title-homepage d-inline-block">New Consulations</h4>-->
        <!--</div>-->
        <!--<button class="btn btn-dark btn-small float-right btn-view2">View all</button>-->
        <!--</div>-->
        <!--<div class="card-body p-0">-->
        <!--<div class="table-responsive table&#45;&#45;appointment">-->
        <!--<table class="table mb-0 b-0">-->
        <!--<tbody>-->
        <!--<tr>-->
        <!--<td>-->
        <!--<img src="/assets/img/user-pic.png" alt="user picture">-->
        <!--</td>-->
        <!--<td>-->
        <!--<h2 class="time-title title-15">Name</h2>-->
        <!--<p class="size-11">Shan Zhang</p>-->
        <!--</td>-->
        <!--<td>-->
        <!--<h2 class="time-title title-15">Location</h2>-->
        <!--<p class="size-11">China</p>-->
        <!--</td>-->
        <!--<td>-->
        <!--<h2 class="time-title title-15">Treatment</h2>-->
        <!--<p class="size-11">IVF</p>-->
        <!--</td>-->
        <!--<td>-->
        <!--<h2 class="time-title title-15">Appt. Date</h2>-->
        <!--<p class="size-11">2020-06-01</p>-->
        <!--</td>-->
        <!--<td>-->
        <!--<h2 class="time-title title-15">Appt. Time</h2>-->
        <!--<p class="size-11">10:30</p>-->
        <!--</td>-->
        <!--<td>-->
        <!--<p class="alert appt&#45;&#45;status alert-info">Confirmed</p>-->
        <!--</td>-->
        <!--</tr>-->
        <!--<tr>-->
        <!--<td>-->
        <!--<img src="/assets/img/user-pic.png" alt="user picture">-->
        <!--</td>-->
        <!--<td>-->
        <!--<h2 class="time-title title-15">Name</h2>-->
        <!--<p class="size-11">Shan Zhang</p>-->
        <!--</td>-->
        <!--<td>-->
        <!--<h2 class="time-title title-15">Location</h2>-->
        <!--<p class="size-11">China</p>-->
        <!--</td>-->
        <!--<td>-->
        <!--<h2 class="time-title title-15">Treatment</h2>-->
        <!--<p class="size-11">IVF</p>-->
        <!--</td>-->
        <!--<td>-->
        <!--<h2 class="time-title title-15">Appt. Date</h2>-->
        <!--<p class="size-11">2020-06-01</p>-->
        <!--</td>-->
        <!--<td>-->
        <!--<h2 class="time-title title-15">Appt. Time</h2>-->
        <!--<p class="size-11">10:30</p>-->
        <!--</td>-->
        <!--<td>-->
        <!--<p class="alert appt&#45;&#45;status alert-danger">Canceled</p>-->
        <!--</td>-->
        <!--</tr>-->
        <!--<tr>-->
        <!--<td>-->
        <!--<img src="/assets/img/user-pic.png" alt="user picture">-->
        <!--</td>-->
        <!--<td>-->
        <!--<h2 class="time-title title-15">Name</h2>-->
        <!--<p class="size-11">Shan Zhang</p>-->
        <!--</td>-->
        <!--<td>-->
        <!--<h2 class="time-title title-15">Location</h2>-->
        <!--<p class="size-11">China</p>-->
        <!--</td>-->
        <!--<td>-->
        <!--<h2 class="time-title title-15">Treatment</h2>-->
        <!--<p class="size-11">IVF</p>-->
        <!--</td>-->
        <!--<td>-->
        <!--<h2 class="time-title title-15">Appt. Date</h2>-->
        <!--<p class="size-11">2020-06-01</p>-->
        <!--</td>-->
        <!--<td>-->
        <!--<h2 class="time-title title-15">Appt. Time</h2>-->
        <!--<p class="size-11">10:30</p>-->
        <!--</td>-->
        <!--<td>-->
        <!--<p class="alert appt&#45;&#45;status alert-warning">Pending</p>-->
        <!--</td>-->
        <!--</tr>-->
        <!--</tbody>-->
        <!--</table>-->
        <!--</div>-->
        <!--</div>-->
        <!--</div>-->

        <!--<div class="card">-->
        <!--<div class="card-header">-->
        <!--<div>-->
        <!--<h4 class="title-20 card-title card-title-homepage d-inline-block">New Site Visit Requests</h4>-->
        <!--</div>-->
        <!--<button class="btn btn-dark btn-small float-right btn-view2">View all</button>-->
        <!--</div>-->
        <!--<div class="card-body p-0">-->
        <!--<div class="table-responsive table&#45;&#45;appointment">-->
        <!--<table class="table mb-0 b-0">-->
        <!--<tbody>-->
        <!--<tr>-->
        <!--<td>-->
        <!--<img src="/assets/img/user-pic.png" alt="user picture">-->
        <!--</td>-->
        <!--<td>-->
        <!--<h2 class="time-title title-15">Name</h2>-->
        <!--<p class="size-11">Shan Zhang</p>-->
        <!--</td>-->
        <!--<td colspan="2" style="text-align:center;">-->
        <!--<h2 class="time-title title-15">Location</h2>-->
        <!--<p class="size-11">China</p>-->
        <!--</td>-->
        <!--<td>-->
        <!--<h2 class="time-title title-15">Appt. Date</h2>-->
        <!--<p class="size-11">2020-06-01</p>-->
        <!--</td>-->
        <!--<td>-->
        <!--<h2 class="time-title title-15">Appt. Time</h2>-->
        <!--<p class="size-11">10:30</p>-->
        <!--</td>-->
        <!--<td>-->
        <!--<p class="alert appt&#45;&#45;status alert-info">Confirmed</p>-->
        <!--</td>-->
        <!--</tr>-->
        <!--<tr>-->
        <!--<td>-->
        <!--<img src="/assets/img/user-pic.png" alt="user picture">-->
        <!--</td>-->
        <!--<td>-->
        <!--<h2 class="time-title title-15">Name</h2>-->
        <!--<p class="size-11">Shan Zhang</p>-->
        <!--</td>-->
        <!--<td colspan="2" style="text-align:center;">-->
        <!--<h2 class="time-title title-15">Location</h2>-->
        <!--<p class="size-11">China</p>-->
        <!--</td>-->
        <!--<td>-->
        <!--<h2 class="time-title title-15">Appt. Date</h2>-->
        <!--<p class="size-11">2020-06-01</p>-->
        <!--</td>-->
        <!--<td>-->
        <!--<h2 class="time-title title-15">Appt. Time</h2>-->
        <!--<p class="size-11">10:30</p>-->
        <!--</td>-->
        <!--<td>-->
        <!--<p class="alert appt&#45;&#45;status alert-danger">Canceled</p>-->
        <!--</td>-->
        <!--</tr>-->
        <!--<tr>-->
        <!--<td>-->
        <!--<img src="/assets/img/user-pic.png" alt="user picture">-->
        <!--</td>-->
        <!--<td>-->
        <!--<h2 class="time-title title-15">Name</h2>-->
        <!--<p class="size-11">Shan Zhang</p>-->
        <!--</td>-->
        <!--<td colspan="2" style="text-align:center;">-->
        <!--<h2 class="time-title title-15">Location</h2>-->
        <!--<p class="size-11">China</p>-->
        <!--</td>-->
        <!--<td>-->
        <!--<h2 class="time-title title-15">Appt. Date</h2>-->
        <!--<p class="size-11">2020-06-01</p>-->
        <!--</td>-->
        <!--<td>-->
        <!--<h2 class="time-title title-15">Appt. Time</h2>-->
        <!--<p class="size-11">10:30</p>-->
        <!--</td>-->
        <!--<td>-->
        <!--<p class="alert appt&#45;&#45;status alert-warning">Pending</p>-->
        <!--</td>-->
        <!--</tr>-->
        <!--</tbody>-->
        <!--</table>-->
        <!--</div>-->
        <!--</div>-->
        <!--</div>-->

        <!-- <div class="card">
          <div class="card-header">
            <h4 class="title-20 card-title card-title-homepage d-inline-block">Reviews</h4>
            <router-link class="btn btn-dark btn-small float-right" to="/reviews">View all</router-link>
          </div>
          <div class="card-body p-0">
            <div class="table-responsive table--appointment">
              <table class="table mb-0 b-0">
                <tbody>
                <tr v-bind:key="review.id" v-for="review in reviews">
                  <td>
                    <h2 class="time-title title-15 pb-2">{{ review.client.name }}</h2>
                  </td>
                  <td>
                    <h2 class="time-title title-15 pb-2">{{ review.client.address.country }}</h2>
                  </td>
                  <td>{{ review.star }}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div> -->
        <div class="card">
          <div class="card-header">
            <div>
              <h4 class="title-20 card-title card-title-homepage d-inline-block">Reviews</h4>
            </div>
            <button class="btn btn-dark btn-small float-right btn-view2">View all</button>
          </div>
          <div class="card-body p-0">
            <div class="table-responsive table--appointment">
              <table class="table mb-0 b-0">
                <tbody>
                <tr v-for="review in reviews" :key="review.id">
                  <td colspan="2">
                    <img src="/assets/img/user-pic.png" alt="user picture">
                    <span class="time-title title-15 review-name">{{ review.client.name }}</span>
                  </td>
                  <td colspan="2" style="text-align:center;">
                    <h2 class="time-title title-15">{{ review.client.address.country }}</h2>
                  </td>
                  <td colspan="2" style="text-align:center;">
                    <span v-for="star in 5" :key="star"><i class="fa fa-star" :class="star <= review.star ? 'text-warning' : ''"></i></span>
                    <span style="font-size:16px">{{ review.star }}</span>
                  </td>
                  <td style="text-align:center;">
                    <router-link :to="'/reviews/' + review.id" class="btn btn-round btn-small btn-white">View</router-link>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="col-4 col-lg-4 col-xl-4 db-right-col">
        <AdminWigetAppointmentType :isClinic="true" :header="'Consultations'" :total="total_csl"
                                   @search="onSearchCSL"/>

        <AdminWigetAppointmentType :isClinic="true" :header="'Site Visits'" :total="total_sv"
                                   @search="onSearchSV"/>

        <AdminWigetAppointmentType :isClinic="true" :header="'Revenues'" :total="total_rv"
                                   @search="onSearchRevenue"/>
      </div>
    </div>
  </div>
</template>

<script>
  import rf from "../../api/RequestFactory"
  import ClinicAppointmentWidget from "../../components/ClinicAppointmentWidget"
  import AdminWigetAppointmentType from "../../components/AdminWigetAppointmentType"

  export default {
    name: "AdminDashboard",
    components: {
      AdminWigetAppointmentType,
      ClinicAppointmentWidget
    },
    data() {
      return {
        totals: {
          clients: 0,
          ratings: 0
        },
        appts_7d: [],
        appts_ct: [],
        appts_sv: [],
        clients: [],
        reviews: [],
        search_csl: {
          from: null,
          to: null
        },
        search_sv: {
          from: null,
          to: null
        },
        search_rv: {
          from: null,
          to: null
        },
        total_csl: 0,
        total_sv: 0,
        total_rv: 0,
      }
    },
    mounted() {
      let self = this

      self.$store.dispatch('getAppointmentMetas')

      rf.getRequest('ClinicRequest').getDashboardTotals().then(res => {
        self.totals = res.data
      })

      self.get7Days()
      self.getConsulationTypes()
      self.getSiteVisits()
      self.getReviews()
    },
    methods: {
      onSearchCSL() {
        let self = this
        let params = {}
        params.from = (new Date(self.search_csl.from)).getTime() / 1000
        params.to = (new Date(self.search_csl.to)).getTime() / 1000
        params.type_ids = [1]

        rf.getRequest('ClinicRequest').getAppointments(params).then(res => {
          self.total_csl = res.data.total
        })
      },
      onSearchSV() {
        let self = this
        let params = {}
        params.from = (new Date(self.search_sv.from)).getTime() / 1000
        params.to = (new Date(self.search_sv.to)).getTime() / 1000
        params.type_ids = [2]

        rf.getRequest('ClinicRequest').getAppointments(params).then(res => {
          self.total_sv = res.data.total
        })
      },
      onSearchRevenue() {
        let self = this
        let params = {}
        params.from = (new Date(self.search_rv.from)).getTime() / 1000
        params.to = (new Date(self.search_rv.to)).getTime() / 1000

        rf.getRequest('ClinicRequest').getAppointmentTotal(params).then(res => {
          self.total_rv = res.data.total
        })
      },
      getReviews() {
        let self = this
        let params = {
          limit: 3,
        }

        rf.getRequest('ClinicRequest').getReviews(params).then((res) => {
          self.reviews = res.data.datas
        })
      },
      get7Days() {
        let self = this
        let params = {
          limit: 3,
          type: '7d',
          sort_created: 'desc',
          status_ids: [1]
        }

        rf.getRequest('ClinicRequest').getAppointments(params).then((res) => {
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

        rf.getRequest('ClinicRequest').getAppointments(params).then((res) => {
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

        rf.getRequest('ClinicRequest').getAppointments(params).then((res) => {
          self.appts_sv = res.data.datas
        })
      }
    }
  }
</script>
<style scoped>
  .card-title-homepage {
    color: #EB6271 !important;
  }

  .table td {
    vertical-align: middle;
  }

  .title-15 {
    font-weight: 500 !important;
  }

  .size-11 {
    font-size: 11px;
    color: #898989;
    margin: 0;
  }

  .widget-new-site-visit .card-header {
    position: relative;
  }

  .widget-new-site-visit .card-header p {
    margin: 0;
  }

  .btn-view1 {
    position: absolute;
    right: 12px;
    top: 30px;
  }

  .btn-view2 {
    position: absolute;
    right: 12px;
    top: 20px;
  }

  .review-name {
    height: 38px;
    line-height: 38px;
    padding-left: 10px;
  }

  td .fa-star {
    padding-right: 5px;
  }

  .pt-15 {
    padding-top: 15px;
  }

  .pb-15 {
    padding-bottom: 15px;
  }

  .db-right-col .card-body {
    padding: 20px;
  }

  .db-right-col h2 {
    margin: 0;
  }

  .db-right-col p {
    font-size: 13px;
  }

  .db-right-col .form-control {
    margin-bottom: 0;
    border-radius: 0;
    border: 0.5px solid #898989;
  }

  .total-box {
    border: 0.5px solid #898989;
    box-sizing: border-box;
    padding: 10px;
  }


</style>
