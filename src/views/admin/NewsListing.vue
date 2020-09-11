<template>
  <div>
    <div class="row">
      <div class="col-sm-6">
        <span class="title title-22">News</span>
      </div>
      <div class="col-sm-6 text-right">
        <router-link class="btn btn-round btn-primary btn-pink" to="/news-add">
          <i class="fa fa-plus mr-2"></i>Add Post
        </router-link>
      </div>
    </div>

    <div class="list-content">
      <div class="form-inline mb-3">
          <button @click="show_popover_filter = !show_popover_filter" class="btn btn-white btn-filter"
                  id="btn__popover_filter" style="height: 31px;">
                  <span class="fa fa-filter"></span>
          </button>
          <b-form-select size="sm" class="ml-2" v-model="limit" :options="limitOptions"
            @change="limitChange"></b-form-select>
        </div>
    </div>

    <b-popover :show.sync="show_popover_filter" placement="bottomright" target="btn__popover_filter">
      <div class="row">
        <div class="col-sm-12">
          <div class="form-group">
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-6">
        </div>
        <div class="col-sm-6">
        </div>
      </div>
    </b-popover>


    <div class="list-content">
      <div class="table-responsive">
        <table class="table table-striped custom-table table--appt">
          <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Tags</th>
            <th>Publish Date</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in news" :key="item.id">
            <td>{{ item.title }}</td>
            <td>{{ item.author ? item.author.name : '' }}</td>
            <td>{{ item.tags }}</td>
            <td v-if="item.status">{{ item.publish_date | convertTimeSecondToDate }}</td>
            <td v-else>Draft</td>
            <td style="position:relative">
              <div class="dropdown profile-action">
                <a aria-expanded="false" class="action-icon dropdown-toggle" data-toggle="dropdown"
                   href="#"><i
                    class="fa fa-ellipsis-v"></i></a>
                <div class="dropdown-menu dropdown-menu-right">
                  <router-link class="dropdown-item" :to="'/news/' + item.id + '/edit'">
                    <i class="fa fa-pencil m-r-5"></i><span>Edit</span>
                  </router-link>
                  <a @click="onRemove(item.id)" class="dropdown-item" data-target="#delete_doctor"
                     data-toggle="modal" href="javascript:void(0)"><i class="fa fa-trash-o m-r-5"></i>
                    Delete</a>
                </div>
              </div>
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
  import Pagination from "../../common/Pagination"
  import rf from "../../api/RequestFactory"
  import Const from '../../utils/const'

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
        news: [],
        limit: 10,
        limitOptions: Const.PAGE_LIMIT_OPTIONS
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

        rf.getRequest('AdminRequest').getNews(params).then(res => {
          self.news = res.data.datas
          self.total_page = res.data.total_page
          self.current_page = page
        })
      },
      onRemove(id) {
        let self = this
        var r = confirm("Are you want to remove this post?");
        if (!r)
          return

        rf.getRequest('AdminRequest').postNewsDelete(id).then(res => {
          self.getListing(1)
        })
      },
      limitChange(value){
        this.current_page = 1
        let params = {
          page: this.current_page,
          sort_created: this.sort_created,
          limit: value
        }
        rf.getRequest('AdminRequest').getNews(params).then(res => {
          this.news = res.data.datas
          this.total_page = res.data.total_page
        })
      }
    }
  }
</script>
<style>
</style>
