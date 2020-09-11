<template>
  <div >
    <div class="row">
      <div class="col-sm-6">
        <p class="title title-22">Clients</p>
      </div>
      <div class="col-sm-6 text-right">
        <router-link class="btn btn-round btn-pink" to="/client-add">
          <i class="fa fa-plus mr-2"></i>Add Client
        </router-link>
      </div>
    </div>

    <div class="row">
      <div class="col-sm-12 form-inline mb-1">
        <button @click="show_popover_filter = !show_popover_filter" class="btn btn-white btn-filter mr-2"
                id="btn__popover_filter"><span class="fa fa-filter"></span></button>
        <b-form-select size="sm" class="mr-4 page-limit-select" v-model="pageLimit" :options="pageLimitOptions"
            @change="limitChange"> </b-form-select>
      </div>
    </div>

    <b-popover :show.sync="show_popover_filter" class="top filter_appt" placement="bottomright"
               target="btn__popover_filter">
      <div class="form-group">
        <div class="input-group mb-3">
          <input class="form-control" placeholder="Voycare ID" v-model="filter.client_id">
          <div class="input-group-append">
            <span class="input-group-text"><i class="fa fa-search"></i></span>
          </div>
        </div>
      </div>
      <div class="form-group">
        <select class="form-control country_select" v-model="filter.country">
          <option :key="country.id" :value="country.name" v-for="country in countries">{{ country.name}}</option>
        </select>
      </div>
      <div class="m-b-15" style="text-align: center">
        <button class="btn-apply btn btn-pink" @click="getListing(0)">Apply</button>
      </div>
    </b-popover>

    <div class="list-content">
      <div class="table-responsive">
        <table class="table table-striped custom-table table--appt">
          <thead>
          <tr>
            <th>Voycare ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Location</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="client in clients" :key="client.id">
            <td>
              <router-link :to="'/clients/' + client.id">{{ client.id | convertID }}</router-link>
            </td>
            <td>{{ client.name }}</td>
            <td>{{ client.age }}</td>
            <td>{{ client.gender | genderName }}</td>
            <td>{{ client.phone }}</td>
            <td>{{ client.email }}</td>
            <td>{{ client.address.street_line_1 }}</td>
            <td style="position:relative">
              <div class="dropdown profile-action">
                <a aria-expanded="false" class="action-icon dropdown-toggle" data-toggle="dropdown"
                   href="#"><i
                    class="fa fa-ellipsis-v"></i></a>
                <div class="dropdown-menu dropdown-menu-right">
                  <router-link class="dropdown-item" :to="'/clients/' + client.id + '/edit'">
                    <i class="fa fa-pencil m-r-5"></i><span>Edit</span>
                  </router-link>
                  <a @click="onRemove(client.id)" class="dropdown-item" data-target="#delete_doctor"
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
  import {mapGetters} from 'vuex'
  import Pagination from "../../common/Pagination"
  import rf from "../../api/RequestFactory"
  import Const from '../../utils/const'

  export default {
    components: {
      Pagination,
    },
    computed: {
      ...mapGetters(['countries'])
    },
    data() {
      return {
        show_popover_filter: false,
        current_page: 1,
        sort_created: 'desc',
        total_page: 1,
        clients: [],
        pageLimit: 10,
        filter: {
          client_id: '',
          country: ''
        },
        pageLimitOptions: Const.PAGE_LIMIT_OPTIONS
      }
    },
    mounted() {
      let self = this
      this.$store.dispatch('getCountries');
      self.getListing(self.current_page)
    },
    methods: {
      getListing(page) {
        let self = this
        let params = {
          limit: this.pageLimit,
          page: page,
          sort_created: this.sort_created
        }
        if (self.filter.client_id) {
          params.client_id = self.filter.client_id
        }
        if (self.filter.country) {
          params.country = self.filter.country
        }

        rf.getRequest('AdminRequest').getClients(params).then(res => {
          self.clients = res.data.datas
          self.total_page = res.data.total_page
          self.current_page = page
        })
      },
      onRemove(id) {
        let self = this
        var r = confirm("Are you want to remove this clinic?");
        if (!r)
          return

        rf.getRequest('AdminRequest').postClientRemove(id).then(res => {
          self.getListing(1)
        })
      },
      limitChange(){
        this.current_page = 1
        this.getListing(1)
      }
    }
  }
</script>
<style>
</style>
