<template>
  <div id="translator_page">
    <div class="row">
      <div class="col-sm-6">
        <p class="title title-22">Translators</p>
      </div>
      <div class="col-sm-6 text-right">
        <router-link class="btn btn-danger btn-primary btn-pink" to="/translator-add">
          <i class="fa fa-plus mr-2"></i>Add Translator
        </router-link>
      </div>
    </div>

    <div class="row">
      <div class="col-sm-12 form-inline">
        <button @click="show_popover_filter = !show_popover_filter" class="btn btn-white btn-filter mr-2" id="btn__popover_filter">
          <span class="fa fa-filter"></span>
        </button>
        <b-form-select size="sm" class="mr-4 page-limit-select" v-model="pageLimit" :options="pageLimitOptions"
            @change="limitChange"> </b-form-select>
      </div>
    </div>

    <div class="list-content">
      <div class="table-responsive">
        <table class="table table-striped custom-table table--appt">
          <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="translator in translators" :key="translator.id">
            <td>{{ translator.name }}</td>
            <td>{{ translator.phone }}</td>
            <td>{{ translator.email }}</td>
            <td style="position:relative">
              <div class="dropdown profile-action">
                <a aria-expanded="false" class="action-icon dropdown-toggle" data-toggle="dropdown"
                   href="#"><i
                    class="fa fa-ellipsis-v"></i></a>
                <div class="dropdown-menu dropdown-menu-right">
                  <router-link class="dropdown-item" :to="'/translators/' + translator.id">
                    <i class="fa fa-pencil m-r-5"></i><span>Edit</span>
                  </router-link>
                  <a @click="onRemove(translator.id)" class="dropdown-item" data-target="#delete_doctor"
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
        translators: [],
        pageLimit: 10,
        pageLimitOptions: Const.PAGE_LIMIT_OPTIONS
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
          limit: this.pageLimit
        };

        rf.getRequest('AdminRequest').getTranslators(params).then(res => {
          self.translators = res.data.datas
          self.total_page = res.data.total_page
          self.current_page = page
        })
      },
      onRemove(id) {
        let self = this
        var r = confirm("Are you want to remove this translator?");
        if (!r)
          return

        rf.getRequest('AdminRequest').postTranslatorRemove(id).then(res => {
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
  #translator_page .btn-danger {
    width: 139px;
    height: 30px;
    background: #EB6271;
    border-radius: 100px;
    font-family: Poppins;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 18px;
  }

  .limit-page {
    height: 27px;
    font-size: 10px;
    border: 1px solid #CBCBCB;
  }
</style>
