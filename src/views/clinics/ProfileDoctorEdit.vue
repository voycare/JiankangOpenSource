<template>
  <div >
    <router-link :to="'/doctors/'">
      <p class="title-18">
        <i class="fa fa-arrow-left mr-3"></i>Back to Doctors
      </p>
    </router-link>

    <p class="title title-22">Edit Doctors</p>

    <DoctorsEditForm :doctors="doctors" @onSave="onSave"></DoctorsEditForm>
  </div>
</template>
<script>
  import rf from "../../api/RequestFactory"
  import DoctorsEditForm from "../../components/DoctorsEditForm"

  export default {
    components: {
      DoctorsEditForm
    },
    data() {
      return {
        id: '',
        doctors: []
      }
    },
    mounted() {
      let self = this
      self.getListing()
    },
    methods: {
      getListing() {
        let self = this
        rf.getRequest('ClinicRequest').getDoctors().then(res => {
          self.doctors = res.data
        })
      },
      onSave(doctors) {
        let self = this
        rf.getRequest('ClinicRequest').postDoctors({doctors}).then(res => {
          self.getListing()
        })
      }
    }
  }
</script>

<style>
  .remove--doctor {
    margin-top: 135px;
  }

  .doctor--avatar {
    min-width: 170px;
  }

  .doctor--item {
    border-bottom: 1px solid #CBCBCB;
    padding-bottom: 10px;
    margin-bottom: 40px;
  }

  .save--doctor {
    font-weight: 500;
    font-size: 18px;
    line-height: 27px;
    min-width: 250px;
  }
  textarea{
    height: auto;
  }
</style>
