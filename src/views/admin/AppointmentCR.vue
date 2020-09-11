<template>
  <div>
    <p class="title title-22">Appointments<i class="fa fa-arrow-right mr-3 ml-3"></i>Cancellation Requests</p>

    <div class="list-content">
      <AdminAppointmentFilter @page-limit-change="handlePageLimitChange">
      </AdminAppointmentFilter>

      <div class="row">
        <div class="col-md-12">
          <div class="table-responsive">
            <table class="table table-striped custom-table table--appt">
              <thead>
              <tr>
                <th>No.</th>
                <th @click="orderCreated" class="date">
                  <span class="title-date">Order Date <b-icon icon="arrow-down-up" class="bold"></b-icon>
                  </span>
                </th>
                <th>Client</th>
                <th>Clinic</th>
                <th>Appt.Date</th>
                <th>Appt.Time</th>
                <th>Type</th>
                <th>Treatment</th>
                <th class="text-center">Status</th>
              </tr>
              </thead>
              <tbody>
              <tr :key="appt.id" v-for="appt in appt_crs">
                <td>
                  <router-link
                      :to="'/appointment-cr/' + appt.id">
                    <span class="text-blue desc-12"><u>{{ appt.id | convertAppointmentID }}</u></span>
                  </router-link>
                </td>
                <td>{{appt.appointment.created | convertTimeSecondToDate}}</td>
                <td><span v-if="appt.appointment.client">{{ appt.appointment.client.name }}</span></td>
                <td>{{appt.appointment.clinic.name}}</td>
                <td>{{appt.appointment.date | convertTimeSecondToDate}}</td>
                <td class="text-center">{{appt.appointment.date | convertDateToTime}}</td>
                <td>{{ appt_types[appt.appointment.type] }}</td>
                <td>{{ appt_treatments[appt.appointment.treatment_id] }}</td>
                <td>
                  <p class="alert appt--status alert-process" v-if="appt.status == 1">
                    Processing</p>
                  <p class="alert appt--status alert-refunded" v-if="appt.status == 2">
                    Refunded</p>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
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
  import AdminAppointmentFilter from '../../components/AdminAppointmentFilter'

  export default {
    name: "Appoinment",
    components: {
      Pagination,
      AdminAppointmentFilter
    },
    data() {
      return {
        Const,
        country: '',
        pageLimit: 10,
        appt_crs: [],
        current_page: 1,
        sort_created: 'desc',
        name: '',
        total_page: 1,
      }
    },
    watch: {
      country: function () {
        this.getDataAppointments();
      }
    },
    computed: {
      ...mapGetters(['countries', 'appt_types', 'appt_status', 'appt_treatments'])
    },
    methods: {
      orderCreated() {
        if (this.sort_created === 'desc') {
          this.sort_created = 'asc';
          return
        }
        if (this.sort_created === 'asc') {
          this.sort_created = 'desc';
          return;
        }

        this.$emit('onSortCreated', this.sort_created)
      },
      getDataAppointments(page) {
        this.current_page = page;
        let params = {
          page: page,
          limit: this.pageLimit,
          sort_created: this.sort_created,
          // key: this.name,
          country: this.country
        };

        rf.getRequest('AdminRequest').getAppointmentsCR(params).then((res) => {
          this.appt_crs = res.data.datas;
          this.total_page = res.data.total_page;
        })
      },
      onSortCreated() {
        this.getDataAppointments(1);
      },
      handlePageLimitChange(limit){
        this.current_page = 1
        this.pageLimit = limit
        this.getDataAppointments(1)
      }
    },

    mounted() {
      let self = this

      self.$store.dispatch('getCountries')
      self.$store.dispatch('getAppointmentMetas')
      self.getDataAppointments(this.current_page);
    }
  }
</script>
