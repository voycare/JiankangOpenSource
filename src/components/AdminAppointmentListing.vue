<template>
  <div class="row">
    <div class="col-md-12">
      <div class="table-responsive">
        <table class="table table-striped custom-table table--appt">
          <thead>
          <tr>
            <th>No.</th>
            <th @click="orderCreated" class="date">
              <span class="title-date">Order Date</span>
              <b-icon icon="arrow-down-up" class="bold"></b-icon>
            </th>
            <th>Client</th>
            <th>Clinic</th>
            <th>Appt.Date</th>
            <th class="text-center">Appt.Time</th>
            <th>Type</th>
            <th>Treatment</th>
            <th class="text-center">Status</th>
            <th class="text-center" v-if="showNotify">Notify</th>
            <th class="text-center" v-else-if="! isCR">Extras</th>
          </tr>
          </thead>
          <tbody>
          <tr :key="appt.id" v-for="appt in appoinments">
            <td>
              <router-link
                  :to="'/appointments/' + appt.id">
                <span class="text-blue desc-12"><u>{{ appt.id | convertAppointmentID }}</u></span>
              </router-link>
            </td>
            <td>{{appt.created|convertTimeSecondToDate}}</td>
            <td><span v-if="appt.client">{{appt.client.first_name}} {{ appt.client.last_name }}</span></td>
            <td>{{appt.clinic.name}}</td>
            <td>{{appt.date|convertTimeSecondToDate}}</td>
            <td class="text-center">{{appt.date|convertDateToTime}}</td>
            <td>{{appt.mode|convertModeAppointment}}</td>
            <td>Surrogacy</td>
            <td>
              <p :class="Const.STATUS.intToStatusClass(appt.status)" class="alert appt--status">
                {{Const.STATUS.intToString( appt.status )}}
              </p>
            </td>
            <td class="text-center" v-if="showNotify">
              <a @click="onToggleNotify(appt.id)" href="javascript:void(0)">
                <i :class="isBellActive(appt.admin_notify_ids)" class="fa"></i>
              </a>
            </td>
            <td class="text-center" v-else-if="! isCR">
              <span :class="Const.STATUS.intToExtraClass(appt.status)" class="font-18">
                <i :class="Const.STATUS.intToExtraString( appt.status )"></i>
              </span>
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
  import Const from "./../utils/const"
  import rf from "./../api/RequestFactory"

  export default {
    props: ['appoinments', 'showNotify', 'isCR'],
    data() {
      return {
        Const,
        sort_created: 'desc'
      }
    },
    methods: {
      onToggleNotify(id) {
        let self = this
        rf.getRequest('AdminRequest').postAppointmentNotify(id).then((res) => {
          self.$emit('onRefresh')
        })
      },
      orderCreated() {
        if (this.sort_created === 'desc') {
          this.sort_created = 'asc';
          return
        }
        if (this.sort_created === 'asc') {
          this.sort_created = 'desc';
          return;
        }

        this.$emit('onSortCreated', this.sort_created)
      },
      isBellActive(admin_notify_ids) {
        let self = this

        let arr_admin_notify_ids = admin_notify_ids ? JSON.parse(admin_notify_ids) : []
        let user = Utils.getLocalUser();

        if (user && arr_admin_notify_ids.indexOf(user.id)) {
          return 'fa-bell'
        } else {
          return 'fa-bell-o'
        }
      }
    }
  }
</script>

<style>
  .alert-process {
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 18px;
    color: #434343;
    background: #FFFFFF;
    border: 1px solid #434343;
    box-sizing: border-box;
    border-radius: 5px;
  }

  .alert-refunded {
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 18px;
    color: #EB6271;
    background: #FFFFFF;
    border: 1px solid #434343;
    box-sizing: border-box;
    border-radius: 5px;
  }

  .content {
    padding: 30px 30px;
  }

  .content .page {
    margin-top: 5px;
  }

  .content .search {
    text-align: right;
  }

  .content .title {
    font-family: Poppins;
    font-style: normal;
    font-weight: 500;
    font-size: 22px;
    line-height: 33px;
    color: #020644;
  }

  .content .content-name {
    box-sizing: border-box;
    width: 200px;
    height: 40px;
    padding-left: 10px;
    border: 1px solid #CBCBCB;
    margin-right: 15px;
    font-family: Poppins;
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    background: url("/assets/img/icon_search.png") no-repeat 170px;
    background-color: #FFFFFF;
  }

  .content .country-search {
    width: 200px;
    height: 40px;
    padding-left: 10px;
    background: #FFFFFF;
    border: 1px solid #CBCBCB;
    font-family: Poppins;
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
  }

  .content .list-content {
    margin-top: 20px;
  }

  .content .list-content table {
    border-collapse: separate;
    border-spacing: 0px;
  }

  .content .list-content td {
    border-top: none;
    border-bottom: 1px #898989 solid;
    border-left: none;
    border-right: none;
  }

  .content .list-content th {
    font-family: Poppins;
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    color: #434343;
    border-top: 1.5px #898989 solid;
    border-bottom: 1.5px #898989 solid;
    border-left: none;
    border-right: none;
  }

  .content .list-content th.date {
    color: #EB6271;
    cursor: pointer;
  }

  .content .list-content th.date .title-date {
    margin-right: 6px;
  }

  .content .list-content th.date .img-down {
    margin-right: 2px;
  }

  .content .list-content td {
    font-family: Poppins;
    font-style: normal;
    font-size: 12px;
    line-height: 18px;
    color: #434343;
  }

  .content .list-content tr {
    height: 45px;
  }

  .content .list-content .confirmed {
    height: 22px;
    margin: 0px !important;
    text-align: center;
    width: 83px;
    background: rgba(147, 233, 190, 0.3);
    border: 2px solid #93E9BE;
    box-sizing: border-box;
    border-radius: 5px;
  }

  .content .list-content .cancelled {
    height: 22px;
    margin: 0px !important;
    width: 83px;
    text-align: center;
    background: rgba(255, 0, 0, 0.5);
    border: 2px solid #FF0000;
    box-sizing: border-box;
    border-radius: 5px;
  }

  .content .list-content .completed {
    height: 22px;
    margin: 0px !important;
    text-align: center;
    width: 83px;
    padding: 1px 6px;
    background: #FDD3D1;
    border: 2px solid #FFAFAE;
    box-sizing: border-box;
    border-radius: 5px;
  }

  .content .list-content .pending {
    height: 22px;
    margin: 0px !important;
    text-align: center;
    width: 83px;
    background: rgba(255, 207, 37, 0.5);
    border: 2px solid #FFCF25;
    box-sizing: border-box;
    border-radius: 5px;
  }

  .content .list-content .review {
    cursor: pointer;
    height: 22px;
    background: #EB6271;
    border-radius: 5px;
    color: white;
    padding: 3px 10px;
    margin-left: 6px;
  }

  .content .list-content .review:hover {
    color: #1b8bf9;
  }
</style>
