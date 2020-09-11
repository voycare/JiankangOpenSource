<template>
  <div >
    <div class="row">
      <div class="col-sm-12">
          <BackTo :to="'/clinic-applicants'" :text="'Back to Applicants'" />
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12">
        <div style="display: flex">
          <div class="card summary" v-if="clinic">
            <h2 class="title-20 text-center text-color mb-5">Clinic Applicant Summary</h2>

            <div class="row">
              <div class="col-sm-3 title-15">
                Provider Name:
              </div>
              <div class="col-sm-3 desc-15">
                {{ clinic.name }}
              </div>
              <div class="col-sm-3 title-15">
                Type:
              </div>
              <div class="col-sm-3 desc-15">
                {{ clinic.profile.type_clinic }}
              </div>
            </div>

            <div class="row">
              <div class="col-sm-3 title-15">
                Email Address:
              </div>
              <div class="col-sm-3 desc-15">
                {{ clinic.email }}
              </div>
              <div class="col-sm-3 title-15">
                Phone:
              </div>
              <div class="col-sm-3 desc-15">
                {{ clinic.phone }}
              </div>
            </div>

            <div class="row">
              <div class="col-sm-3 title-15">
                City:
              </div>
              <div class="col-sm-3 desc-15">
                {{ clinic.address.city }}
              </div>
              <div class="col-sm-3 title-15">
                Country:
              </div>
              <div class="col-sm-3 desc-15">
                {{ clinic.address.country }}
              </div>
            </div>

            <div class="row">
              <div class="col-sm-3 title-15">
                Website:
              </div>
              <div class="col-sm-3 desc-15">
                -
              </div>
              <div class="col-sm-3 title-15">
                Contact Person:
              </div>
              <div class="col-sm-3 desc-15">
                {{clinic.name}}
              </div>
            </div>

            <div class="row">
              <div class="col-sm-3 title-15">
                Title:
              </div>
              <div class="col-sm-3 desc-15">
                {{clinic.profile.title}}
              </div>
              <div class="col-sm-3 title-15">
                Telemedicine:
              </div>
              <div class="col-sm-3 desc-15">
                -
              </div>
            </div>

            <div class="row">
              <div class="col-sm-3 title-15">
                Years in Business:
              </div>
              <div class="col-sm-3 desc-15">
                -
              </div>
              <div class="col-sm-3 title-15">
                Languages Spoken:
              </div>
              <div class="col-sm-3 desc-15">
                <span class="d-block" v-for="item in clinic.languages" :key="item.id">
                  {{item.language}}
                </span>
              </div>
            </div>

            <div class="pt-5">
              <div class="row">
                <div class="col-sm-6 text-center">
                  <button @click="onApprove" class="btn btn-success rounded-pill">Approve</button>
                </div>

                <div class="col-sm-6 text-center">
                  <button @click="onDecline" class="btn btn-danger rounded-pill">Decline</button>
                </div>
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
    components:{BackTo},
    data() {
      return {
        Const,
        clinic: null,
        id: null
      }
    },
    mounted() {
      let self = this
      self.id = parseInt(this.$route.params.id)

      self.onRefresh()
    },
    methods: {
      onRefresh() {
        let self = this

        rf.getRequest('AdminRequest').getClinic(self.id).then((res) => {
          self.clinic = res.data;
        });
      },
      onApprove() {
        let self = this
        rf.getRequest('AdminRequest').postClinicApprove(self.id).then(res => {
          self.clinic = res.data

          self.$router.push({path: '/clinic-applicants'})
        })
      },
      onDecline() {
        let self = this
        rf.getRequest('AdminRequest').postClinicDecline(self.id).then(res => {
          self.clinic = res.data

          self.$router.push({path: '/clinic-applicants'})
        })
      }
    }
  }
</script>
<style scoped>
.summary{
  padding: 40px 90px;
  width: 937px;
  height: 655px;
  border: 1px solid #CBCBCB;
  border-radius: 5px;
}
.row{
  margin-bottom: 20px;
}
.page-title, .title-15, .title-20, .btn{
  color: #020644;
}
button{
  width: 180px;
}
</style>
