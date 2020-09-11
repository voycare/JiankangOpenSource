<template>
  <div>
    <div class="row">
      <div class="col-sm-6">
        <p class="title title-22">Doctors</p>
      </div>
      <div class="col-sm-6 text-right">
        <router-link to="/profile-doctors/edit" class="btn btn-round btn-primary btn-pink">
          <i class="fa fa-pencil mr-2"></i>Edit Doctors
        </router-link>
      </div>
    </div>

    <div class="card p-2" v-for="doctor in doctors" :key="doctor.id">
      <div class="card-body">
        <div class="row">
          <div class="col-sm-4">
            <img :src="getSrc(doctor.avatar)" class="doctor--avatar-list mr-4">
            <div class="desc-18 doctor--name">{{ doctor.name }}</div>
            <div class="desc-15 text-normal">{{ doctor.title }}</div>
          </div>
          <div class="col-sm-8">
            <div class="desc-15 m-b-5 doctor--bio">Bio</div>
            <p class="desc-14">{{ doctor.bio }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import rf from "../../api/RequestFactory"

  export default {
    data() {
      return {
        doctors: [],
      }
    },
    mounted() {
      let self = this
      self.getListing(self.current_page)
    },
    methods: {
      getSrc(src) {
        if (!src) {
          return 'data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=='
        }

        return src.startsWith('data:image') ? src : (process.env.VUE_APP_BASE_URL + src)
      },
      getListing(page) {
        let self = this
        let params = {
          page: page
        };

        rf.getRequest('ClinicRequest').getDoctors(params).then(res => {
          self.doctors = res.data
        })
      }
    }
  }
</script>
<style>
  .form-control {
    display: block;
    width: 100%;
    height: calc(2.25rem + 2px) !important;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    min-height: 0px;
    margin-bottom: 10px;
  }

  .form-control-sm {
    height: calc(1.8125rem + 2px) !important;
    padding: 0.25rem 0.5rem;
    font-size: 0.875rem;
    line-height: 1.5;
    border-radius: 0.2rem;
  }

  select.form-control {
    border-radius: 0px;
    border-width: 1px;
    border-style: solid;
    border-color: -internal-light-dark-color(
        rgb(118, 118, 118),
        rgb(195, 195, 195)
    );
    border-image: initial;

  }

  select.form-control:hover,
  select.form-control:focus {
    border-top: 1px solid rgb(118, 118, 118);
    border-bottom: 1px solid rgb(118, 118, 118);
    border-right: 1px solid rgb(118, 118, 118);
    border-left: 1px solid rgb(118, 118, 118);
  }

</style>
