<template>
  <div>
    <div class="row">
      <div class="col-6">
        <p class="title title-22">Clinic Profile</p>
      </div>
      <div class="col-6 text-right">
        <router-link to="/profile/edit" class="btn btn-round" id="editProfileBtn">
          <i class="fa fa-plus mr-2"></i>Edit Profile
        </router-link>
      </div>
    </div>

    <ClinicDetailForm :clinic="clinic"></ClinicDetailForm>
  </div>
</template>

<script>
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
        rf.getRequest('ClinicRequest').getProfile().then((res) => {
          self.clinic = res.data
        });
      }
    },

    mounted() {
      let self = this
      self.getDetail();
    }
  }
</script>
