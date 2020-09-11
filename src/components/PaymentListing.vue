<template>
  <div>
    <div class="row">
      <div class="col-sm-3">
        <input type="text" class="form-control" v-model="search.id" placeholder="Voycare ID">
      </div>
      <div class="col-sm-3">
        <date-picker
          style="width: 100%;"
          v-model="search.from"
          value-type="timestamp"
          placeholder="From"
        ></date-picker>
      </div>
      <div class="col-sm-3">
        <date-picker
          style="width: 100%;"
          v-model="search.to"
          value-type="timestamp"
          placeholder="To"
        ></date-picker>
      </div>
      <div class="col-sm-3">
        <button class="btn btn-pink btn-block btn-rounded" @click="getPayments">Search</button>
      </div>
    </div>

    <div class="row mt-2">
      <div class="col-sm-9">
        <b-form-select size="sm" class="" v-model="pageLimit" style="width: 60px;"
            :options="limitOptions" @change="limitChange"></b-form-select>
      </div>
      <div class="col-sm-3 text-right">
        <router-link to="/payments-add" class="btn btn-dark btn-block btn-rounded">Create Invoice</router-link>
      </div>
    </div>

    <div class="row mt-2">
      <div class="col-md-12">
        <div class="table-responsive">
          <table class="m-t-25 table table-striped custom-table">
            <thead>
            <tr>
              <th>Invoice No.</th>
              <th>Order Date</th>
              <th>Client</th>
              <th>Clinic</th>
              <th>Amount</th>
              <th>Status</th>
              <th></th>
            </tr>
            </thead>
            <tbody>
            <tr :key="payment.id" v-for="payment in payments">
              <td>
                <router-link :to="'/payments/' + payment.id">
                  <span class="text-blue desc-12">{{ payment.id | convertInvoiceID }}</span>
                </router-link>
              </td>
              <td>{{ payment.created_at | convertTimeSecondToDate }}</td>
              <td>{{ payment.client.name }}</td>
              <td>{{ payment.clinic.name }}</td>
              <td>{{ payment.paid_amount }}</td>
              <td>
                <p :class="Const.STATUS.intToPaymentStatus(payment.status)" class="alert appt--status">
                  {{Const.STATUS.paymentStatusString( payment.status )}}
                </p>
              </td>
              <td>
                <router-link :to="'/payments/' + payment.id">
                  <i class="fa fa-pencil"></i> Edit
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
                  @pageData="getPayments"></Pagination>
    </div>
  </div>
</template>

<script>
  import rf from "../api/RequestFactory"
  import Pagination from "../common/Pagination"
  import Const from "./../utils/const"
  import DatePicker from "vue2-datepicker"

  export default {
    components: {
      Pagination, DatePicker
    },
    props: ['is_client'],
    data() {
      return {
        Const,
        payments: [],
        page: null,
        sort_created: 'desc',
        current_page: 0,
        total_page: 0,
        id: null,
        search: {
          id: null,
          from: null,
          to: null
        },
        limitOptions: Const.PAGE_LIMIT_OPTIONS,
        pageLimit: 10
      }
    },
    mounted() {
      let self = this
      self.getPayments(self.current_page)
    },
    methods: {
      getPayments(page) {
        let self = this
        self.current_page = page;
        let params = {
          page: page,
          limit: this.pageLimit,
          sort_created: self.sort_created,
          id: self.search.id,
          from: self.search.from,
          to: self.search.to
        }
        if (self.is_client) {
          params.type = 'client'
        } else {
          params.type = 'clinic'
        }

        rf.getRequest('AdminRequest').getPayments(params).then((res) => {
          this.payments = res.data.datas;
          this.total_page = res.data.total_page;
        });
      },
      limitChange(value){
        this.current_page = 1
        this.getPayments(1)
      }
    }
  }
</script>
