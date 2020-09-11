<template>
  <div class="card--detail">
    <div class="card-body">
      <table class="table mb-0 border-0 appt--detail table-margin width-card" style="margin-top: 41px">
        <tbody>
        <tr>
          <td class="title-15 appt--labels">Appt. No:</td>
          <td class="title-15">{{ appt.id | convertAppointmentID }}</td>
          <td class="title-15 appt--labels">Status:</td>
          <td class="title-15">
            <span style="color: #EB6271;">
              {{ Const.STATUS.intToString( appt.status ) }}</span>
            <!--<button class="btn btn-sm btn-light btn-rounded border-secondary ml-5 px-3"-->
              <!--style="font-size: 9px;">View</button>-->
          </td>
        </tr>
        <tr v-if="isAdmin">
          <td class="title-15 appt--labels">Order Date:</td>
          <td class="title-15">{{ appt.created_at }}</td>
          <td class="title-15 appt--labels">Type:</td>
          <td class="title-15">{{ appt_types[appt.type_id] }}</td>
        </tr>
        <tr v-if="isAdmin || isClinic || isClient">
          <td class="title-15 appt--labels pb-20">Appt. Date:</td>
          <td class="title-15">{{ appt.date|convertTimeSecondToDate }}</td>
          <td class="title-15 appt--labels">Appt. Time:</td>
          <td class="title-15">{{ appt.date|convertTimeHHmmZ }}</td>
        </tr>
        <tr v-if="isClinic">
          <td class="title-15 appt--labels">Name:</td>
          <td class="title-15">{{ appt.client ? appt.client.name : '' }}</td>
          <td class="title-15 appt--labels">Age:</td>
          <td class="title-15">{{ appt.client.age }}</td>
        </tr>
        <tr v-if="isClinic">
          <td class="title-15 appt--labels pb-20">Gender:</td>
          <td class="title-15">{{ appt.client.gender | genderName }}</td>
          <td class="title-15 appt--labels pb-20">Country:</td>
          <td class="title-15">{{ appt.client.address.country }}</td>
        </tr>
        <tr v-if="isAdmin || isClient">
          <td class="title-15 appt--labels pb-20">Specialty:</td>
          <td class="title-15 pb-20">{{ appt_specialty[appt.specialty_id] }}</td>
          <td class="title-15 appt--labels pb-20">Treatment:</td>
          <td class="title-15 pb-20">{{ appt_treatments[appt.treatment_id] }}</td>
        </tr>
        <tr v-if="isClient">
          <td class="title-15 appt--labels">Clinic:</td>
          <td class="title-15">Clinic {{ appt.clinic ? appt.clinic.name : '' }}</td>
          <td class="title-15 appt--labels">Country:</td>
          <td class="title-15">{{ appt.clinic.address.country }}</td>
        </tr>
        <tr v-if="isClient">
          <td class="title-15 appt--labels pb-20">Type:</td>
          <td class="title-15 pb-20">{{ appt_types[appt.type_id] }}</td>
        </tr>
        <tr v-if="isAdmin">
          <td class="title-15 appt--labels border-top pt-20">Clinic:</td>
          <td class="title-15 border-top pt-20">{{ appt.clinic ? appt.clinic.name : '' }}</td>
          <td class="title-15 appt--labels border-top pt-20">Country:</td>
          <td class="title-15 border-top pt-20">{{ appt.clinic.address.country }}</td>
        </tr>
        <tr v-if="isAdmin">
          <td class="title-15 appt--labels border-bottom pb-20">Email:</td>
          <td class="title-15 border-bottom pb-20">{{ appt.clinic.email }}</td>
          <td class="title-15 appt--labels border-bottom pb-20">Phone:</td>
          <td class="title-15 border-bottom pb-20">{{ appt.clinic.phone }}</td>
        </tr>
        <tr v-if="isAdmin">
          <td class="title-15 appt--labels border-top pt-20">Client:</td>
          <td class="title-15 border-top pt-20">{{ appt.client ? appt.client.name : '' }}</td>
          <td class="title-15 appt--labels border-top pt-20">Country:</td>
          <td class="title-15 border-top pt-20">{{ appt.client.address.country }}</td>
        </tr>
        <tr v-if="isAdmin">
          <td class="title-15 appt--labels">Gender:</td>
          <td class="title-15">{{ appt.client.gender | genderName }}</td>
          <td class="title-15 appt--labels">Age:</td>
          <td class="title-15">{{ appt.client.age }}</td>
        </tr>
        <tr v-if="isAdmin">
          <td class="title-15 appt--labels border-bottom pb-20">Email:</td>
          <td class="title-15 border-bottom pb-20">{{ appt.client.email }}</td>
          <td class="title-15 appt--labels border-bottom pb-20">Phone:</td>
          <td class="title-15 border-bottom pb-20">{{ appt.client.phone }}</td>
        </tr>
        <!-- <tr v-if="isAdmin">
          <td class="title-15 appt--labels pt-20 pb-20">Type:</td>
          <td class="title-15 pt-20 pb-20">{{ appt_types[appt.type] }}</td>
        </tr> -->
        <tr>
          <td class="title-15 appt--labels border-top pt-20">Interpreter:
            <div></div>
          </td>
          <td class="title-15 border-top pt-20">
            <div v-if="is_edit_interpreter">
              <select class="form-control" v-model="interpreter_id">
                <option :key="interpreter.id" :selected="appt.interpreter_id == interpreter_id"
                        :value="interpreter.id"
                        v-for="interpreter in interpreters">{{ interpreter ? interpreter.name : '' }}
                </option>
              </select>
            </div>
            <div v-else>
              <span>{{ appt.interpreter ? appt.interpreter.name : '' }}</span>
            </div>
          </td>
          <td class="title-15 appt--labels border-top pt-20 pb-20">
            Language:
          </td>
          <td class="title-15 border-top pt-20 itp-edit">
            <div v-if="appt.interpreter">
              <span>{{ appt_languages[appt.interpreter.language] }}</span>
            </div>
            <div v-else>
              <span>-</span>
            </div>
            <button v-if="isAdmin" @click="is_edit_interpreter = ! is_edit_interpreter" class="btn btn-link btn-edit"><i
                class="fa fa-pencil"></i> Edit
            </button>
          </td>
        </tr>
        <tr v-if="isClinic">
          <td class="title-15 appt--labels pb-20">Specialty:</td>
          <td class="title-15 pb-20">{{ appt_specialty[appt.specialty_id] }}</td>
          <td class="title-15 appt--labels pb-20">Treatment:</td>
          <td class="title-15 pb-20">{{ appt_treatments[appt.treatment_id] }}</td>
        </tr>
        <tr v-if="isAdmin && is_edit_interpreter">
          <td class="text-center" colspan="2">
            <button @click="onSaveInterpreter" class="btn btn-pink">Save</button>
          </td>
        </tr>
        <tr v-if="isAdmin">
          <td class="title-15 appt--labels border-bottom pb-20">Name:</td>
          <td class="title-15 pb-20 border-bottom">
            <span v-if="appt.interpreter">{{ appt.interpreter.name }}</span>
            <span v-else>-</span>
          </td>
          <td class="title-15 appt--labels border-bottom pb-20">Phone:</td>
          <td class="title-15 border-bottom pb-20">
            <span v-if="appt.interpreter">{{ appt.interpreter.phone }}</span>
            <span v-else>-</span>
          </td>
        </tr>
        <tr v-if="documents.length">
          <td class="title-15 border-top pt-20 pb-20" colspan="4">
            <span class="appt--labels">Supporting Documents:</span>
            <ul class="list-unstyled">
              <li :key="document.id" v-for="document in documents" v-if="document && document.type == 'support'">
                <a class="document--item" :href="document.full_path" download>{{ document.name }}</a>
              </li>
            </ul>
          </td>
        </tr>
        <tr v-if="isAdmin">
          <td class="title-15 pb-20" colspan="4">
            <span class="appt--labels">Supporting Documents Translating:</span>
            <span style="color:#EB6271; padding-left:30px">Requested</span>
          </td>
        </tr>
        </tbody>
      </table>

      <div class="border-bottom pb-20">
        <div v-if="isAdmin">
          <div class="title-15 pt-20 pb-20 atd-box">
            <a @click="onAddDocumentClick" href="javascript:void(0)">Add translated documents</a>
            <input id="file__upload" ref="document" style="display: none" type="file"
                   v-on:change="onUploadDocument">

            <ul v-if="documents.length" class="pl-0 pt-20">
              <li :key="document.id" v-for="document in documents" style="list-style-type:none; border-bottom:0.5px solid #979797" class="list-group-item">
                <div v-if="document.type == 'translate'">
                  <div>
                    <img src="/assets/img/attachment1.png" width="14.08px">
                    <span style="padding-left:5px" v-if="document">{{ document.name }}</span>
                  </div>
                  <div class="pull-right">
                    <a :href="document.full_path" class="dcm-view" download>View</a>
                    <a @click="onRemoveDocument(document.id)" href="javascript:void(0)" class="dcm-delete">Delete</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <table class="table border-0 appt--detail" v-if="appt && appt.note">
        <tbody>
        <tr>
          <td class="title-15 pt-20 additional-note" colspan="4">Additional Notes:
            <button v-if="isAdmin" @click="onEditNote" class="btn btn-link btn-editnote">
              <i class="fa fa-pencil"></i> Edit
            </button>
            <p class="desc-15" v-if="! is_edit_note">{{ appt.note }}</p>
            <div v-if="isAdmin && is_edit_note">
              <textarea class="form-control" cols="30" rows="5" v-model="note"></textarea>
              <div class="text-center">
                <button @click="onSaveNote" class="btn btn-primary btn-pink btn-rounded">Save</button>
              </div>
            </div>
          </td>
        </tr>

        <!--<tr>-->
          <!--<td class="title-15 appt&#45;&#45;labels border-bottom pt-20 pb-20">Payment Method:</td>-->
          <!--<td class="title-15 border-bottom pt-20 pb-20">Alipay</td>-->
          <!--<td class="title-15 appt&#45;&#45;labels border-bottom pt-20 pb-20">Transaction ID:</td>-->
          <!--<td class="title-15 border-bottom pt-20 pb-20">1001001000</td>-->
        <!--</tr>-->

        </tbody>
      </table>

      <table class="table border-0 appt--detail" style="margin-bottom:20px" v-if="appt && appt.note_admin">
        <tbody>
        <tr>
          <td class="title-15 pt-20 admin-note" colspan="4">Admin Notes:
            <button v-if="isAdmin" @click="onEditNoteAdmin" class="btn btn-link btn-editnote">
              <i class="fa fa-pencil"></i> Edit
            </button>
            <p class="desc-15" v-if="! is_edit_note_admin">{{ appt.note_admin }}</p>
            <div v-if="isAdmin && is_edit_note_admin">
              <textarea class="form-control" cols="30" rows="5" v-model="note"></textarea>
              <div class="text-center">
                <button @click="onSaveNoteAdmin" class="btn btn-primary btn-pink btn-rounded">Save</button>
              </div>
            </div>
          </td>
        </tr>
        </tbody>
      </table>

    </div>
  </div>
