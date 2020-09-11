<template>
  <div>
    <!-- <router-link to="/translators">
      <img src="/assets/img/icon_back.png"> <span class="title title-22">Back to Translators</span>
    </router-link> -->
    <BackTo :to="'/translators'" :text="'Back to Translators'" />

    <div class="card mt-4" v-if="translator">
      <div class="card-body">
        <TranslatorEditForm :translator="translator" :page-title="pageTitle" @onSave="onUpdate"></TranslatorEditForm>
      </div>
    </div>
  </div>
</template>
<script>
  import rf from "../../api/RequestFactory"
  import TranslatorEditForm from "../../components/TranslatorEditForm"
  import BackTo from '../../components/BackTo'

  export default {
    components: {
      TranslatorEditForm, BackTo
    },
    data() {
      return {
        id: null,
        translator: null,
        pageTitle: 'Edit Translator'
      }
    },
    mounted() {
      let self = this

      self.id = self.$route.params.id
      self.getDetail()
    },
    methods: {
      getDetail() {
        let self = this

        rf.getRequest('AdminRequest').getTranslator(self.id).then(res => {
          self.translator = res.data
        })
      },
      onUpdate(translator) {
        let self = this
        let params = translator
        params.id = self.id

        rf.getRequest('AdminRequest').postTranslatorCreate(params).then(res => {
          self.translator = res.data
        })
      }
    }
  }
</script>
<style>

</style>
