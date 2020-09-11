<template>
  <div>
    <p class="title title-22">Statements</p>

    <div class="row list-content">
      <div class="col-md-12">
        <div class="table-responsive">
          <table class="table table-striped custom-table table--appt">
            <thead>
            <tr>
              <th>No.</th>
              <th @click="orderCreated" class="date"><span class="title-date">Statement No.</span><img
                  class="img-down"
                  src="/assets/img/icon_down.png"><img
                  src="/assets/img/icon_up.png"></th>
              <th>Period</th>
              <th>Status</th>
            </tr>
            </thead>
            <tbody>
            <tr :key="item.id" v-for="item in statements">
              <td>
                <span class="text-blue desc-12">{{ item.id | convertAppointmentID }}</span>
              </td>
              <td>{{ item.sale_period|convertTimeSecondToDate }}</td>
              <td>
                <p :class="Const.STATUS.intToStatusClass(appt.status)" class="alert appt--status">
                  {{Const.STATUS.intToString( appt.status )}}
                </p>
              </td>
            </tr>
            </tbody>
          </table>
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
  import {mapGetters} from 'vuex'

  import Const from "./../../utils/const"
  import rf from "../../api/RequestFactory"
  import Pagination from "../../common/Pagination"

  export default {
    name: "ClinicStatements",
    components: {
      Pagination,
    },
    data() {
      return {
        Const,
        country: '',
        statements: [],
        current_page: 1,
        sort_created: 'desc',
        name: '',
        total_page: 1,
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
    methods: {
      getListing(page) {
        let self = this
        self.current_page = page;
        let params = {
          page: page,
          sort_created: this.sort_created,
          country: this.country
        };
        rf.getRequest('ClinicRequest').getStatements(params).then((res) => {
          this.statements = res.data.datas;
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

    mounted() {
      let self = this

      self.$store.dispatch('getCountries');
      self.getListing(self.current_page);
    }
  }
</script>
