<template>
  <div>
    <div class="p-3 mb-4" style="border: 1px solid rgba(0,0,0,.125); border-radius: .25rem;">
      <div class="form-group clinic-reschedule px-3">
        <date-picker :inline="true" v-model="selectedDate" value-type="timestamp" />
      </div>
      <div class="row mt-3">
        <div class="col-sm-4 available-time-label">
          <label class="font-15">Available Time</label>
        </div>
        <div class="col-sm-8 available-time-select clinic-reschedule-time">
          <div class="row" style="margin: 0; margin-right: 40px;">
            <div class="col-sm-6 text-center desc-12" style="color: #020644;">China UTC+8</div>
            <div class="col-sm-6 text-center desc-12" style="color: #020644;">Local</div>
          </div>
          <multiselect
            v-model="selectedTime"
            :options="chinaAndLocalTimeRange"
            :searchable="false"
            :close-on-select="true"
            :show-labels="false"
            placeholder="Pick available time"
            @input="onChangeTime"
          >
            <template slot="singleLabel" slot-scope="{ option }">
              <div class="row" style="margin-left: -13px;">
                <div class="col-sm-6 text-center">
                  <span>{{ option.china }}</span>
                </div>
                <div class="col-sm-6 text-center">{{ option.local }}</div>
              </div>
            </template>

            <template slot="option" slot-scope="{ option }">
              <div class="row" style="margin-right: 25px;">
                <div class="col-sm-6 text-center">
                  <span>{{ option.china }}</span>
                </div>
                <div class="col-sm-6 text-center">{{ option.local }}</div>
              </div>
            </template>
          </multiselect>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import DatePicker from "vue2-datepicker";
import utils from "../utils/utils";
import Multiselect from "vue-multiselect";
import DatetimeMixin from "../components/DatetimeMixin";

export default {
  components: { Multiselect, DatePicker },
  mixins: [DatetimeMixin],
  props: {
    datetimeProp: {
      type: Number,
      required: true,
    },
    index: {
      type: Number,
      required: false,
      default: () => -1,
    },
  },
  data() {
    return {
      chinaAndLocalTimeRange: [],
      selectedTime: null,
      datetimeObj: null,
    };
  },
  computed: {
    selectedDate: {
      get() {
        return Date.parse(this.datetimeObj);
      },
      set(value) {
        this.datetimeObj = new Date(value);
        this.onChangeTime();
      },
    },
  },
  mounted() {
    this.datetimeObj = new Date(this.datetimeProp * 1000);
    this.selectedTime = this.getTimeSelectedObject(this.datetimeObj);
    let localTimeRange = utils.getTimeRange();
    self.time_ranges = localTimeRange.map(
      (timeObj) => `${timeObj.hour}:${timeObj.min}`
    );
    let offsetHoursToChina = utils.getLocalTimeZoneOffsetTo(8);

    this.chinaAndLocalTimeRange = localTimeRange.map((timeObj) => {
      let local = `${timeObj.hour}:${timeObj.min}`;
      let chinaHour = Number(timeObj.hour) + offsetHoursToChina;
      let china = `${chinaHour.toString().padStart(2, "0")}:${timeObj.min}`;
      return { local, china };
    });
  },
  watch: {},
  methods: {
    onChangeTime() {
      console.log("onChangeTime");
      let timeArr = this.selectedTime.local.split(":");
      this.datetimeObj.setHours(timeArr[0]);
      this.datetimeObj.setMinutes(timeArr[1]);
      this.$emit("change", {
        index: this.index,
        timestamp: Number(this.datetimeObj) / 1000,
      });
    },
  },
};
</script>