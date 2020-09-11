<template>
  <div>
    <p class="title title-22">Appointments<i class="fa fa-arrow-right mr-3 ml-3"></i>24 - Hour</p>

    <div class="list-content">
      <AdminAppointmentFilter  @page-limit-change="handlePageLimitChange">
        <template #more-action>
          <button class="btn btn-sm p-0 btn-white px-3" style="height: 27px;color: #EB6271;">
            Notify All
          </button>
        </template>
      </AdminAppointmentFilter>

      <AdminAppointmentListing :appoinments="appoinments" :showNotify="true"
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
        country: '',
        appoinments: [],
        current_page: 1,
        pageLimit: 10,
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
      ...mapGetters(['countries', 'appt_types', 'appt_status'])
    },
    methods: {
      onNotifyAll() {
        let self = this
        let params = {
          type: '24h'
        }

        rf.getRequest('AdminRequest').postAppointmentNotifyAll(params).then(res => {
          self.getDataAppointments(self.current_page)
        })
      },
      getDataAppointments(page) {
        this.current_page = page;
        let params = {
          page: page,
          limit: this.pageLimit,
          sort_created: this.sort_created,
          // key: this.name,
          country: this.country,
          type: '24h'
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

<style scoped>

</style>
