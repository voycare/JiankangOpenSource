<template>
  <div >
    <div class="row">
      <div class="col-sm-8">
        <h4 class="page-title bold">Appointments</h4>
      </div>
      <div class="col-sm-4 text-right">
        <button class="btn btn-pink btn-rounded">Add Appointment</button>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12">
        <select style="margin-left: 10px">
          <option>10</option>
        </select>
      </div>
      <div class="col-sm-12">
        <div class="table-responsive table table-bordered table-striped table--appt">
          <table class="table mb-0">
            <thead>
            <tr>
              <th>No</th>
              <th>Date</th>
              <th>Client</th>
              <th>Age</th>
              <th>Country</th>
              <th>Clinic</th>
              <th>Appt. Date</th>
              <th>Appt. Time</th>
              <th>Type</th>
              <th>Status</th>
              <th>

              </th>
            </tr>
            </thead>
            <tbody>
            <tr :key="index" v-for="(appointment, index) in appointments">
              <td>{{"APT" + (appointment.id + "").padStart(4,"0")}}</td>
              <td>{{Utils.intToDate(appointment.created, "YYYY-MM-DD hh:mm A")}}</td>
              <td>{{appointment.client.last_name + " " + appointment.client.first_name}}</td>
              <td>{{Utils.intToAge( appointment.client.birthday)}}</td>
              <td>{{appointment.client.address.full_address}}</td>
              <td>{{appointment.clinic}}</td>
              <td>{{Utils.intToDate( appointment.date, "YYYY-MM-DD")}}</td>
              <td>{{Utils.intToHour( appointment.time)}}</td>
              <td>{{Const.APPOINTMENT.MODE.intToString( appointment.mode)}}</td>
              <td><p :class="Const.STATUS.intToStatusClass(appointment.status)" class="alert"
                     style="margin-bottom: 0px; padding-top: 2px; padding: 2px 10px">
                {{Const.STATUS.intToString( appointment.status)}}</p>
              </td>
              <td>
                <a href="#">
                  <svg class="bi bi-three-dots-vertical" fill="currentColor" height="1em"
                       viewBox="0 0 16 16"
                       width="1em" xmlns="http://www.w3.org/2000/svg">
                    <path clip-rule="evenodd"
                          d="M9.5 13a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm0-5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm0-5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
                          fill-rule="evenodd"/>
                  </svg>
                </a>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import API from "../utils/api";
  import Utils from "../utils/utils";
  import ClientUtils from "../utils/clientUtils";
  import Const from "../utils/const"


  export default {
    name: "AdminAppointment",
    data() {
      return {
        Utils: ClientUtils,
        Const: Const,
        appointment: {
          id: 0,
          date: 0,
          time: 0,
          mode: 0,
          status: 0,
          created: 0,
          client: {
            first_name: "",
            last_name: "",
            birthday: 0,
            address: {
              full_address: ''
            }
          },
          doctor: {
            first_name: "",
            last_name: "",
            clinic: ""
          },
        },
        appointments: [],
      }
    },
    mounted() {
      this.getAppointment()
    },
    methods: {
      getAppointment() {
        fetch(API.getApi(API.ADMIN.APPOINTMENT.LIST), {
          method: 'get',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            authorization: Utils.getLocalAdmin().token
          },
          body: JSON.stringify({
            type: 1,
            sort_created: "asc"
          })
        }).then(res => res.json()).then(res => {
          this.appointments = res.data.datas;
        }).catch(e => {
          console.log(e)
        });
      }
    },

  }
</script>

<style scoped>

</style>
