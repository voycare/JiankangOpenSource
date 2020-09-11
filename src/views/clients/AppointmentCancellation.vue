<template>
  <div>
    <div class="row">
      <div class="col-sm-12">
        <router-link :to="'/appointments/' + id"><h4 class="page-title"><i class="fa fa-arrow-left mr-3"></i>Back
        </h4></router-link>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-8">
        <div class="card">
          <div class="card-body">
            <h2 class="title-18 mt-3 mb-3">Cancellation Request</h2>

            <div class="desc-15">
              We apologize for any inconvenience we may have caused you. Voycare is committed to delivering
              best in class customer service in order to create a satisfactory user experience for all
              users. Before we start processing your refund, please help us answer a few questions so we
              can help improve the Voycare platform.
            </div>

            <div class="form-group">
              <div class="desc-15">1. Why are you cancelling your appointment?</div>
              <ul>
                <li v-for="why in why_cancels" :key="why.id">
                  <input :id="'chk__' + why.id" type="radio" v-model="why_cancel" :value="why.id">
                  <label :for="'chk__' + why.id">{{ why.name }}</label>
                  <input v-if="why.id == 5" class="form-control"
                         placeholder="Please type in your reasons to cancel the appointment"
                         type="text"
                         v-model="note">
                </li>
              </ul>
            </div>

            <div class="form-group">
              <div class="desc-15">2. Were you provided with rescheduling options by health provider for
                your appointment?
              </div>
              <ul>
                <li>
                  <input id="chk__6" type="radio" v-model="provide_options" value="1">
                  <label for="chk__6">Yes</label>
                </li>
                <li>
                  <input id="chk__7" type="radio" v-model="provide_options" value="0">
                  <label for="chk__7">No</label>
                </li>
              </ul>
            </div>

            <div class="form-group">
              <div class="desc-15">3. Would you consider using Voycare again for your health care needs?
              </div>
              <ul>
                <li>
                  <input id="chk__8" type="radio" v-model="use_again" value="1">
                  <label for="chk__8">Yes</label>
                </li>
                <li>
                  <input id="chk__9" type="radio" v-model="use_again" value="0">
                  <label for="chk__9">No</label>
                </li>
              </ul>
            </div>

            <div class="text-center mb-5">
              <button :disabled="! why_cancel || ! provide_options || ! use_again"
                      @click="onSubmit()"
                      class="btn btn-lg btn-rounded btn-primary btn-pink">Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import rf from "../../api/RequestFactory";

  export default {
    data() {
      return {
        id: 0,
        why_cancel: null,
        note: null,
        provide_options: null,
        use_again: null,
        why_cancels: [
          {id: 1, name: 'Time conflict'},
          {id: 2, name: 'Too expensive'},
          {id: 3, name: 'Emergency'},
          {id: 4, name: "Don't need service"},
          {id: 5, name: 'Other'},
        ]
      }
    },
    mounted() {
      let self = this

      self.id = self.$route.params.id
    },
    methods: {
      onSubmit() {
        let self = this
        if (!self.why_cancel || !self.provide_options || !self.use_again) {
          return
        }

        let params = {
          why_cancel: self.why_cancel,
          note: self.note,
          provide_options: self.provide_options,
          use_again: self.use_again
        }

        rf.getRequest('UserRequest').postAppointmentCancellation(self.id, params).then((res) => {
        })
      }
    }
  }
</script>
