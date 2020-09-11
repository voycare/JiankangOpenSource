<template>
  <div>
    <div class="list-content">
      <div class="row">
        <div class="col-sm-12 form-inline mb-3">
          <button class="btn btn-white btn-filter"
                  id="btn__popover_filter">
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
        <div class="col-sm-6 pr-1">
          <div class="form-group">
            <div class="input-group filter-name">
              <input
                  class="form-control form-control-sm"
                  placeholder="Doctor Name"
                  type="text"
                  v-model="filter.doctorName"
              />
              <i class="fa fa-search" aria-hidden="true"></i>
            </div>
          </div>
        </div>
        <div class="col-sm-6 pl-1">
          <select class="form-control form-control-sm" v-model="filter.type">
            <option disabled hidden value="null" selected>Type</option>
            <option :key="id" :value="id" v-for="(item, id) in appt_types">{{item}}</option>
          </select>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-6 pr-1">
          <select class="form-control form-control-sm" v-model="filter.country">
            <option disabled hidden value="null">Country</option>
            <option :key="item.id" :value="item.name" v-for="item in countries">
              {{item.name}}
            </option>
          </select>
        </div>
        <div class="col-sm-6 pl-1">
          <select class="form-control form-control-sm" v-model="filter.city">
            <option class="option-custom" disabled hidden value="null">City</option>
            <option
                class="option-custom"
                :key="item.name"
                :value="item.name"
                v-for="item in cities"
            >{{item.name}}
            </option>
          </select>
        </div>
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
            >{{item}}
            </option>
          </select>
        </div>
      </div>
      <div class="row">
        <button class="btn btn-sm mx-auto filter-apply-btn" @click="getListing(0)">Apply</button>
      </div>
    </b-popover>

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
            <div class="dropdown profile-action">
              <a aria-expanded="false" class="action-icon dropdown-toggle" data-toggle="dropdown"
                 href="#"><i
                  class="fa fa-ellipsis-v"></i></a>
              <div class="dropdown-menu dropdown-menu-right">
                <router-link :to="'/clinics/' + doctor.clinic_id + '/doctors'" class="dropdown-item"><i
                    class="fa fa-pencil m-r-5"></i> Edit
                </router-link>
                <a @click="onRemove(doctor.id)" class="dropdown-item" data-target="#delete_doctor"
                   data-toggle="modal" href="javascript:void(0)"><i class="fa fa-trash-o m-r-5"></i>
                  Delete</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="page">
      <Pagination :current-page="current_page" :total-page="total_page"
                  @pageData="getListing"></Pagination>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from "vuex"
  import Pagination from "../common/Pagination"

  export default {
    components: {Pagination},
    props: ['doctors', 'total_page', 'current_page'],
    computed: {
      ...mapGetters(["countries", "appt_specialty", "appt_treatments", "appt_types"])
    },
    data() {
      return {
        show_popover_filter: false,
        sort_created: 'desc',
        filter: {
          doctorName: '',
          type: null,
          country: null,
          city: null,
          specialty_id: null,
          treatment_id: null,
        },
        cities: [{name: 'NYC'}, {name: 'LA'}]
      }
    },
    mounted () {
      let self = this

      self.$store.dispatch('getCountries')
      self.$store.dispatch('getAppointmentMetas')
    },
    methods: {
      getSrc(src) {
        if (!src) {
          return 'data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=='
        }

        return src.startsWith('data:image') ? src : (process.env.VUE_APP_BASE_URL + src)
      },
      getListing(page){
        let self = this

        self.$emit('getListing', page)
      },
      onRemove(id){
        let self = this

        self.$emit('onRemove', id)
      }
    }
  }
</script>
