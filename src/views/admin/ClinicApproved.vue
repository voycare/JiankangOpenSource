<template>
  <div>
    <div class="row">
      <div class="col-sm-6">
        <p class="title title-22">Clinics</p>
      </div>
      <div class="col-sm-6 text-right">
        <button class="btn btn-round btn-primary btn-pink" id="addClinicBtn">
          <i class="fa fa-plus mr-2"></i>Add Clinic
        </button>
      </div>
    </div>

    <div class="list-content">
      <div class="row">
        <div class="col-sm-12 form-inline mb-3">
          <button
              class="btn btn-white btn-filter"
              id="btn__popover_filter"
          >
            <span class="fa fa-filter"></span>
          </button>
        </div>
      </div>
    </div>

    <b-popover
      :show.sync="show_popover_filter"
      placement="bottomright"
      target="btn__popover_filter"
      triggers="focus"
    >
      <div class="row">
        <div class="col-sm-12">
          <div class="form-group">
            <div class="input-group input-search-icon">
              <input
                class="form-control form-control-sm"
                placeholder="Clinic Name"
                type="text"
                v-model="filter.name"
              />
              <i class="fa fa-search" aria-hidden="true"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <!-- <div class="col-sm-6 pr-1"> -->
        <div class="col-sm-12">
          <select class="form-control form-control-sm" v-model="filter.country">
            <option disabled hidden value="null">Country</option>
            <option :key="item.id" :value="item.name" v-for="item in countries">{{item.name}}</option>
          </select>
        </div>
        <!-- <div class="col-sm-6 pl-1">
          <select class="form-control form-control-sm" v-model="filter.city">
            <option class="option-custom" disabled hidden value>City</option>
            <option
              class="option-custom"
              :key="item.name"
              :value="item.name"
              v-for="item in cities"
            >{{item.name}}</option>
          </select>
        </div> -->
      </div>
      <div class="row">
        <div class="col-sm-6 pr-1">
          <select class="form-control form-control-sm" v-model="filter.specialty_id">
            <option disabled hidden value="null">Specialty</option>
            <option :key="id" :value="id" v-for="(spec, id) in appt_specialty">{{ spec }}</option>
          </select>
        </div>
        <div class="col-sm-6 pl-1">
          <select class="form-control form-control-sm" v-model="filter.treatment_id">
            <option class="option-custom" disabled hidden value="null">Treatment</option>
            <option
              class="option-custom"
              :key="id"
              :value="id"
              v-for="(item, id) in appt_treatments"
            >{{item}}</option>
          </select>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-6 pr-1">
          <select class="form-control form-control-sm" v-model="filter.type">
            <option disabled hidden value="null" selected>Type</option>
            <option :key="id" :value="id" v-for="(item, id) in appt_types">{{item}}</option>
          </select>
        </div>
        <div class="col-sm-6 pl-1">
          <select class="form-control form-control-sm" v-model="filter.rating">
            <option class="option-custom" value="null" disabled hidden selected>Rating</option>
            <option
              class="option-custom"
              :key="id"
              :value="id"
              v-for="(item, id) in ratings"
            >{{item}}</option>
          </select>
        </div>
      </div>
      <div class="row">
        <button class="btn btn-round btn-sm mx-auto filter-apply-btn" @click="getClinics(0)" >Apply</button>
      </div>
    </b-popover>

    <div class="row doctor-grid">
      <div :key="clinic.id" class="col-md-4 col-sm-4 col-lg-3" v-for="clinic in clinics">
        <div class="profile-widget" style="padding: 10px;">
          <div class="rounded-circle text-center rate">{{ clinic.rate }}</div>
          <div class="clinic-img mx-auto">
            <router-link :to="'/clinics/' + clinic.id">
              <img :src="clinic.avatar" alt />
            </router-link>
          </div>
          <div class="dropdown profile-action">
            <a
              aria-expanded="false"
              class="action-icon dropdown-toggle"
              data-toggle="dropdown"
              href="#"
            >
              <i class="fa fa-ellipsis-v"></i>
            </a>
            <div class="dropdown-menu dropdown-menu-right">
              <router-link
                :to="'/clinics/' + clinic.id + '/edit'"
                class="dropdown-item"
                style="font-size: 12px"
              >
                <i class="fa fa-pencil m-r-5"></i> Edit
              </router-link>
              <a
                @click="onDelete(clinic.id)"
                class="dropdown-item"
                data-target="#delete_doctor"
                data-toggle="modal"
                href="javascript:void(0)"
                style="font-size: 12px"
              >
                <i class="fa fa-trash-o m-r-5"></i>
                Delete
              </a>
            </div>
          </div>
          <router-link :to="'/clinics/' + clinic.id">
            <h4 class="mt-3 text-ellipsis clinic-name">
              {{ clinic.name }}
            </h4>
          </router-link>

          <p class="clinic-type">Type of Clinic</p>
          <div class="doc-prof" v-if="clinic.profile">{{ clinic.profile.type_clinic }}</div>
          <div class="clinic-address">
            <i class="fa fa-map-marker"></i>
            {{ clinic.address.full_address }}
          </div>
        </div>
      </div>
    </div>

    <div class="page">
      <Pagination :current-page="current_page" :total-page="total_page" @pageData="getClinics" />
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

