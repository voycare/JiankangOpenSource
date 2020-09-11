<template>
  <div>
    <div class="row mb-4">
      <div class="col-sm-6">
        <p class="title title-22">Services</p>
      </div>
      <div class="col-sm-6 text-right">
        <router-link :to="'/clinics/' + id + '/edit-services'" class="btn btn-pink btn-round">
          <i class="fa fa-pencil mr-2"/>Edit Service
        </router-link>
      </div>
    </div>

    <ServiceListing :services="services" :treatments="treatments"></ServiceListing>
  </div>
</template>

<script>
  import rf from "../../api/RequestFactory"
  import ServiceListing from '../../components/ServiceListing'

  export default {
    components: {ServiceListing},
    data() {
      return {
        id: null,
        services: [],
        treatments: []
      }
    },
    methods: {
      getDetail() {
        let self = this

        rf.getRequest('AdminRequest').getClinicServices(self.id).then(res => {
          self.services = res.data.services
          self.treatments = res.data.treatments
        })
      }
    },
    mounted() {
      let self = this

      self.id = self.$route.params.id
      self.getDetail()
    }
  }
</script>
<style>
</style>
