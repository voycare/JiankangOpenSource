<template>
  <div  id="review_detail">
    <div class="row mb-4">
      <div class="col-lg-9 pl-0">
        <router-link
            to="/reviews/"
        >
          <img src="/assets/img/icon_back.png"> <span class="back">Back to Reviews</span>
        </router-link>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-9">
        <div v-if="review" class="card">
          <div class="card-body">
            <div class="reviews-box">
              <div class="title-18 mb-3">
                Shan Zhang reviewed Clinic ABCD on 2020-01-01
              </div>
              <div class="row">
                <div class="col">
                  APT0001
                </div>
                <div class="col">
                  China
                </div>
                <div class="col">
                  Postpartum
                </div>
                <div class="col"></div>
                <div class="col"></div>
                <div class="col"></div>
              </div>
              <div class="star-box pt-20 mt-3">
                <div>
                  <span v-for="star in 5" :key="star"><i class="fa fa-star" :class="star <= review.star ? 'text-warning' : ''"></i></span>
                  <span style="font-size:16px; font-weight:500">{{ review.star }}</span>
                </div>
                <div class="pt-20">
                  {{ review.title }}
                </div>
                <div class="pt-20" style="font-size:12px">
                  {{ review.content }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  import rf from "../../api/RequestFactory"

  export default {
    data() {
      return {
        review: null,
        id: null
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

        rf.getRequest('ClinicRequest').getReviewDetail(self.id).then(res => {
          self.review = res.data
        })
      }
    }
  }
</script>
<style>
  span.back {
    width: 143px;
    height: 27px;
    font-size: 18px;
    line-height: 27px;
    color: #020644;
  }

  .title-18 {
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 22px;
  }

  #review_detail table th {
    width: 77px;
    height: 21px;
    font-weight: bold;
    font-size: 14px;
    line-height: 21px;
    color: #434343;
    border: none;
    }

  #review_detail table {
    border: none
  }

  #review_detail table tbody {
    background: #FFFFFF;
    border: 0.5px solid #434343;
  }

  #review_detail table tbody td {
    width: 56px;
    height: 21px;
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
    color: #434343;
  }

  #review_detail .card {
    min-height: 278px;
  }

  #review_detail .card-body {
    padding:40px;
    height: auto;
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    line-height: 22px;
    color: #434343;
    border: 0.5px solid #979797;
    border-radius: 5px;
  }

  p.review_title {
    margin-top: 40px;
    margin-bottom: 0;
    font-weight: bold;
    font-size: 15px;
    line-height: 22px;
    color: #434343;
  }

  .star-box {
    background-color: #E5E5E5;
    border: 0.5px solid #434343;
    border-radius: 5px;
    padding: 20px;
  }

  .star-box span {
    padding-right: 3px;
  }

  @media (max-width: 576px) {
    .title-18{
      font-size:16px;
    }
    #review_detail .card-body {
      padding:20px;
    }
  }

  @media (max-width: 768px) {

  }

  @media (max-width: 991px) {

  }
</style>
