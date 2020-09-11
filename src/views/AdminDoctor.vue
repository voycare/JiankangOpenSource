<template>
  <div>
    <div class="row">
      <div class="col-sm-4 col-3">
        <h4 class="page-title">Doctors</h4>
      </div>
      <div class="col-sm-8 col-9 text-right m-b-20">
        <a class="btn btn-primary btn-pink btn-rounded float-right" href="/admin/doctor/add"><i class="fa fa-plus mr-2"></i>
          Add
          Doctor</a>
      </div>
    </div>


    <div class="row doctor-grid">
      <div :key="index" class="col-md-4 col-sm-4  col-lg-3" v-for="(doctor, index) in doctors">
        <div class="profile-widget">
          <div class="doctor-img">
            <a @click.prevent="" class="avatar" href="#"><img :src="doctor.avatar" alt=""></a>
          </div>
          <div class="dropdown profile-action">
            <a aria-expanded="false" class="action-icon dropdown-toggle" data-toggle="dropdown" href="#"><i
                class="fa fa-ellipsis-v"></i></a>
            <div class="dropdown-menu dropdown-menu-right">
              <a class="dropdown-item" href="edit-doctor.html"><i class="fa fa-pencil m-r-5"></i> Edit</a>
              <a @click.prevent="deleteDoctor(doctor.id)" class="dropdown-item"
                 data-target="#delete_doctor"
                 data-toggle="modal" href="#"><i class="fa fa-trash-o m-r-5"></i>
                Delete</a>
            </div>
          </div>
          <h4 class="doctor-name text-ellipsis"><a href="#">{{doctor.name}}</a></h4>
          <div class="doc-prof">Gynecologist</div>
          <div class="user-country">
            <i class="fa fa-map-marker"></i> {{doctor.clinic.address.full_address}}
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12">
        <div class="see-all">
          <a @click.prevent="getDoctor()" class="see-all-btn" href="#" v-if="component.btnLoad.display">Load
            More</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import API from "../utils/api";
  import Utils from "../utils/utils";

  export default {
    name: "AdminDoctor",
    data() {
      return {
        doctor: {
          "id": 0,
          "name": "",
          "email": "",
          address: {full_address: ''},
          "avatar": "",
          "phone": ""
        },
        doctors: [],
        page: 1,
        component: {
          btnLoad: {
            display: true
          }
        }
      }
    },
    mounted() {
      this.getDoctor(1)
    },
    methods: {
      getDoctor() {
        fetch(API.getApi(API.ADMIN.DOCTOR.LIST), {
          method: 'post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            authorization: Utils.getLocalAdmin().token
          },
          body: JSON.stringify({
            page: this.page
          })
        }).then(res => res.json()).then(res => {
          this.doctors = this.doctors.concat(res.data.datas);
          if (this.page >= res.data.total_page) {
            this.component.btnLoad.display = false;
          }
          this.page++;
        }).catch(e => {
          console.log(e)
        });
      },
      deleteDoctor(id) {
        alert("delete: " + id);
      }
    }
  }
</script>

<style scoped>

</style>
