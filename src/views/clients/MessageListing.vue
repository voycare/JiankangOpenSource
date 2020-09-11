<template>
  <div >
    <p class="title title-22 title-color ">Messages</p>

    <div class="list-content">
      <div class="row">
        <div class="col-md-12 m-t-25">
          <div class="card">
            <div class="card-body">
              <div class="row">
                <div class="col-sm-6">
                  <ul class="list-unstyled list--actions">
                    <li>
                      <a @click="getMessages" href="#">
                        <img src="/assets/img/icon-refresh.svg">
                      </a>
                    </li>
                    <li>
                      <a @click="onMarkReads" href="#">
                        <img src="/assets/img/icon-mail-box.svg">
                        <span>Mark as Read</span>
                      </a>
                    </li>
                    <li>
                      <a @click="onMarkUnreads" href="#">
                        <img src="/assets/img/icon-mail-box-o.svg">
                        <span>Mark as Unread</span>
                      </a>
                    </li>
                    <li>
                      <a @click="onDeletes" href="#">
                        <img src="/assets/img/icon-trash.svg">
                      </a>
                    </li>
                  </ul>
                </div>
                <div class="col-sm-6">
                  <input class="hera-control" placeholder="Search" type="text" v-model="key">
                </div>
              </div>

              <MessageList :messages="messages"></MessageList>
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
        key: ''
      }
    },
    mounted() {
      let self = this
      self.getMessages(self.current_page);
    },
    methods: {
      getMessages(page) {
        let self = this
        self.current_page = page;
        let params = {
          page: page,
          sort_created: self.sort_created,
          key: self.key
        }

        rf.getRequest('UserRequest').getMessages(params).then((res) => {
          this.messages = res.data.datas;
          this.total_page = res.data.total_page;
        });
      },

      onMarkReads() {
        let self = this
        let params = {
          message_ids: self.selectedIds
        }

        rf.getRequest('UserRequest').postMarkReads(params).then((res) => {
          self.getMessages()
        });
      },

      onMarkUnreads() {
        let self = this
        let params = {
          message_ids: self.selectedIds
        }

        rf.getRequest('UserRequest').postMarkUnReads(params).then((res) => {
          self.getMessages()
        });
      },

      onDeletes() {
        let self = this
        let params = {
          message_ids: self.selectedIds
        }

        rf.getRequest('UserRequest').postMessageDeletes(params).then((res) => {
          self.getMessages()
        });
      }
    }
  }
</script>
