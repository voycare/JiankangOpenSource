<template>
  <div class="" id="clinic_profile">
    <div >
      <div class="row">
        <div class="col-6">
          <p class="title title-22">Clinic Profile</p>
        </div>
        <div class="col-6 text-right">
          <router-link :to="'/clinics/' + id + '/edit'" class="btn btn-round" id="editProfileBtn">
            <i class="fa fa-plus mr-2"></i>Edit Profile
          </router-link>
        </div>
      </div>

      <ClinicDetailForm :clinic="clinic"></ClinicDetailForm>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  import Const from "./../../utils/const"
  import rf from "../../api/RequestFactory"
  import ClinicDetailForm from '../../components/ClinicDetailForm'

  export default {
    components: {
      ClinicDetailForm
    },
    data() {
      return {
        Const,
        id: null,
        clinic: null
      }
    },
    methods: {
      getDetail() {
        let self = this
        rf.getRequest('AdminRequest').getClinic(self.id).then((res) => {
          self.clinic = res.data
        });
      }
    },

    mounted() {
      let self = this
      self.id = self.$route.params.id

      self.$store.dispatch('getCountries')
      self.$store.dispatch('getAppointmentMetas')
      if(self.id) {
        self.getDetail();
      }
    }
  }
</script>
