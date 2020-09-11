<template>
  <div class="row">
    <div class="col-md-12">
      <div class="table-responsive">
        <table class="table table-striped" style="background: #FFFFFF;">
          <thead>
          <tr>
            <th class="date pl-4">
              <span class="title-date">Date</span>
            </th>
            <th>Provider Name</th>
            <th>Country</th>
            <th>City</th>
            <th>Type</th>
            <th>Email</th>
            <th>Phone</th>
            <th class="text-center">Status</th>
            <th class="text-center">Actions</th>
          </tr>
          </thead>
          <tbody>
          <tr :key="clinic.id" v-for="clinic in clinics">
            <td class="pl-4">{{clinic.created|convertTimeSecondToDate}}</td>
            <td>{{ clinic.name }}</td>
            <td>{{ clinic.address.country }}</td>
            <td>{{ clinic.address.city }}</td>
            <td>{{ clinic.profile ? clinic.profile.type_clinic : '' }}</td>
            <td>{{ clinic.email }}</td>
            <td>{{ clinic.phone }}</td>
            <td class="text-center">
              <p
                  :class="Const.STATUS.intToVerifyClass(clinic.verify)"
                  class="alert appt--status"
                  style="padding: 3px 0;"
              >{{Const.STATUS.verifyToString( clinic.verify )}}</p>
            </td>
            <td class="text-center">
              <router-link
                  :to="'/clinics/' + clinic.id + '/applicant'"
                  class="btn btn-small btn-round btn-white btn-pink-hover"
              >View</router-link>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Utils from "./../utils/utils";
import Const from "./../utils/const";
import rf from "./../api/RequestFactory";

export default {
  props: ["clinics"],
  data() {
    return {
      Const,
      sort_created: "desc"
    };
  },
  methods: {}
};
</script>

<style scoped>
td,
th {
  padding: 5px 5px;
  vertical-align: middle !important;
  font-weight: 500;
}
.btn-pink-hover:hover {
  background-color: #f9afae;
}
.content .list-content th {
  border-top: none;
  border-bottom: 1px solid #898989;
}
</style>
