<template>
  <div>
    <p class="title title-22">Clinic Applicants</p>

    <div class="list-content">
      <AdminClinicListing :clinics="clinics" @onRefresh="getClinicApplicants(current_page)"></AdminClinicListing>
    </div>

    <div class="page">
      <Pagination :current-page="current_page" :total-page="total_page"
                  @pageData="getClinicApplicants"></Pagination>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  import Const from "./../../utils/const"
  import rf from "../../api/RequestFactory"
  import Pagination from "../../common/Pagination"
  import AdminClinicListing from '../../components/AdminClinicListing'

  export default {
    components: {
      Pagination,
      AdminClinicListing
    },
    data() {
      return {
        Const,
        clinics: [],
        current_page: 1,
        sort_created: 'desc',
        name: '',
        total_page: 1,
      }
    },
    computed: {
      ...mapGetters(['countries', 'appt_types', 'appt_status'])
    },
    methods: {
      getClinicApplicants(page) {
        this.current_page = page;
        let params = {
          page: page
        };
        rf.getRequest('AdminRequest').getClinicApplicants(params).then((res) => {
          this.clinics = res.data.datas;
          this.total_page = res.data.total_page;
        });
      },
      onSortCreated() {
        this.getClinicApplicants(1);
      }
    },

    mounted() {
      let self = this

      self.$store.dispatch('getCountries')
      self.$store.dispatch('getAppointmentMetas')
      self.getClinicApplicants(this.current_page);
    }
  }
</script>
