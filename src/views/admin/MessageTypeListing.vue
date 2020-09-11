<template>
  <div>
    <p class="title title-22 title-color ">{{pageTitle}}</p>

    <div class="list-content">
      <div class="row">
        <div class="col-md-12 m-t-25">
          <div class="card">
            <div class="card-body">
              <div class="row">
                <div class="col-sm-6">
                  <ul class="list-unstyled list--actions">
                    <li v-if="isTypeSent">
                      <a @click="getMessages" href="#">
                        <img src="/assets/img/icon-refresh.svg">
                      </a>
                    </li>
                    <li v-if="isTypeDraft">
                      <a @click="onDeletes" href="#">
                        <img src="/assets/img/icon-trash.svg"> Delete
                      </a>
                    </li>
                    <li v-if="!isTypeDraft">
                      <a @click="onEmptyFolder" href="#">
                        <img src="/assets/img/icon-trash.svg">
                        <span>Empty Folder</span>
                      </a>
                    </li>
                  </ul>
                </div>
                <div class="col-sm-6">
                  <input class="form-control" placeholder="Search" type="text" v-model="key">
                </div>
              </div>

              <MessageList
                  :show_from="false"
                  :show_to="true"
                  :messages="messages"></MessageList>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="page">
      <Pagination :current-page="current_page" :total-page="total_page"
                  @pageData="getMessages"></Pagination>
    </div>
  </div>
</template>

<script>
  import rf from "../../api/RequestFactory"
  import Pagination from "../../common/Pagination"
  import MessageList from '../../components/MessageList'

  export default {
    components: {
      Pagination,
      MessageList
    },
    data() {
      return {
        messages: [],
        page: null,
        sort_created: 'desc',
        current_page: 0,
        total_page: 0,
        key: '',
      }
    },
    computed: {
      pageTitle(){
        switch (this.type) {
          case 'draft':
            return 'Draft'
          case 'trash':
            return 'Trash'
          default:
            return 'Sent'
        }
      },
      isTypeDraft(){
        return this.type === 'draft'
      },
      isTypeTrash(){
        return this.type === 'trash'
      },
      isTypeSent(){
        return this.type === 'sent'
      },
      type(){
        return this.$route.params.type
      }

    },
    mounted() {
    },
    watch:{
      type:{
        immediate: true,
        handler(){
          this.getMessages(this.current_page)
        }
      }
    },
    methods: {
      getMessages(page) {
        let self = this
        self.current_page = page;
        let params = {
          page: page,
          sort_created: self.sort_created,
          key: self.key,
          type: self.type
        }

        rf.getRequest('AdminRequest').getMessages(params).then((res) => {
          self.messages = res.data.datas;
          self.total_page = res.data.total_page;
          self.current_page = page
        });
      },

      onDeletes() {
        let self = this
        let params = {
          ids: self.selectedIds
        }

        rf.getRequest('AdminRequest').postMessageDeletes(params).then((res) => {
          self.getMessages(self.current_page)
        });
      },

      onEmptyFolder() {
        let self = this

        rf.getRequest('AdminRequest').postMessagesDeleteAll().then(res => {
          self.getMessages(0)
        })
      }
    }
  }
</script>

<style>
  .list--actions li {
    display: inline;
    color: #EB6271;
    margin-right: 40px;
    line-height: 40px;
  }

  .list--actions li a {
    color: #EB6271;
  }

  .list--actions img {
    position: relative;
    top: -2px;
    margin-right: 10px;
  }
</style>
