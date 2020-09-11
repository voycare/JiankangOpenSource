<template>
  <div >
    <p class="title-22" style="color: #020644">Reviews</p>

    <div class="list-content">
      <div class="row">
        <div class="col-md-12">
          <div class="table-responsive">
            <table class="table table-striped custom-table m-t-25 table--appt">
              <thead>
              <tr>
                <th>No.</th>
                <th>Provider</th>
                <th>Country</th>
                <th>Transaction Date</th>
                <th>Treatment</th>
                <th>Rating</th>
                <th>Action</th>
              </tr>
              </thead>
              <tbody>
              <tr :key="review.id" v-for="review in reviews">
                <td>{{ review.appointment_id | convertAppointmentID }}</td>
                <td>{{ review.clinic.name }}</td>
                <td>{{ review.clinic.address.country }}</td>
                <td><span
                    v-if="review.appointment">{{ review.appointment.date | convertTimeSecondToDate }}</span>
                </td>
                <td>{{ review.title }}</td>
                <td>
                  <span v-if="review.star">{{ review.star }}</span>
                  <span v-else>-</span>
                </td>
                <td>
                  <router-link :to="'/reviews/' + review.id" class="btn btn-round btn-small btn-white"
                               v-if="review.star">Read your review
                  </router-link>
                  <router-link :to="'/reviews/' + review.id" class="btn btn-round btn-small btn-primary btn-pink"
                               v-else>Write a review
                  </router-link>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="page">
      <Pagination :current-page="current_page" :total-page="total_page"
                  @pageData="getReviews"></Pagination>
    </div>
  </div>
</template>

<script>
  import rf from "../../api/RequestFactory";
  import Pagination from "../../common/Pagination";

  export default {
    name: "Review",
    components: {
      Pagination
    },
    data() {
      return {
        total_page: 0,
        current_page: 0,
        reviews: []
      }
    },
    mounted() {
      let self = this
      self.getReviews(0)
    },
    methods: {
      getReviews(page) {
        let self = this
        this.current_page = page;
        let params = {
          page: page,
          sort_created: this.sort_created,
        }

        rf.getRequest('UserRequest').getReviews(params).then((res) => {
          self.reviews = res.data.datas;
          self.total_page = res.data.total_page;
          self.current_page = page
        })
      },
    }
  }
</script>

<style scoped>
  th {
    font-family: Poppins;
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 21px;
    /* identical to box height */
    color: #434343;
  }
</style>
