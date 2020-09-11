<template>
  <div>
    <div class="row">
      <div class="col-sm-12">
        <router-link to="/reviews"><h4 class="page-title"><i class="fa fa-arrow-left mr-3"></i>Back to Reviews
        </h4></router-link>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12">
        <div class="card" v-if="review">
          <div class="card-body review-margin">
            <div class="title-18 m-t-20 mb-4">Write a review for Clinic {{ review.clinic.name }}</div>
            <div class="mb-5">
              <label class="title-15">Overall rating</label>
              <rating :maxStars="5" :readOnly="isReadOnly" v-model="rating"/>
            </div>
            <div class="form-group">
              <label class="title-15" label="note">Your review</label>
              <p v-if="! isReadOnly">{{ review.content }}</p>
              <textarea class="form-control hera-textarea form-size--review" id="note"
                        placeholder="Write your review here..." rows="30"
                        v-else
                        v-model="note"></textarea>
            </div>
            <div class="form-group " style="margin-top: 47px; " v-if="isReadOnly">
              <button class="btn btn-rounded" style="width: 160px">Submit Review</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Rating from '../../components/Rating'
  import rf from "../../api/RequestFactory";

  export default {
    components: {
      Rating
    },
    data() {
      return {
        note: null,
        rating: 0,
        review: null
      }
    },
    mounted() {
      let self = this
      let id = parseInt(this.$route.params.id)

      rf.getRequest('UserRequest').getReview(id).then((res) => {
        self.review = res.data
        self.rating = res.data.star
      })
    },
    methods: {
      isReadOnly() {
        let self = this
        if (!self.review) {
          return true;
        }
        return self.review.star != 0 ? true : false
      },
      submitReview() {
        let self = this
        let id = parseInt(this.$route.params.id)
        let params = {
          clinic_id: id,
          title: '',
          start: self.note,
          content: self.rating
        }

        rf.getRequest('UserRequest').postReview(params).then((res) => {

        })
      }
    }
  }
</script>

<style>
  .hera-textarea {
    border: 0.5px solid #434343;
    border-radius: 5px;

  }
</style>
