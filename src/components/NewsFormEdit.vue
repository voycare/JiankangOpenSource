<template>
  <div>
    <div class="form-group">
      <label>Title</label>
      <input type="text" class="form-control" v-model="newsData.title">
    </div>

    <div class="form-group" >
      <label>Main image</label>
      <input type="file" accept="image/*" capture="enviroment" class="form-control" 
        style="height: auto!important;" @change="onAfterPickPhoto">
      <div v-if="previewImageSrc" class="preview-image-div mb-4" @mouseenter="isImageHovered = true"
        @mouseleave="isImageHovered = false">
        <img id="previewImage" style="width: 150px; height: 80px" :class="{'blur':isImageHovered }"
           :src="previewImageSrc" />
        <i class="fa fa-trash-o pointer hide-icon" id="removeIcon" aria-hidden="true" 
          @click="onRemovePhoto" 
          :class="{ 'show-icon': isImageHovered }"></i>
      </div>
    </div>

    <div class="row">
      <div class="col-sm-6">
        <div class="form-group">
          <label>Category</label>
          <b-dropdown class="d-block" :text="selectedCategoryNames" variant="outline-secondary">
            <b-dropdown-form>
              <b-form-group @submit.stop.prevent>
                <b-form-checkbox-group
                  id="checkbox-group-1"
                  v-model="newsData.category_ids"
                  :options="categorieOptions"
                  value-field="id"
                  text-field="name"
                ></b-form-checkbox-group>
              </b-form-group>
            </b-dropdown-form>
            <b-form class="my-2 ml-4 form-inline" @submit.prevent="createNewCategory">
                <i style="margin-bottom: 10px; line-height: 32px;" class="fa fa-plus pointer" @click="createNewCategory" />
                <input v-model="newCategory" type="text" class="form-control form-control-sm mx-2" /> 
                <span style="margin-bottom: 10px; line-height: 32px;">Add</span>
            </b-form>

            <!-- <b-form-group class="text-center">
              <button class="btn btn-sm my-4" id="categorySaveBtn">Save</button>
            </b-form-group>  -->
          </b-dropdown>
        </div>
      </div>
      <div class="col-sm-6">
        <div class="form-group">
          <label>Publish Date</label><br/>
          <date-picker style="width: 100%;" v-model="publishDate" :default-value="new Date()" 
            value-type="timestamp"></date-picker>
        </div>
      </div>
    </div>

    <div class="form-group">
      <label>Text</label>
      <textarea v-model="newsData.content" style="height: auto!important;" class="form-control" 
        cols="30" rows="5" ></textarea>
    </div>

    <div class="row">
      <div class="col-sm-6">
        <div class="form-group">
          <label>Tags
            <small>(separated with a comma)</small>
          </label>
          <input type="text" class="form-control" v-model="newsData.tags">
        </div>
      </div>
      <div class="col-sm-6">
        <div class="form-group">
          <label>Source</label>
          <input type="text" class="form-control" v-model="newsData.source">
        </div>
      </div>
    </div>

    <div class="form-group">
      <label>Status</label>
      <div class="row">
        <div class="col-sm-12">
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" v-model="newsData.status" name="status" id="status_publish"
                   value="1">
            <label class="form-check-label" for="status_publish">Publish</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" v-model="newsData.status" name="status" id="status_draft"
                   value="0">
            <label class="form-check-label" for="status_draft">Draft</label>
          </div>
        </div>
      </div>
    </div>

    <div class="form-group mt-5 mb-4 text-center">
      <button class="btn btn-save" @click="onSave">Save</button>
    </div>
  </div>
</template>

<script>
  import DatePicker from 'vue2-datepicker'
  import rf from "../api/RequestFactory"

  export default {
    props: ['news'],
    components:{DatePicker},
    data() {
      return {
        previewImageSrc: null,
        isImageHovered: false,
        newsData: null,
        categorieOptions: null,
        newCategory: ''
      }
    },
    computed:{
      publishDate:{
        get(){
          if(this.newsData && this.newsData.publish_date){
            return this.newsData.publish_date * 1000
          }
          return Date.parse(new Date())
        },
        set(value){
          this.newsData.publish_date = value / 1000
        }
      },
      selectedCategoryNames(){
        if(this.newsData.category_ids && this.categorieOptions){
          return this.newsData.category_ids.map(catId => {
            return this.categorieOptions.find(item =>item.id === catId).name
          }).join(', ')
        }
        return ''
      }
    },
    watch: {
      news:{
        deep: true,
        immediate: true,
        handler(){
          this.newsData = {...this.news}
          this.newsData.category_ids = [1,2,4]
        }
      }
    },
    created() {
      this.fetchCategories()
    },
    methods: {
      onSave() {
        this.$emit('onSave', this.newsData)
      },
      async onAfterPickPhoto(e) {
        let self = this
        const file = e.target.files[0]
        // const form_data = new FormData()
        // form_data.append('image', file)
        // thumnail is image
        this.previewImage(file)
      },
      previewImage(image){
        let reader = new FileReader()
        reader.readAsDataURL(image)
        reader.onload = e => {
          this.previewImageSrc = e.target.result
        }
      },
      onRemovePhoto(){
        this.previewImageSrc = null
      },
      createNewCategory(){
        rf.getRequest('AdminRequest').postNewsCategoriesCreate({name: this.newCategory})
          .then(() => {
            this.fetchCategories()
            this.newCategory = ''
          })
        
      },
      fetchCategories(){
        rf.getRequest('AdminRequest').getNewsCategories().then(({data}) => {
          this.categorieOptions = data
        })
        
      }
    }
  }
</script>
<style scoped>

.preview-image-div{
  width: fit-content;
  height: fit-content;
  position: relative;
}
.blur{
  opacity: 0.2;
}
#removeIcon{
  font-size: 20px;
  color: #EB6271;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  width: 20px;
  height: 20px;
  visibility: hidden;
}
/* date picker style in ClinicAvailableDetail */
#categorySaveBtn{
  width: 80px; 
  background: #EB6271; 
  border-radius: 100px;
  border-color: #EB6271;
  color: white;
}  
</style>