</template>

<script>
  import rf from "./../api/RequestFactory"
  import Const from "./../utils/const"
  import {mapGetters} from 'vuex'

  export default {
    props: {
      isClient: {
        type: Boolean,
        default: false
      },
      isAdmin: {
        type: Boolean,
        default: false
      },
      isClinic: {
        type: Boolean,
        default: false
      },
      appt: null
    },
    data() {
      return {
        Const,
        is_edit_note: false,
        is_edit_note_admin: false,
        is_edit_interpreter: false,
        note: '',
        document: null,
        documents: [],
        interpreters: [],
        interpreter_id: null
      }
    },
    computed: {
      ...mapGetters(['appt_specialty', 'appt_treatments', 'appt_types', 'appt_languages', 'appt_status'])
    },
    mounted() {
      let self = this
      self.note = self.appt.note

      self.$store.dispatch('getCountries')
      self.$store.dispatch('getAppointmentMetas')

      rf.getRequest('AdminRequest').getAppointmentInterpreters().then(res => {
        self.interpreters = res.data
      })

      self.onRefresh()
    },
    methods: {
      onRefresh() {
        let self = this

        rf.getRequest('AdminRequest').getAppointmentDocuments(self.appt.id).then(res => {
          self.documents = res.data
          self.$emit('onGetDocuments', self.documents)
        })
      },
      onAddDocumentClick() {
        let self = this

        if (!self.isAdmin) {
          return false
        }

        window.$('#file__upload').trigger('click')
      },
      onEditNote() {
        let self = this

        if (!self.isAdmin) {
          return false
        }

        self.is_edit_note = true
      },
      onEditNoteAdmin() {
        let self = this

        if (!self.isAdmin) {
          return false
        }

        self.is_edit_note_admin = true
      },
      onSaveNote() {
        let self = this

        if (!self.isAdmin) {
          return false
        }

        rf.getRequest('AdminRequest').postAppointmentNote(self.appt.id, {note: self.note}).then((res) => {
          self.is_edit_note = false

          self.onRefresh()
          self.$emit('onRefresh')
        })
      },
      onSaveNoteAdmin() {
        let self = this

        if (!self.isAdmin) {
          return false
        }

        rf.getRequest('AdminRequest').postAppointmentNoteAdmin(self.appt.id, {note_admin: self.note_admin}).then((res) => {
          self.is_edit_note_admin = false

          self.onRefresh()
          self.$emit('onRefresh')
        })
      },
      onSaveInterpreter() {
        let self = this

        if (!self.isAdmin) {
          return false
        }

        rf.getRequest('AdminRequest').postAppointmentInterpreter(self.appt.id, {interpreter_id: self.interpreter_id}).then(res => {
          self.is_edit_interpreter = false

          self.onRefresh()
          self.$emit('onRefresh')
        })
      },
      onUploadDocument() {
        let self = this
        self.document = self.$refs.document.files[0]

        if (!self.isAdmin) {
          return false
        }

        if (self.document) {
          let form_data = new FormData()
          form_data.append('type', 'translate')
          form_data.append('doc', self.document)

          rf.getRequest('AdminRequest').postAppointmentUploadDocument(self.appt.id, form_data).then(res => {
            self.onRefresh()
            self.$emit('onRefresh')
          })
        }
      },
      onRemoveDocument(id) {
        let self = this

        if (!self.isAdmin) {
          return false
        }

        rf.getRequest('AdminRequest').postAppointmentRemoveDocument(id).then(res => {
          self.onRefresh()
          self.$emit('onRefresh')
        })
      }
    }
  }
