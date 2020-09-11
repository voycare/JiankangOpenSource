<template>
  <div>
    <h2 class="title-22 pb-4" style="color: #020644">Basic Settings</h2>
    <div class="row mb-3">
      <div class="col-sm-6">
        <div class="country-infor">
          <span>Default Country</span>
          <select class="hera-control" v-model="localization.default_country">
            <option disabled hidden value="">Select Country</option>
            <option :key="item.id" :value="item.id" v-for="item in countries">{{item.name}}
            </option>
          </select>
        </div>
      </div>
      <div class="col-sm-6">
        <span>Date Format</span>
        <select class="hera-control" v-model="localization.date_format">
          <option disabled hidden value="">Select Date Format</option>
          <option :value="id" v-for="(name, id) in settings.date_formats" :key="id">{{ name }}</option>
        </select>
      </div>
    </div>

    <div class="row mb-3">
      <div class="col-sm-6">
        <span>Timezone</span>
        <select class="hera-control" v-model="localization.timezone">
          <option disabled hidden value="">Select Timezone</option>
          <option :key="id" :value="id" v-for="(name, id) in settings.timezones">{{name}}</option>
        </select>
      </div>

      <div class="col-sm-6">
        <span>Language</span>
        <select class="hera-control" v-model="localization.language">
          <option disabled hidden value="">Select Language</option>
          <option :key="id" :value="id" v-for="(name, id) in settings.languages">{{name}}
          </option>
        </select>
      </div>
    </div>

    <div class="row mb-3">
      <div class="col-sm-6">
        <span>Currency Code</span>
        <select class="hera-control" v-model="localization.currency_code">
          <option disabled hidden value="">Select Language</option>
          <option :key="id" :value="id" v-for="(name, id) in settings.currency_codes">
            {{name}}
          </option>
        </select>
      </div>

      <div class="col-sm-6">
        <span>Currency Symbol</span>
        <input class="hera-control text-right" disabled type="text" v-model="localization.currency_symbol">
      </div>
    </div>

    <div class="row">
      <div class="col-sm-4"></div>
      <div class="col-sm-4">
        <button @click="onUpdateLocalization" class="btn btn-save">Save</button>
      </div>
      <div class="col-sm-4"></div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    props: ['localization'],
    computed: {
      ...mapGetters(['countries', 'settings'])
    },
    mounted() {
      let self = this
      self.$store.dispatch('getCountries')
      self.$store.dispatch('getSettings')
    },
    methods: {
      onUpdateLocalization() {
        let self = this

        self.$emit('onUpdateLocalization', self.localization)
      }
    }
  }
</script>
<style scoped>
.btn-save{
  width: 253px;
  height: 45px;
  background: #EB6271;
  border-radius: 50px;
  color: white;
  font-size: 18px;
}
</style>