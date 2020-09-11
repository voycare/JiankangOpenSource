<template>
  <div>
    <div class="row">
      <div class="col-sm-9">
        <BackTo :to="'/news'" :text="'Back to News'" />
        <div class="card mt-4">
          <div class="card-body p-4">
            <p class="title-18">Add Post</p>

            <NewsFormEdit :news="news" @onSave="onSave"></NewsFormEdit>
          </div>
        </div>
      </div>
      <div class="col-sm-3"></div>
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
        news: {
          title: '',
          thumbnail: '',
          category_id: null,
          publish_date: null,
          content: '',
          tags: '',
          source: '',
          status: 0
        }
      }
    },
    methods: {
      onSave(news) {
        let self = this
        const params = news

        rf.getRequest('AdminRequest').postNewsStore(params).then(res => {
          self.news = res.data
        })
      }
    },
    mounted() {
      let self = this
    }
  }
</script>

<style scoped>
</style>
