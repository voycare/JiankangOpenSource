<template>
  <div class="row">
    <div class="col-sm-12 form-inline mb-3">
      <button
          @click="show_popover_filter = !show_popover_filter"
          id="btn__popover_filter"
          class="btn btn-sm p-0 btn-white btn-filter mr-2"
      >
        <i class="fa fa-filter"></i>
      </button>
      <b-form-select
          size="sm"
          class="mr-4 page-limit-select"
          v-model="filter.limit"
          :options="page_limits"
          @change="onChangeLimit"
      ></b-form-select>
      <slot name="more-action"></slot>
    </div>

    <b-popover
        :show.sync="show_popover_filter"
        class="top filter_appt"
        placement="bottomright"
        target="btn__popover_filter"
    >
      <div>
        <div class="row m-t-10">
          <div class="col-sm-6 pr-1">
            <div class="form-group">
              <div class="input-group input-search-icon">
                <input
                    class="form-control form-control-sm"
                    placeholder="Search"
                    type="text"
                    v-model="filter.search"
                />
                <i class="fa fa-search" aria-hidden="true"></i>
              </div>
            </div>
          </div>
          <div class="col-sm-6 pl-1">
            <select class="form-control form-control-sm" v-model="filter.country">
              <option disabled hidden value="null">Country</option>
              <option
                  :key="country.id"
                  :value="country.name"
                  v-for="country in countries"
              >{{ country.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="m-t-25" style="display: flex">
          <b-form-checkbox-group
              v-model="filter.type_ids"
              :options="appt_types"
              class=""
              value-field="id"
              text-field="value"
          ></b-form-checkbox-group>
        </div>
        <div class="m-t-10" style="display: flex">
          <b-form-checkbox-group
              v-if="! isCancellation"
              v-model="filter.status_ids"
              :options="appt_status"
              class=""
          ></b-form-checkbox-group>
          <b-form-checkbox-group
              v-if="isCancellation"
              v-model="filter.status_ids"
              :options="appt_cr_status"
              class=""
          ></b-form-checkbox-group>
        </div>
        <div class="m-b-15" style="text-align: center">
          <button @click="onSubmit" class="btn btn-sm mx-auto filter-apply-btn">Apply</button>
        </div>
      </div>
    </b-popover>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import Const from "../utils/const";

  export default {
    props: {
      isCancellation: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      ...mapGetters(["countries", "appt_types", 'appt_status']),
    },
    data() {
      return {
        show_popover_filter: false,
        country_selected_id: null,
        filter: {
          search: "",
          country: null,
          type_ids: [],
          status_ids: [],
          limit: 10
        },
        appt_cr_status: [
          {id: 1, name: 'Processing'},
          {id: 2, name: 'Refunded'}
        ],
        page_limits: Const.PAGE_LIMIT_OPTIONS,
      };
    },
    methods: {
      onChangeLimit() {
        this.$emit('page-limit-change', this.filter.limit)
      },
      onSubmit() {
        this.$emit('filter', this.filter)
      }
    },
  };
</script>
<style scoped>
</style>
<style>
</style>
