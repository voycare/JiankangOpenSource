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
            <th>No.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Message</th>
            <th>Created</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in items" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{item.first_name}} {{item.last_name}}</td>
            <td>{{item.email}}</td>
            <td>{{item.phone}}</td>
            <td>{{item.message}}</td>
            <td>{{item.created_at}}</td>
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

        rf.getRequest('AdminRequest').getFeedbacks(params).then(res => {
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
