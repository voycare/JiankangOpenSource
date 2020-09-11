<template>
  <div  id="review_detail">
    <div class="row mb-4">
      <div class="col-sm-6 pl-0">
        <router-link
            to="/reviews/"
        >
          <img src="/assets/img/icon_back.png"> <span class="back">Back to Reviews</span>
        </router-link>
      </div>
    </div>

    <div class="row col-sm-12 col-md-11 p-0">
      <div class="table-responsive">
        <table class="table table-borderless">
          <thead>
          <tr>
            <th>Review No.</th>
            <th>Client</th>
            <th>Country</th>
            <th>Clinic</th>
            <th>Transaction Date</th>
            <th>Treatment</th>
            <th>Rating</th>
          </tr>
          </thead>
          <tbody>
          <tr v-if="review">
            <td>{{ review.appointment_id | convertAppointmentID}}
            </td>
            <td>{{ review.client ? review.client.name : '' }}</td>
            <td>{{ review.client ? review.client.address.country : '' }}</td>
            <td>{{ review.clinic ? review.clinic.name : '' }}</td>
            <td>{{ review.transaction_id }}</td>
            <td>{{ review.treatment.type }}</td>
            <td>{{ review.star }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="row col-sm-12 col-md-11 p-0">
      <div class="row col-sm-12 pl-3 pb-1">
        <p class="review_title">Review</p>
      </div>
      <div class="card" v-if="review">
        <div class="card-body">
          <p>{{ review.content }}</p>
        </div>
      </div>
    </div>
    <div class="row col-sm-12 col-md-11 p-0" style="justify-content: center;">
      <div class="">
        <button class="btn btn-success btn-rounded mr-4" @click="onApprove">Approve</button>
        <button class="btn btn-danger btn-rounded" @click="onApprove">Deline</button>
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

        rf.getRequest('AdminRequest').getReviewDetail(self.id).then(res => {
          self.review = res.data
        })
      },
      onApprove() {
        let self = this

        rf.getRequest('AdminRequest').postReviewApprove(self.id).then(res => {
          self.getDetail()
        })
      },
      onDecline() {
        let self = this

        rf.getRequest('AdminRequest').postReviewDecline(self.id).then(res => {
          self.getDetail()
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
    padding: 18px 34px 18px 20px;
    height: 86px;
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    line-height: 22px;
    color: #000000;
  }

  p.review_title {
    margin-top: 40px;
    margin-bottom: 0;
    font-weight: bold;
    font-size: 15px;
    line-height: 22px;
    color: #434343;
  }
</style>
