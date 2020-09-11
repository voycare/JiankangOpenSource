<template>
  <div>
    <div class="row">
      <div class="col-sm-12 mb-4">
        <BackTo :to="'/appointment-cr'" :text="'Back to Cancellation Requests'" />
      </div>
    </div>
    <div class="row">
      <div class="col-md-9">
        <div class="card">
          <div class="card-body appt--wrapper" v-if="appt_cr">
            <div class="row appt--row">
              <div class="col-md-6">
                <div class="appt--item">
                  <label class="appt--label">Appt.No: </label>
                  <div class="appt--value">{{ appt_cr.id | convertAppointmentID }}</div>
                </div>

                <div class="appt--item text-red">
                  <label class="appt--label">Cancellation Date: </label>
                  <div class="appt--value">{{ appt_cr.appointment.created | convertTimeSecondToDate }}</div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="appt--item">
                  <label class="appt--label">Status: </label>
                  <div class="appt--value">
                    <div class="appt--status text-danger" v-if="appt_cr.appointment.status == 2 && appt_cr.status == 1">
                      Processing
                    </div>
                    <div class="appt--status text-success"
                         v-if="appt_cr.appointment.status == 2 && appt_cr.status == 2">
                      Refunded
                    </div>
                  </div>
                </div>

                <div class="appt--item text-red">
                  <label class="appt--label">Cancellation No: </label>
                  <div class="appt--value">{{ appt_cr.id }}</div>
                </div>
              </div>
            </div>

            <div class="row appt--row">
              <div class="col-md-6">
                <div class="appt--item">
                  <label class="appt--label">Document Translation: </label>
                  <div class="appt--value">{{ appt_cr.appointment.documents_count ? 'Yes' : 'No' }}</div>
                </div>
              </div>

              <div class="col--md-6">
                <div class="appt--item">
                  <label class="appt--label">Fees Collected: </label>
                  <div class="appt--value">$ {{ appt_cr.fee }}</div>
                </div>
              </div>
            </div>

            <div class="row appt--row">
              <div class="col-md-12">
                <div class="appt--item">
                  <label class="appt--label">Reason for cancellation: </label>
                  <div class="appt--value">{{ why_cancels.find(why => why.id == appt_cr.why_cancel).name }}</div>
                </div>

                <div class="appt--item">
                  <label class="appt--label">Rescheduling offered: </label>
                  <div class="appt--value">{{ appt_cr.use_again ? 'Yes' : 'No' }}</div>
                </div>
              </div>
            </div>

            <div class="row appt--row">
              <div class="col-md-12">
                <div class="appt--item">
                  <label class="appt--label">Payment Method: </label>
                  <div class="appt--value">{{ payment_methods.find(method => method.id == appt_cr.use_again).name }}</div>
                </div>

                <div class="appt--item">
                  <label class="appt--label">Refund Status: </label>
                  <div class="appt--value">
                    <div v-if="is_edit" class="card">
                      <div class="card-body form--pink">
                        <div class="form-group mb-4">
                          <label>Select Refund Status:</label>
                          <select class="form-control" v-model="appt_cr.status">
                            <option value="1">Processing</option>
                            <option value="2">Refunded</option>
                          </select>
                        </div>
                        <div class="form-group mb-4">
                          <label>CITCON refund confirmation No</label>
                          <input type="text" class="form-control" v-model="appt_cr.citcon_no">
                        </div>
                        <div class="form-group text-center">
                          <button class="btn btn-pink btn-round px-4" @click="onSaveStatus">Save</button>
                        </div>
                      </div>
                    </div>
                    <span>{{ status_ids.find(status => status.id == appt_cr.status).name }}</span>
                    <button @click="is_edit = ! is_edit" class="btn btn-link btn-edit"><i
                        class="fa fa-pencil"></i> Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div class="row appt--row no-border">
              <div class="col-md-12">
                <label style="color: #020644;" class="font-weight-500 font-15">Admin Note</label>
                <textarea v-if="is_edit_note" name="" id="" cols="30" rows="5" class="form-control" v-model="appt_cr.admin_note"></textarea>
                <p v-else>{{ appt_cr.admin_note }}</p>
                <button @click="is_edit_note = ! is_edit_note" class="btn btn-link btn-edit"><i
                    class="fa fa-pencil"></i> Edit
                </button>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12 text-center">
                <button class="btn btn-pink btn-round px-4" click="onSave">Save</button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import rf from "../../api/RequestFactory";
  import Const from "./../../utils/const"
  import BackTo from '../../components/BackTo'

  export default {
    components: {BackTo},
    data() {
      return {
        Const,
        appt_cr: null,
        id: null,
        is_edit: false,
        is_edit_note: false,
        payment_methods: [
          {id: 1, name: 'Alipay'}
        ],
        status_ids: [
          {id: 1, name: 'Processing'},
          {id: 2, name: 'Refunded'},
        ],
        why_cancels: [
          {id: 0, name: ' - '},
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
      self.id = parseInt(this.$route.params.id)

      self.getDetail()
    },
    methods: {
      getDetail() {
        let self = this

        rf.getRequest('AdminRequest').getAppointmentsCRDetail(self.id).then((res) => {
          self.appt_cr = res.data
        });
      },
      onSave() {
        let self = this
        let params = {
          admin_note: self.appt_cr.admin_note
        }

        rf.getRequest('AdminRequest').postAppointmentsCRDetail(self.id, params).then(res => {
          self.appt_cr = res.data
        })
      },
      onSaveStatus() {
        let self = this

        let params = {
          status: self.appt_cr.status,
          citcon_no: self.appt_cr.citcon_no
        }

        rf.getRequest('AdminRequest').postAppointmentsCRDetailRefund(self.id, params).then(res => {
          self.appt_cr = res.data
        })
      }
    }
  }
</script>
<style>
  .appt--row {
    border-bottom: 1px solid #CBCBCB;
    margin-bottom: 20px;
  }

  .appt--wrapper {
    padding: 42px;
    color: #020644;
  }

  .appt--label {
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    line-height: 22px;
    margin-right: 40px;
  }

  .appt--value {
    display: inline-block;
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    line-height: 22px;
  }

  .appt--item {
    margin-bottom: 20px;
  }

  .form--pink {
    background-color: #FDD3D1
  }
</style>
