<template>
  <div>
    <BackTo :to="'/translators'" :text="'Back to Translators'" />
    <div class="card mt-4">
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
        translator: {
          name: '',
          email: '',
          wechat: '',
          phone: '',
          current_location: '',
          nationality: '',
          national_id: ''
        },
        pageTitle: 'Add Translator'
      }
    },
    methods: {
      onUpdate(translator) {
        let self = this
        let params = translator
        delete params['id']

        rf.getRequest('AdminRequest').postTranslatorCreate(params).then(res => {
          self.translator = res.data
        })
      }
    }
  }
</script>
<style>

</style>
