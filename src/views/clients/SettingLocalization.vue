<template>
  <div class="container pt-5">
    <div class="row">
      <div class="col-sm-2">

      </div>
      <div class="col-sm-8">
        <SettingBasic :localization="localization" @onUpdateLocalization="onUpdateLocalization"></SettingBasic>
      </div>
      <div class="col-sm-2">
      </div>
    </div>
  </div>
</template>

<script>
  import rf from "../../api/RequestFactory"
  import SettingBasic from '../../components/SettingBasic'

  export default {
    components: {
      SettingBasic
    },
    data() {
      return {
        localization: {
          default_country: null,
          date_format: null,
          timezone: null,
          language: null,
          currency_code: null,
          currency_symbol: null
        }
      }
    },
    mounted() {
      let self = this

      self.getDetail()
    },
    methods: {
      getDetail() {
        let self = this

        rf.getRequest('UserRequest').getSettingLocalization().then(res => {
          if (res.data) {
            self.localization = res.data
          }
        })
      },
      onUpdateLocalization(localization) {
        let self = this
        let params = localization

        rf.getRequest('UserRequest').updateSettingLocalization(params).then(res => {
          self.getDetail()
        })
      }
    }
  }
</script>
<style>

</style>
