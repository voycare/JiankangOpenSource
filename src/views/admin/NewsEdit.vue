<template>
  <div>
    <div class="row">
      <div class="col-md-9">
        <BackTo :to="'/news'" :text="'Back to News'" />

        <div class="card mt-3">
          <div class="card-body">
            <p class="title-22">Edit Post</p>

            <NewsFormEdit v-if="news" :news="news" @onSave="onSave"></NewsFormEdit>
          </div>
        </div>
      </div>
      <div class="col-md-3"></div>
    </div>
  </div>
</template>

<script>
  import Const from "./../../utils/const"
  import rf from "../../api/RequestFactory"
  import NewsFormEdit from '../../components/NewsFormEdit'
  import BackTo from '../../components/BackTo'

  export default {
    components: {
      NewsFormEdit,
      BackTo
    },
    data() {
      return {
        Const,
        id: null,
        news: null
      }
    },
    mounted() {
      let self = this

      self.id = self.$route.params.id
      if (self.id) {
        self.getDetail()
      }
    },
    methods: {
      getDetail() {
        let self = this

        rf.getRequest('AdminRequest').getNewsDetail(self.id).then(res => {
          self.news = res.data
        })

      },
      onSave(news) {
        let self = this
        const params = {...news}
        params.id = self.id

        rf.getRequest('AdminRequest').postNewsStore(params).then(res => {
          self.news = res.data
        })
      }
    },
  }
</script>

<style scoped>
</style>
