<template>
  <div>
    <router-link to="/profile">
      <p class="title-18">
        <i class="fa fa-arrow-left mr-3"></i>Back to Profile
      </p>
    </router-link>

    <p class="title-22 mt-4">Edit Profile</p>

    <ClinicEditForm :clinic="clinic" @onClinicLanguageRemove="onClinicLanguageRemove" @onClinicLanguageSave="onClinicLanguageSave" @onSave="onSave"></ClinicEditForm>
  </div>
</template>

<script>
import rf from "../../api/RequestFactory";
import ClinicEditForm from '../../components/ClinicEditForm'

export default {
  components: {
    ClinicEditForm
  },
  data() {
    return {
      clinic: null,
    };
  },

  methods: {
    onClinicLanguageRemove(id) {
      let self = this;

      let r = confirm("Are you want to remove this clinic?");
      if (r == true) {
        rf.getRequest("ClinicRequest")
          .postClinicLanguageRemove(id, {})
          .then(res => {
            self.$store.dispatch("app/showModal", { message: res.message });

            self.getDetail();
          });
      }
    },
    onClinicLanguageSave(country_selected) {
      let self = this;
      const params = {
        language: country_selected.trim()
      };

      rf.getRequest("ClinicRequest")
        .postClinicLanguageUpdate(self.id, params)
        .then(res => {
          self.$store.dispatch("app/showModal", { message: res.message });

          self.getDetail();
        });
    },
    onSave(clinic) {
      let self = this;
      const params = {
        clinic
      };

      rf.getRequest("ClinicRequest")
        .postProfileUpdate(params)
        .then(res => {
          self.$store.dispatch("app/showModal", { message: res.message });
          self.clinic = res.data;
        });
    },

    getDetail() {
      let self = this;
      rf.getRequest("ClinicRequest")
        .getProfile()
        .then(res => {
          self.clinic = res.data;
        });
    },
  },
  mounted() {
    let self = this;

    self.getDetail();
  }
};
</script>

<style scoped>
.title-22 {
  color: #020644;
}
label {
  font-weight: 500;
}
input {
  color: #eb6271;
}
select.form-control,
select.form-control:focus,
select.form-control:hover {
  border-radius: 0px;
  /* border-width: 1px;
  border-style: solid;
  border-color: -internal-light-dark-color(
    rgb(118, 118, 118),
    rgb(195, 195, 195)
  ); */
  border-top: 1px solid #cccccc;
  border-left: 1px solid #cccccc;
  border-right: 1px solid #cccccc;
  border-bottom: 1px solid #cccccc;
  border-image: initial;
}
select.form-control:not([size]):not([multiple]) {
  height: 40px;
}
.certificate--thumb{
  display: flex;
  justify-content: space-evenly;
  vertical-align: middle;
}
.certificate--thumb #deleteIcon{
  cursor: pointer;
}
.btn-save{
    background: #EB6271;
    width: 250px;
    height: 45px;
    color: white;
    font-size: 18px;
}
.certificate-div{
  border-bottom: 0.5px solid #434343;
}
</style>
