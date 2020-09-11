<template>
  <div>
    <p class="title title-22 title-color">Payments</p>

    <div class="row">
      <div class="col-sm-12 form-inline mb-3">
        <FilterLimit @onChangeLimit="onChangeLimit"></FilterLimit>
      </div>
    </div>

    <div class="list-content">
      <div class="row">
        <div class="col-md-12">
          <div class="table-responsive">
            <table class="m-t-25 table table-striped custom-table">
              <thead>
              <tr>
                <th>
                  <span class="title-date">Invoice No.</span>
                  <img class="img-down" src="/assets/img/icon_down.png">
                  <img src="/assets/img/icon_up.png">
                </th>
                <th>Clinic</th>
                <th>Consulation Type</th>
                <th>Payment Type</th>
                <th>Paid Date</th>
                <th>Paid Amount</th>
              </tr>
              </thead>
              <tbody>
              <tr :key="payment.id" v-for="payment in payments">
                <td>
                  <router-link :to="'payment/' + payment.id">
                    <span class="text-blue desc-12">{{ payment.id | convertInvoiceID }}</span>
                  </router-link>
                </td>
                <td>{{ payment.clinic.name }}</td>
                <td>{{ payment.consulation_type_name }}</td>
                <td>{{ payment.payment_type_name }}</td>
                <td>{{ payment.paid_date | convertTimeSecondToDateTime }}</td>
                <td>{{ payment.paid_amount }}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div class="page">
      <Pagination :current-page="current_page" :total-page="total_page"
                  @pageData="getPayments"></Pagination>
    </div>
  </div>
</template>

<script>
  import rf from "../../api/RequestFactory"
  import Pagination from "../../common/Pagination"
  import FilterLimit from '../../components/FilterLimit'

  export default {
    components: {
      Pagination,
      FilterLimit
    },
    data() {
      return {
        payments: [],
        page: null,
        sort_created: 'desc',
        current_page: 0,
        total_page: 0,
        limit: 10
      }
    },
    mounted() {
      let self = this
      self.getPayments(self.current_page);
    },
    methods: {
      getPayments(page) {
        let self = this
        self.current_page = page;
        let params = {
          page: page,
          sort_created: self.sort_created,
          limit: self.limit
        }

        rf.getRequest('UserRequest').getPayments(params).then((res) => {
          this.payments = res.data.datas;
          this.total_page = res.data.total_page;
        });
      },
      onChangeLimit(limit) {
        let self = this

        self.limit = limit
        self.getPayments(self.current_page)
      }
    }
  }
</script>

<style></style>
