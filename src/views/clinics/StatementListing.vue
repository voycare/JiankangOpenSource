<template>
  <div id="review_qage">
    <div class="row">
      <div class="col-sm-6 pl-0">
        <p class="title title-22">Reviews</p>
      </div>
    </div>

    <div class="row">
      <div class="table-responsive">
        <table class="table table-striped custom-table table--appt">
          <thead>
          <tr>
            <th>Statement No.</th>
            <th>Period</th>
            <th class="text-center">Status</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in items" :key="item.id">
            <td>
              <router-link :to="'/statements/' + item.id">{{ item.id | convertHeraID }}</router-link>
            </td>
            <td>{{ item.sale_period | convertTimeSecondToDate }}</td>
            <td class="text-center">
              <p :class="Const.STATUS.intToPaymentStatus(item.status)" class="alert appt--status">
                {{Const.STATUS.paymentStatusString( item.status )}}
              </p>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="page">
      <Pagination :current-page="current_page" :total-page="total_page"
                  @pageData="getListing"></Pagination>
    </div>
  </div>
</template>
<script>
  import Const from "./../../utils/const"
  import Pagination from "../../common/Pagination"
  import rf from "../../api/RequestFactory"
  import ReviewTable from '../../components/ReviewTable'

  export default {
    components: {
      Pagination,
      ReviewTable
    },
    data() {
      return {
        Const,
        show_popover_filter: false,
        current_page: 1,
        sort_created: 'desc',
        total_page: 1,
        items: [],
      }
    },
    mounted() {
      let self = this
      self.getListing(self.current_page)
    },
    methods: {
      getListing(page) {
        let self = this
        let params = {
          page: page,
          sort_created: this.sort_created
        };

        rf.getRequest('ClinicRequest').getStatements(params).then(res => {
          self.items = res.data.datas
          self.total_page = res.data.total_page
          self.current_page = page
        })
      },
    }
  }
</script>
<style>
</style>
