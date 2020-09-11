<template>
  <div>
    <p class="title title-22 title-color">
      Payments <i class="fa fa-arrow-right" aria-hidden="true"></i> Clinic Statement
    </p>

    <div class="row">
      <div class="col-sm-3">
        <input type="text" class="form-control" v-model="search.id" placeholder="Clinic">
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
        <button class="btn btn-pink btn-block btn-rounded" @click="getListing">Search</button>
      </div>
    </div>

    <div class="row">
      <div class="col-sm-9">
        <b-form-select size="sm" class="" v-model="pageLimit" style="width: 60px;"
            :options="limitOptions" @change="limitChange"></b-form-select>
      </div>
      <div class="col-sm-3 text-right">
        <router-link to="/statements-add" class="btn btn-dark btn-block btn-rounded">
          Create Statement</router-link>
      </div>
    </div>

    <div class="mt-2">
      <div class="row">
        <div class="col-md-12">
          <div class="table-responsive">
            <table class="m-t-25 table table-striped custom-table">
              <thead>
              <tr>
                <th>Statement No.</th>
                <th>Clinic</th>
                <th>Period</th>
                <th>Amount</th>
                <th>Status</th>
                <th></th>
              </tr>
              </thead>
              <tbody>
              <tr :key="statement.id" v-for="statement in statements">
                <td>
                  <router-link :to="'/statements/' + statement.id">
                    <span class="text-blue desc-12">{{ statement.id | convertHeraID }}</span>
                  </router-link>
                </td>
                <td>{{ statement.to.name }}</td>
                <td>{{ statement.sale_period | convertTimeSecondToDate }}</td>
                <td>{{ statement.net }}</td>
                <td>
                  <p :class="Const.STATUS.intToPaymentStatus(statement.status)" class="alert appt--status">
                    {{Const.STATUS.paymentStatusString( statement.status )}}
                  </p>
                </td>
                <td>
                  <router-link :to="'/statements/' + statement.id">
                    <i class="fa fa-pencil"></i> Edit
                  </router-link>
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
                  @pageData="getListing"></Pagination>
    </div>
  </div>
</template>

<script>
  import Const from "./../../utils/const"
  import rf from "../../api/RequestFactory"
  import Pagination from "../../common/Pagination"
  import DatePicker from "vue2-datepicker";

  export default {
    components: {
      Pagination, DatePicker
    },
    props: ['is_client'],
    data() {
      return {
        Const,
        statements: [],
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
      self.getListing(self.current_page)
    },
    methods: {
      getListing(page) {
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

        rf.getRequest('AdminRequest').getStatements(params).then((res) => {
          this.statements = res.data.datas;
          this.total_page = res.data.total_page;
        });
      },
      limitChange(){
        this.current_page = 1
        this.getListing(1)
      }
    }
  }
</script>

<style></style>
