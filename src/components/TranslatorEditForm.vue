<template>
  <div class="col-sm-10 offset-sm-1" id="add_translators">
    <div class="row col-sm-12">
      <p class="title-18"> {{ pageTitle}}</p>
    </div>
    <div class="row">
      <div class="col-sm-6">
        <div class="form-group">
          <label>Name</label>
          <input type="text" class="form-control" v-model="translator.name" placeholder="Name">
        </div>
      </div>
      <div class="col-sm-6">
        <div class="form-group">
          <label>Email</label>
          <input type="email" class="form-control" v-model="translator.email" placeholder="Email">
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-sm-6">
        <div class="form-group">
          <label>WeChat</label>
          <input type="text" class="form-control" v-model="translator.wechat" placeholder="WeChat">
        </div>
      </div>
      <div class="col-sm-6">
        <div class="form-group">
          <label>Phone</label>
          <input type="text" class="form-control" v-model="translator.phone" placeholder="Phone">
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-sm-6">
        <div class="form-group">
          <label>Current Location</label>
          <input type="text" class="form-control" v-model="translator.current_location" placeholder="Current Location">
        </div>
      </div>
      <div class="col-sm-6">
        <div class="form-group">
          <label>Nationality</label>
          <input type="text" class="form-control" v-model="translator.nationality" placeholder="Nationality">
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-sm-6">
        <div class="form-group">
          <label>National ID</label>
          <input type="text" class="form-control" v-model="translator.national_id" placeholder="National ID">
        </div>
      </div>
      <div class="col-sm-6">
        <div class="form-group">
          <label></label>
          <ul class="nav pt-3">
            <li class="nav-item">Upload ID (Front)</li>
            <li class="nav-item">Upload ID (Back)</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-sm-12">
        <div v-if="languages" class="form-group">
          <label class="languages">Languages Spoken</label>
          <div class="form-check form-check-inline" v-for="language in languages" :key="language.id">
            <input class="form-check-input" type="checkbox"
              v-model="selected_languages" :id="'rd_' + language.id"
                   :value="language">
            <label class="form-check-label pr-4 pl-1" :for="'rd_' + language.id">
              {{ language.name }}</label>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-sm-12 text-center">
        <button class="btn btn-danger btn-round" @click="onSave">Add Translator</button>
      </div>
    </div>
  </div>
</template>
<script>
  import rf from "./../api/RequestFactory"

  export default {
    props: ['translator', 'pageTitle'],
    data() {
      return {
        languages: null,
        selected_languages: []
      }
    },
    mounted() {
      let self = this
      rf.getRequest('AdminRequest').getTranslatorLanguages().then(res => {
        self.languages = res.data
      })
    },
    computed: {
    },
    watch: {
      // translator:{
      //   deep: true,
      //   immediate: true,
      //   handler(){
      //     this.selected_languages = this.translator.languages
      //   }
      // }
    },
    methods: {
      onSave() {
        let self = this

        self.$emit('onSave', self.translator)
      },
      isChecked(id) {
        let self = this
        for (let i = 0; i < self.translator.languages.length; i++) {
          if (self.translator.languages[i].language_id == id) {
            return true
          }
        }

        return true
      }
    }
  }
</script>

<style media="screen">
  .title-page {
    font-family: Poppins;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 27px;
    color: #020644;
  }

  #add_translators .nav li {
    text-decoration: underline;
    margin-right: 40px;
  }

  label.languages {
    display: block;
  }
</style>
