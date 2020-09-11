<template>
  <div>
    <p class="title title-22">Appointments</p>
    <div class="search">
      <input @input="getDataAppointments" class="content-name" placeholder="Search" type="text"
             v-model="name">
      <select class="country-search" v-model="country">
        <option disabled hidden value="">Select Country</option>
        <option :key="item.id" :value="item.name" v-for="item in countries">{{item.name}}</option>
      </select>
    </div>

    <div class="row list-content">
      <div class="col-md-12">
        <div class="table-responsive">
          <table class="table table-striped custom-table table--appt">
            <thead>
            <tr>
              <th>No.</th>
              <th @click="orderCreated" class="date"><span class="title-date">Date</span><img
                  class="img-down"
                  src="/assets/img/icon_down.png"><img
                  src="/assets/img/icon_up.png"></th>
              <th>Clinic</th>
              <th>City</th>
              <th>Country</th>
              <th>Appt.Date</th>
              <th>Appt.Time</th>
              <th>Type</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
            </thead>
            <tbody>
            <tr :key="appt.id" v-for="appt in appoinments">
              <td>
                <span class="text-blue desc-12">{{ appt.id | convertAppointmentID }}</span>
              </td>
              <td>{{appt.created|convertTimeSecondToDate}}</td>
              <td>{{appt.clinic ? appt.clinic.name : ''}}</td>
              <td>{{appt.clinic.address.full_address}}</td>
              <td>{{appt.clinic.address.country}}</td>
              <td>{{appt.date|convertTimeSecondToDate}}</td>
              <td>{{appt.date|convertDateToTime}}</td>
              <td>{{appt.mode|convertModeAppointment}}</td>
              <td>
                <p :class="Const.STATUS.intToStatusClass(appt.status)" class="alert appt--status">
                  {{Const.STATUS.intToString( appt.status )}}
                </p>
              </td>
              <td>
                <router-link :to="'appointment/' + appt.id" class="btn btn-round btn-small btn-white"
                             v-if="appt.status !== 1">View
                </router-link>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="page">
      <Pagination :current-page="current_page" :total-page="total_page"
                  @pageData="getDataAppointments"></Pagination>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  import Const from "./../../utils/const"
  import rf from "../../api/RequestFactory"
  import Pagination from "../../common/Pagination"

  export default {
    name: "AppoinmentListing",
    components: {
      Pagination
    },
    data() {
      return {
        Const,
        country: '',
        appoinments: [],
        current_page: 1,
        sort_created: 'desc',
        name: '',
        total_page: 1,
      }
    },
    watch: {
      country: function () {
        this.getDataAppointments();
      },
      sort_created: function () {
        this.getDataAppointments(1);
      }
    },
    computed: {
      ...mapGetters(['countries'])
    },
    methods: {
      getDataAppointments(page) {
        this.current_page = page;
        let params = {
          page: page,
          sort_created: this.sort_created,
          // key: this.name,
          country: this.country
        };
        rf.getRequest('UserRequest').getAppointments(params).then((res) => {
          this.appoinments = res.data.datas;
          this.total_page = res.data.total_page;
        });
      },
      orderCreated() {
        if (this.sort_created === 'desc') {
          this.sort_created = 'asc';
          return
        }
        if (this.sort_created === 'asc') {
          this.sort_created = 'desc';

        }
      },
    },

    mounted() {
      let self = this

      self.$store.dispatch('getCountries');
      self.getDataAppointments(this.current_page);
    }
  }
</script>
