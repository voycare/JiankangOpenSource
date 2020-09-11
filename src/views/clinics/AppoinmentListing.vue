<template>
  <div>
    <p class="title title-22">Appointments</p>

    <AdminAppointmentFilter @filter="onFilter"></AdminAppointmentFilter>
    <ClinicAppointmentListing :appts="appts" @orderCreated="orderCreated"></ClinicAppointmentListing>

    <div class="page">
      <Pagination :current-page="current_page" :total-page="total_page"
                  @pageData="getListing"></Pagination>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  import Const from "./../../utils/const"
  import rf from "../../api/RequestFactory"
  import Pagination from "../../common/Pagination"
  import ClinicAppointmentListing from '../../components/ClinicAppointmentListing'
  import AdminAppointmentFilter from '../../components/AdminAppointmentFilter'

  export default {
    name: "AppoinmentListing",
    components: {
      Pagination,
      ClinicAppointmentListing,
      AdminAppointmentFilter
    },
    data() {
      return {
        Const,
        country: '',
        appts: [],
        current_page: 1,
        sort_created: 'desc',
        name: '',
        total_page: 1,
        filter: {
          status_ids: [],
          type_ids: [],
          limit: 10
        }
      }
    },
    watch: {
      country: function () {
        this.getListing();
      },
      sort_created: function () {
        this.getListing(1);
      }
    },
    computed: {
      ...mapGetters(['countries'])
    },
    mounted() {
      let self = this

      self.$store.dispatch('getCountries')
      self.getListing(self.current_page)
      const filtered = Object.keys(self.$route.query)
        .filter(key => ['status_ids', 'type_ids'].includes(key))
        .reduce((obj, key) => {
          obj[key] = self.$route.query[key]
          return obj
        }, {})
      self.filter = filtered
    },
    methods: {
      onFilter(params) {
        let self = this

        self.country = params.country
        self.filter.status_ids = params.status_ids
        self.filter.type_ids = params.type_ids
        self.filter.limit = params.limit

        self.getListing(1)
      },
      getListing(page) {
        let self = this
        self.current_page = page;
        let params = {
          page: page,
          sort_created: this.sort_created,
          country: this.country,
          status_ids: self.filter.status_ids,
          type_ids: self.filter.type_ids,
          limit: self.filter.limit
        }
        rf.getRequest('ClinicRequest').getAppointments(params).then((res) => {
          this.appts = res.data.datas;
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
  }
</script>
