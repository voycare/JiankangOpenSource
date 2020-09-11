<template>
  <div>
    <div class="title-18 mb-4" style="margin-left: -0.5rem;">
      <router-link style="color: #020644;"
                   to="/profile-services">
        <i class="fa fa-arrow-left mr-3"></i>Back to Services
      </router-link>
    </div>

    <ServiceEditForm :services="services" :treatments="treatments" @onSaveServices="onSaveServices"></ServiceEditForm>
  </div>
</template>

<script>
  import rf from "../../api/RequestFactory"
  import ServiceEditForm from "../../components/ServicesEditForm"

  export default {
    components: {ServiceEditForm},
    data() {
      return {
        id: null,
        services: [],
        treatments: []
      }
    },
    methods: {
      getClinicServices() {
        let self = this
        rf.getRequest('ClinicRequest').getServices().then((res) => {
          self.services = res.data.services
          self.treatments = res.data.treatments
          if (!self.services.length) {
            self.services.push({
              clinic_id: self.id,
              type: 1,
              duration: null,
              price: null
            })
            self.services.push({
              clinic_id: self.id,
              type: 2,
              duration: null,
              price: null
            })
          }

          if (!self.treatments.length) {
            self.treatments.push({
              clinic_id: self.id,
              type: '',
              from: '',
              description: ''
            })
          }
        });
      },

      onSaveServices(services, treatments) {
        let self = this

        let params = {
          services,
          treatments
        }

        rf.getRequest('ClinicRequest').postServices(params).then(res => {
        })
      }
    },
    mounted() {
      let self = this

      self.id = self.$route.params.id
      self.getClinicServices();
    }
  }
</script>
