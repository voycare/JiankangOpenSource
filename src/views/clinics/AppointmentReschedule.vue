<template>
  <div>
    <BackTo :to="'/appointments'" :text="'Back to Appointments'"/>

    <div class="text-right mb-2" style="font-size: 12px; color: #020644; line-height: 25px;">
      <span>Pending appointment expires in </span>
      <span class="d-inline-block time-block" v-html="countdown.hour"></span> hrs
      <span class="d-inline-block time-block" v-html="countdown.minute"></span> min
      <span class="d-inline-block time-block" v-html="countdown.second"></span> sec
    </div>

    <div class="row">
      <div class="col-lg-9">
        <div class="card" v-if="appt">
          <AppointmentDetailTable :appt="appt" :isClinic="true" @onRefresh="onRefresh"></AppointmentDetailTable>
        </div>

        <div class="card" v-if="appt">
          <div class="card-body">
            <div class="title-18 text-center" style="color: #434343;">
              We know last minute changes can happen, please select three(3) new dates
              you are available for the consulation.
            </div>

            <div class="row mt-4">
              <div class="col-sm-4">
                <div class="card card-pink">
                  <div class="card-body p-3">
                    <div class="desc-15 mb-3">{{ appt.id | convertAppointmentID }}</div>
                    <div class="desc-15 mb-4">
                      <img src="../../assets/appt-schedule.svg">
                      {{ appt.date | convertTimeSecondToDateTime }}
                    </div>
                    <div class="title-18 mb-3">{{ appt.doctor.name }}</div>
                    <div class="title-18">{{ apptTypeName }}</div>
                  </div>
                </div>
              </div>
              <div class="col-sm-8">
                <div class="accordion" id="apptRescheduleAccordion">
                  <div class="mb-2" v-for="(option, index) in options" :key="index">
                    <div
                        style="border-bottom: 0.5px solid #979797; border-top: 0.5px solid #979797;"
                    >
                      <button
                          class="font-18 btn btn-block text-left font-weight-500 p-0"
                          type="button"
                          data-toggle="collapse"
                          style="color: #020644;"
                          :data-target="'#option_' + index"
                      >
                        <div class="row">
                          <span class="col-sm-4 py-1">
                            <i style="color: #93E9BE;" class="fa fa-circle mr-3"/>
                            Option {{ index + 1 }}
                          </span>
                          <span
                              class="col-sm-4 py-1"
                              style="color: #434343; background: #F5F8FA;"
                          >{{ option.reschedule_time | convertTimeSecondToDate }}</span>
                          <span
                              class="col-sm-4 py-1"
                              style="color: #434343; background: #F5F8FA;"
                          >{{ option.reschedule_time | convertTimeHHmmZ }}</span>
                        </div>
                      </button>
                    </div>

                    <div
                        :id="'option_' + index"
                        class="collapse"
                        data-parent="#apptRescheduleAccordion"
                    >
                      <div class="p-3">
                        <ClinicRescheduleDateTimePicker
                            @change="handleDateTimeChange"
                            :index="index"
                            :datetime-prop="option.reschedule_time"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row mb-5" v-if="appt && appt.status == Const.STATUS.stringToInt('pending')">
          <div class="col-sm-6 text-center">
            <button class="btn btn-dark btn-round" @click="onSave">Reschedule</button>
          </div>
          <div class="col-sm-6 text-center">
            <button class="btn btn-round btn-danger" @click="onCancel">Cancel</button>
          </div>
        </div>

        <div class="row mb-5" v-if="appt && appt.status == Const.STATUS.stringToInt('confirmed')">
          <div class="col-12 text-center">
            <button class="btn btn-danger btn-round pl-5 pr-5" @click="onSave">Save</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import DatePicker from "vue2-datepicker";
  import rf from "../../api/RequestFactory";
  import Const from "./../../utils/const";
  import AppointmentDetailTable from "./../../components/AppointmentDetailTable";
  import utils from "../../utils/utils";
  import Multiselect from "vue-multiselect";
  import ClinicRescheduleDateTimePicker from "../../components/ClinicRescheduleDateTimePicker";
  import {mapGetters} from "vuex";
  import BackTo from '../../components/BackTo'

  export default {
    components: {
      AppointmentDetailTable,
      DatePicker,
      Multiselect,
      ClinicRescheduleDateTimePicker,
      BackTo
    },
    data() {
      return {
        Const,
        appt: null,
        id: null,
        options: [
          {
            reschedule_time: new Date().getTime() / 1000,
          },
          {
            reschedule_time: new Date().getTime() / 1000,
          },
          {
            reschedule_time: new Date().getTime() / 1000,
          },
        ],
        countdown_time: 0,
        countdown: {
          hour: 0,
          minute: 0,
          second: 0
        }
      };
    },
    computed: {
      ...mapGetters({
        appt_types: "appt_types",
      }),
      apptTypeName() {
        return this.appt_types[this.appt.type_id];
      },
    },
    mounted() {
      let self = this;
      self.id = parseInt(this.$route.params.id);

      self.onRefresh();
    },
    methods: {
      onRefresh() {
        let self = this;

        rf.getRequest("ClinicRequest")
          .getAppointmentDetail(self.id)
          .then((res) => {
            self.appt = res.data
            let now = new Date().getTime() / 1000
            if (now < self.appt.expire_time) {
              self.countdown_time = self.appt.expire_time - now
            }
            if (self.countdown_time) {
              self.startCountDown()
            }

            if (self.appt.schedule_times.length) {
              self.options = self.appt.schedule_times;
            }
          });
      },
      startCountDown() {
        let self = this

        setInterval(function () {
          if (self.countdown_time >= 0) {
            self.countdown_time--

            self.countdown.hour = Math.floor(self.countdown_time / 60 * 60) % 24
            self.countdown.minute = Math.floor(self.countdown_time / 60) % 60
            self.countdown.second = Math.floor(self.countdown_time / 1) % 60
          }
        }, 1000);
      },
      onSave() {
        let self = this;
        let params = {
          options: self.options,
        };

        rf.getRequest("ClinicRequest")
          .postAppointmentReschedule(self.id, params)
          .then((res) => {
            self.$store.dispatch("app/showModal", {message: res.message});
            self.onRefresh();
          });
      },
      onCancel() {
        let self = this;

        var r = confirm("Do you want to cancel this appointment?");
        if (!r) return;

        let params = {
          status: Const.STATUS.stringToInt("cancelled"),
        };

        rf.getRequest("ClinicRequest")
          .postAppointmentStatus(self.appt.id, params)
          .then((res) => {
            self.appt = res.data;

            if (self.appt.status == Const.STATUS.stringToInt("cancelled")) {
              self.$store.dispatch("app/showModal", {message: res.message});
              self.onRefresh();
            }
          });
      },
      handleDateTimeChange(obj) {
        let {index, timestamp} = obj;
        if (this.options[index]) {
          this.options[index].reschedule_time = timestamp;
        }
      },
    },
  };
</script>
<style scoped>
  .time-block {
    width: 25px;
    height: 25px;
    background: #020644;
    color: #FFFFFF;
    text-align: center;
  }
</style>
