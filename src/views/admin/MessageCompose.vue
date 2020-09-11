<template>
  <div class="" id="clinic_profile">
    <div>
      <div class="row">
        <div class="col-6">
          <p class="title title-22">Compose</p>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-9">
          <div class="card">
            <div class="card-body">
              <div class="form-group">
                <input type="text" class="form-control" v-model="message.to_id" placeholder="To">
              </div>
              <div class="form-group">
                <input type="text" class="form-control" v-model="message.subject" placeholder="Subject">
              </div>
              <div class="form-group">
                <textarea v-model="message.content" class="form-control" cols="30" rows="10"
                  placeholder="Content" style="height: auto!important;"></textarea>
              </div>
              <div class="form-group mt-4">
                <b-button pill class="mr-4 px-4" variant="danger" @click="onSend">Send</b-button>
                <b-button pill class="px-4" variant="success" @click="onDraft">Draft</b-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  import Const from "./../../utils/const"
  import rf from "../../api/RequestFactory"

  export default {
    components: {},
    data() {
      return {
        message: {
          to_id: null,
          subject: null,
          content: null,
          is_draft: false
        }
      }
    },
    methods: {
      onSend() {
        let self = this
        rf.getRequest('AdminRequest').postSaveMessage(self.message).then(res => {
          return self.$router.push('/message/sent')
        })
      },
      onDraft() {
        let self = this
        self.message.is_draft = true
        rf.getRequest('AdminRequest').postSaveMessage(self.message).then(res => {
        })
      }
    }
  }
</script>
