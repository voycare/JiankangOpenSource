<template>
  <div >
    <div class="row">
      <div class="col-sm-6">
        <p class="title title-22">Subscribers</p>
      </div>
    </div>


    <div class="list-content">
      <div class="table-responsive">
        <table class="table table-striped custom-table table--appt">
          <thead>
          <tr>
            <th>Email</th>
            <th>Created</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in items" :key="item.id">
            <td>{{ item.email }}</td>
            <td>{{ item.created | convertTimeSecondToDate }}</td>
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

  export default {
    components: {
      Pagination,
    },
    data() {
      return {
        show_popover_filter: false,
        current_page: 1,
        sort_created: 'desc',
        total_page: 1,
        items: [],
        limit: 10,
        limitOptions: [
          {value: 10, text: 10},
          {value: 20, text: 20},
          {value: 50, text: 50}
        ]
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
          sort_created: this.sort_created,
          limit: this.limit
        };

        rf.getRequest('AdminRequest').getSubscribers(params).then(res => {
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
