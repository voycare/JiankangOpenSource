<template>
  <div>
    <p class="title title-22">Appointments<i class="fa fa-arrow-right mr-3 ml-3"></i>7 - Day</p>

    <div class="list-content">
      <AdminAppointmentFilter @page-limit-change="handlePageLimitChange" @filter="filterAppt">
        <template #more-action>
          <button class="btn btn-sm p-0 btn-white mr-2 extra-icon-btn">
            <i class="text-success fa fa-check" />
          </button>
          <button class="btn btn-sm p-0 btn-white mr-2 extra-icon-btn">
            <i class="text-danger fa fa-clock-o" />
          </button>
          <button class="btn btn-sm p-0 btn-white extra-icon-btn">
            <i class="fa fa-minus" />
          </button>
        </template>
      </AdminAppointmentFilter>

      <AdminAppointmentListing :appoinments="appoinments" :showNotify="false"
                               @onRefresh="getDataAppointments(current_page)"
                               @onSortCreated="onSortCreated"></AdminAppointmentListing>
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
  import AdminAppointmentListing from '../../components/AdminAppointmentListing'
  import AdminAppointmentFilter from '../../components/AdminAppointmentFilter'

  export default {
    name: "Appoinment",
    components: {
      Pagination,
      AdminAppointmentListing,
      AdminAppointmentFilter
    },
    data() {
      return {
        Const,
        appoinments: [],
        current_page: 1,
        pageLimit: 10,
        sort_created: 'desc',
        name: '',
        total_page: 1,
      }
    },
    watch: {

    },
    computed: {
      ...mapGetters(['countries', 'appt_types', 'appt_status'])
    },
    methods: {
      getDataAppointments(page) {
        this.current_page = page;
        let params = {
          page: page,
          limit: this.pageLimit,
          sort_created: this.sort_created,
          // key: this.name,
          country: this.country,
          type: '7d'
        };

        rf.getRequest('AdminRequest').getAppointments(params).then((res) => {
          this.appoinments = res.data.datas;
          this.total_page = res.data.total_page;
        })
      },
      onSortCreated() {
        this.getDataAppointments(1);
      },
      handlePageLimitChange(limit){
        this.pageLimit = limit
        this.current_page = 1
        this.getDataAppointments(1)
      },
      filterAppt(apptFilter){
        this.current_page = 1
        let params = {
          page: this.current_page,
          limit: this.pageLimit,
          sort_created: this.sort_created,
          country: apptFilter.country,
          type: apptFilter.type
        }

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
