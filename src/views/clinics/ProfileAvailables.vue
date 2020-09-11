<template>
  <div >
    <p class="title title-22">Consultation Availability</p>

    <AvailableListing :online_consulations="online_consulations" :site_visits="site_visits" @onDelete="onDelete"
                      @onEditAdminTimeSlot="onEditAdminTimeSlot"
                      @onChangeTime="onChangeTime"></AvailableListing>
  </div>
</template>

<script>
  import rf from "../../api/RequestFactory"

  import AvailableListing from '../../components/AvailableListing'

  export default {
    components: {
      AvailableListing
    },
    data() {
      return {
        id: null,
        online_consulations: [],
        site_visits: [],
      }
    },
    methods: {
      getDetail() {
        let self = this

        rf.getRequest('ClinicRequest').getAvailables().then(res => {
          self.online_consulations = res.data.online_consulations
          self.site_visits = res.data.site_visits
        })
      },
      onDelete(id) {
        let self = this

        rf.getRequest('ClinicRequest').postAvailableRemove({id}).then(res => {
        })
      },
      onEditAdminTimeSlot(body) {
        let self = this
        rf.getRequest('ClinicRequest').postAvailableAdd(body).then(res => {
        })
      },
      onChangeTime(params) {
        let self = this
        rf.getRequest('ClinicRequest').postAvailableAdd(params).then(res => {
        })
      },
    },

    mounted() {
      let self = this
      self.getDetail()
    }
  }
</script>
