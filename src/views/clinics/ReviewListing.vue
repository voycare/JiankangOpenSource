<template>
  <div  id="review_qage">
    <div class="row">
      <div class="col-sm-6 pl-0">
        <p class="title title-22">Reviews</p>
      </div>
    </div>

    <ReviewTable :reviews="reviews" :hide-clinic="true" :hide-approve="true" :hide-decline="true"></ReviewTable>

    <div class="page">
      <Pagination :current-page="current_page" :total-page="total_page"
                  @pageData="getListing"></Pagination>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import Pagination from "../../common/Pagination"
  import rf from "../../api/RequestFactory"
  import ReviewTable from '../../components/ReviewTable'

  export default {
    components: {
      Pagination,
      ReviewTable
    },
    computed: {
      ...mapGetters(['appt_treatments'])
    },
    data() {
      return {
        show_popover_filter: false,
        current_page: 1,
        sort_created: 'desc',
        total_page: 1,
        reviews: [],
      }
    },
    mounted() {
      let self = this
      self.$store.dispatch('getAppointmentMetas')
      self.getListing(self.current_page)
    },
    methods: {
      getListing(page) {
        let self = this
        let params = {
          page: page,
          sort_created: this.sort_created
        };

        rf.getRequest('ClinicRequest').getReviews(params).then(res => {
          self.reviews = res.data.datas
          self.total_page = res.data.total_page
          self.current_page = page
        })
      }
    }
  }
</script>
<style>
  #review_qage table th {
    width: 43px;
    height: 21px;
    font-weight: bold;
    font-size: 14px;
    line-height: 21px;
    color: #434343;
  }

  .button-table-review button {
    margin: auto;
    padding: 0px;
    width: 55px;
    height: 20px;
    font-size: 9px;
    color: #000000;
  }

  .button-table-review .btn-success {
    background: #93E9BE;
  }

  .button-table-review .btn-danger {
    background: #FF0000;
  }
</style>
