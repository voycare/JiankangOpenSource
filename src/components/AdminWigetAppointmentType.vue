<template>
  <div>
    <div class="card">
      <div class="p-3">
        <div class="title-20 mb-4">{{header}}</div>
        <div class="row" style="margin-bottom: 10px;">
          <div class="col-sm-6 pr-1">
            <div class="form-group">
              <date-picker
                  style="width: 100%;"
                  v-model="search.from"
                  value-type="timestamp"
                  placeholder="From"
              />
            </div>
          </div>
          <div class="col-sm-6 pl-1">
            <div class="form-group">
              <date-picker
                  style="width: 100%;"
                  v-model="search.to"
                  value-type="timestamp"
                  placeholder="To"
              />
            </div>
          </div>
        </div>
        <div v-if="!isClinic" class="row">
          <div class="col-sm-6 pr-1">
            <select class="form-control form-control-sm" v-model="search.country">
              <option disabled hidden value="null">Country</option>
              <option :key="item.id" :value="item.name" v-for="item in countries">{{item.name}}</option>
            </select>
          </div>
          <div class="col-sm-6 pl-1">
            <!--<select class="form-control form-control-sm" v-model="search.city">-->
            <!--<option class="option-custom" disabled hidden value="null">City</option>-->
            <!--<option-->
            <!--class="option-custom"-->
            <!--:key="item.name"-->
            <!--:value="item.name"-->
            <!--v-for="item in cities"-->
            <!--&gt;{{item.name}}</option>-->
            <!--</select>-->
          </div>
        </div>
        <div class="row">
          <div class="col-sm-6 pr-1">
            <select class="form-control form-control-sm" v-model="search.specialty_id">
              <option disabled hidden value="null">Specialty</option>
              <option :key="id" :value="id" v-for="(spec, id) in appt_specialty">{{ spec }}</option>
            </select>
          </div>
          <div class="col-sm-6 pl-1">
            <select class="form-control form-control-sm" v-model="search.treatment_id">
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
          <div class="col-sm-6 pr-1">
            <select class="form-control form-control-sm" v-model="search.status">
              <option disabled hidden value="null">Status</option>
              <option :key="id" :value="id" v-for="(status, id) in appt_status">{{ status }}</option>
            </select>
          </div>
        </div>

        <div class="form-group text-center mb-4 mt-3">
          <button class="btn btn-pink btn-round px-4" @click="onSearch">Search</button>
        </div>
        <div class="d-flex form-group justify-content-around text-center total-div">
          <span class="mr-3 title-15">Total Cases</span>
          <span class="total">{{ total }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import DatePicker from "vue2-datepicker";
  import {mapGetters} from "vuex";

  export default {
    components: {DatePicker},
    props: {
      header: {
        required: true,
        type: String,
      },
      isClinic: {
        type: Boolean,
        default: false
      },
      total: {
        required: false,
        type: Number,
        default: () => 0,
      },
    },
    data() {
      return {
        search: {
          from: null,
          to: null,
          country: null,
          city: null,
          specialty_id: null,
          treatment_id: null,
          status: null,
        },
        cities: [{name: "NYC"}, {name: "LA"}],
      };
    },
    computed: {
      ...mapGetters([
        "countries",
        "appt_specialty",
        "appt_treatments",
        "appt_types",
        'appt_status'
      ]),
    },
    methods: {
      onSearch() {
        this.$emit("search", this.search);
      },
    },
  };
</script>
<style scoped>
  .total-div {
    border: 0.5px solid #898989;
    padding: 10px 20px;
  }

  .total-div .total {
    color: #eb6271;
    font-weight: 500;
    font-size: 15px;
    line-height: 22px;
  }
</style>
<style>
  #dashboard-right .mx-input {
    border-radius: 0px !important;
    height: 32px !important;
  }
</style>
