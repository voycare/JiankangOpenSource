<template>
  <div>
    <div class="title-18 mb-4" style="margin-left: -0.5rem;">
      <BackTo :to="'/clinics/' + id + '/services'" :text="'Back to Services'" />
    </div>

    <ServiceEditForm :services="services" :treatments="treatments" @onSaveServices="onSaveServices"></ServiceEditForm>
  </div>
</template>

<script>
  import rf from "../../api/RequestFactory"
  import ServiceEditForm from "../../components/ServicesEditForm"
  import BackTo from '../../components/BackTo'
  export default {
    components: {ServiceEditForm, BackTo},
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
        rf.getRequest('AdminRequest').getClinicServices(self.id).then((res) => {
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

        rf.getRequest('AdminRequest').postClinicServices(self.id, params).then(res => {
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