import Const from "./../../utils/const";
import rf from "../../api/RequestFactory";
import Pagination from "../../common/Pagination";

export default {
  components: {
    Pagination
  },
  data() {
    return {
      Const,
      clinics: [],
      current_page: 1,
      sort_created: "desc",
      name: "",
      total_page: 1,
      show_popover_filter: false,
      filter: {
        name: "",
        country: null,
        specialty_id: null,
        treatment_id: null,
        type: null,
        rating: null
      },
      ratings: {
        1: 'From the Highest',
        2: 'From the Lowest'
      }
    };
  },
  computed: {
    ...mapGetters(["countries", "appt_specialty", "appt_treatments", "appt_types"])
  },
  methods: {
    getClinics(page) {
      let self = this
      this.current_page = page;
      let params = self.filter
      params.page = page

      rf.getRequest("AdminRequest")
        .getClinicApproved(params)
        .then(res => {
          self.clinics = res.data.datas;
          self.total_page = res.data.total_page;
          self.current_page = page
        });
    },
    onDelete(id) {
      let self = this;
      if (!id) return;

      var r = confirm("Are you want to remove this clinic?");
      if (r == true) {
        rf.getRequest("AdminRequest")
          .postClinicDelete(id)
          .then(res => {
            window.$store.dispatch("app/showModal", { message: res.message });

            self.getClinics(self.current_page);
          });
      }
    }
  },

  mounted() {
    let self = this;

    if(this.countries && this.countries.length === 0){
      self.$store.dispatch("getCountries");
    }
    if(this.appt_specialty.length === 0 && this.appt_treatments.length === 0 && this.appt_types.length === 0){
        self.$store.dispatch("getAppointmentMetas");
      }
    self.getClinics(this.current_page);
  }
};
</script>
<style scoped>
.clinic-img {
  width: 140px;
  height: 94.25px;
}
.clinic-img a {
  width: 100%;
  height: 100%;
  display: block;
  background: #c4c4c4;
}
.clinic-name {
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  color: #434343;
  margin: 0;
}
.clinic-type {
  font-size: 10px;
  line-height: 15px;
  color: #434343;
}
.clinic-address {
  font-size: 10px;
  line-height: 15px;
  color: #434343;
}
.rate {
  width: 28px;
  height: 28px;
  border: #ffcf25;
  background-color: #ffcf25;
  font-size: 12px;
  line-height: 28px;
  font-weight: 500;
  color: #020644;
}
.action-icon:hover,
.action-icon:active,
.action-icon:focus {
  text-decoration: none;
  color: #eb6271;
  outline: none;
}
.input-group,
.form-group {
  margin-bottom: 0;
}
.dropdown-item:hover {
  color: #eb6271;
}
#addClinicBtn {
  background-color: #eb6271;
  border-color: #eb6271;
}
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
select.form-control{
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
select.form-control:focus{
  border-top: 1px solid rgb(118, 118, 118);
  border-bottom: 1px solid rgb(118, 118, 118);
  border-right: 1px solid rgb(118, 118, 118);
  border-left: 1px solid rgb(118, 118, 118);
}
</style>
