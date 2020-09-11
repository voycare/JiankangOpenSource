<template>
  <div>
    <p class="title title-22">Appointments</p>
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
      <span>

      </span>
      <AdminAppointmentListing :appoinments="appoinments" @onRefresh="getDataAppointments(current_page)"
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
      },
      sort_created: function () {
        this.getDataAppointments(1);
      }
    },
    computed: {
      ...mapGetters(['countries', 'appt_types', 'appt_status'])
    },
    methods: {
      getDataAppointments(page) {
        this.current_page = page;
        let params = {
          page: page,
          sort_created: this.sort_created,
          // key: this.name,
          limit: this.pageLimit,
          country: this.country
        };
        rf.getRequest('AdminRequest').getAppointments(params).then((res) => {
          this.appoinments = res.data.datas;
          this.total_page = res.data.total_page;
        });
      },
      onSortCreated() {
        this.getDataAppointments(1);
      },
      onToggleFilter() {
      },
      handlePageLimitChange(limit){
        this.current_page = 1
        this.pageLimit = limit
        this.getDataAppointments(1)
      },
      filterAppt(apptFilter){
        this.current_page = 1
        let params = {
          page: this.current_page,
          limit: this.pageLimit,
          sort_created: this.sort_created,
          ...apptFilter
        }
        rf.getRequest('AdminRequest').getAppointments(params).then((res) => {
          this.appoinments = res.data.datas;
          this.total_page = res.data.total_page;
        });

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
  label {
    font-family: Poppins;
    font-style: normal;
    font-weight: normal;
    font-size: 10px;
    line-height: 15px;
    /* identical to box height */
    color: #434343;
  }

  .btn-apply {
    width: 108px;
    height: 19px;
    background: #EB6271;
    border-radius: 50px;
    color: white;
    font-size: 9px;
    border: none;
  }

</style>
