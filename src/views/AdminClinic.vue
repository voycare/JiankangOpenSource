<template>
  <div >
    <div class="row">
      <div class="col-sm-4 col-3">
        <h4 class="page-title">clinics</h4>
      </div>
      <div class="col-sm-8 col-9 text-right m-b-20">
        <a class="btn btn-primary btn-pink btn-rounded float-right" href="/admin/clinic/add"><i class="fa fa-plus mr-2"></i>
          Add
          clinic</a>
      </div>
    </div>
    <div class="row clinic-grid">
      <div :key="index" class="col-md-4 col-sm-4  col-lg-3" style="margin-bottom: 10px"
           v-for="(clinic, index) in clinics">
        <div class="profile-widget">
          <div class="doctor-img">
            <a @click.prevent="" class="" href="#"><img :src="clinic.avatar" alt="" style="width: 100%"></a>
          </div>
          <div class="dropdown profile-action">
            <a aria-expanded="false" class="action-icon dropdown-toggle" data-toggle="dropdown" href="#"><i
                class="fa fa-ellipsis-v"></i></a>
            <div class="dropdown-menu dropdown-menu-right">
              <a class="dropdown-item" href="edit-clinic.html"><i class="fa fa-pencil m-r-5"></i> Edit</a>
              <a @click.prevent="deleteclinic(clinic.id)" class="dropdown-item"
                 data-target="#delete_clinic"
                 data-toggle="modal" href="#"><i class="fa fa-trash-o m-r-5"></i>
                Delete</a>
            </div>
          </div>
          <h4 class="clinic-name text-ellipsis"><a href="profile.html">{{clinic.name}}</a></h4>
          <div class="doc-prof">Gynecologist</div>
          <div class="user-country">
            <i class="fa fa-map-marker"></i> {{clinic.address}}
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12">
        <div class="see-all">
          <a @click.prevent="getClinic()" class="see-all-btn" href="#" v-if="component.btnLoad.display">Load
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
    name: "Adminclinic",
    data() {
      return {
        clinic: {
          "id": 0,
          "name": "",
          "email": "",
          "address": "",
          "avatar": "",
          "phone": "",
          "country": ""
        },
        clinics: [],
        page: 1,
        component: {
          btnLoad: {
            display: true
          }
        }
      }
    },
    mounted() {
      this.getClinic(1)
    },
    methods: {
      getClinic() {
        fetch(API.getApi(API.ADMIN.CLINIC.LIST), {
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
          this.clinics = this.clinics.concat(res.data.datas);
          if (this.page >= res.data.total_page) {
            this.component.btnLoad.display = false;
          }
          this.page++;
        }).catch(e => {
          console.log(e)
        });
      },
      deleteclinic(id) {
        alert("delete: " + id);
      }
    }
  }
</script>

<style scoped>

</style>