</script>
<style>
  .document--item {
    padding-left: 30px;
    color: #00A3FF;
  }

  .card--detail {
    width: 751px;
  }

  .width-card {
    width: 800px;
  }

  .appt--detail {
    margin: 0 auto;
  }

  .itp-edit {
    position: relative;
  }

  .btn-edit {
    position: absolute;
    right: -12px;
    top: 0px;
    font-size: 9px;
  }

  .atd-box {
    background-color: #E6E6E6;
    width: 630px;
    margin-left: 15px;
    border: 1px solid transparent;
    border-radius: 5px;
    padding: 25px;
  }

  .atd-box .list-group-item {
    padding: 5px 0px;
    background-color: unset;
    border: 0;
    border-radius: 0;
  }

  .pull-right .dcm-delete {
    position: absolute;
    bottom: 3px;
    right: 0px;
    font-size: 10px;
    color: #020644;
  }

  .pull-right .dcm-view {
    position: absolute;
    bottom: 3px;
    right: 62px;
    font-size: 10px;
    color: #010544;
  }

  .additional-note {
    position: relative;
  }

  .btn-editnote {
    position: absolute;
    right: -12px;
    top: 0px;
    font-size: 9px;
  }

  .admin-note {
    position: relative;
  }

  @media (max-width: 576px) {

  }

  @media (max-width: 768px) {

  }

  @media (max-width: 991px) {
    .card {
      width: 100% !important;
    }

    .card--detail {
      width: 100% !important;
    }

    .width-card {
      width: 100% !important;
    }
  }

  @media (min-width: 991px) {
    .card--detail .card-body {
      padding: 0px;
    }
  }
</style>
