<template>
  <div>
    <div class="mb-5">
      <p class="title-20 step-title">Step 1: Online consultations</p>
      <p class="f-18 font-weight-500">
        Please use below calendar to select the available time slots you can provide online audio/video
        consultations to patients on the Hera platform. For China clients, please consider time difference
        accordingly.
      </p>

      <div class="available--wrapper">
        <div class="row">
          <div class="col-sm-11">
            <div v-for="item in online_consulations" :key="item.id" class="available--item">
              <AdminTimeSlot
                :time-slot-prop="item"
                @edit="onEditAdminTimeSlot"
                @select="onEditAvailable"
                @delete="onDelete"
              />
            </div>
            <div @click="onAddOnlineConsulation" class="available--item add-icon">
              <i class="fa fa-plus"></i>
            </div>
          </div>
          <div class="col-sm-1 collapse-icon-div">
            <i class="fa fa-chevron-down" aria-hidden="true"></i>
          </div>
        </div>
      </div>
      <div class="available--edit" v-if="toggle_edit && date_selected">
        <div class="row">
          <div class="col-sm-4 date-picker-custom">
            <date-picker
              :inline="true"
              @change="onChangeCalendar(false)"
              v-model="date_selected"
              value-type="timestamp"
            ></date-picker>
          </div>
          <div class="col-sm-8 text-center">
            <p>
              Available appointments on
              <span style="color: #020644; font-weight: 500;">
                {{ (date_selected / 1000) | convertTimeSecondToDate
                }}.
              </span>
            </p>
            <p>Please select as many available times as you wish.</p>

            <div class="row">
              <div class="col-sm-4 available-time-label">
                <label>Available Time</label>
              </div>
              <div class="col-sm-8 available-time-select">
                <div class="row" style="margin: 0; margin-right: 40px;">
                  <div class="col-sm-6 text-center desc-12">China UTC+8</div>
                  <div class="col-sm-6 text-center desc-12">Local</div>
                </div>
                <multiselect
                  v-model="time_selected"
                  :options="chinaAndLocalTimeRange"
                  :searchable="false"
                  :close-on-select="true"
                  :show-labels="false"
                  placeholder="Pick available time"
                  @input="onChangeTime(false)"
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
            <!-- <b-form inline>
              <label for="">Available Time</label>
              <select @change="onChangeTime(false)" class="form-control" v-model="time_selected">
                <option :key="time.id" :value="time.id" v-for="time in time_ranges">{{
                  time.hour.toString().padStart(2, '0') }}:{{ time.minute.toString().padStart(2, '0') }}
                </option>
            </select>
            </b-form>-->
          </div>
        </div>
      </div>
    </div>

    <hr class="divider" />

    <div class="mb-5">
      <p class="title-20 step-title">Step 2: Site visit appointments</p>
      <p>
        Please use below calendar to select the available time slots you can provide site visit appointment to
        patients on the
        Hera platform. For China clients, please consider time difference accordingly.
      </p>

      <div class="available--wrapper">
        <div class="row">
          <div class="col-sm-11">
            <div :key="item.id" class="available--item" v-for="item in site_visits">
              <AdminTimeSlot
                :time-slot-prop="item"
                @edit="onEditAdminTimeSlot"
                @delete="onDelete"
                @select="onEditAvailable"
                :is-site="true"
              />
            </div>
            <div @click="onAddSiteVisit" class="available--item add-icon">
              <i class="fa fa-plus"></i>
            </div>
          </div>
          <div class="col-sm-1 collapse-icon-div">
            <i class="fa fa-chevron-down" aria-hidden="true"></i>
          </div>
        </div>
      </div>
      <div class="available--edit" v-if="toggle_edit_site && date_selected_site">
        <div class="row">
          <div class="col-sm-4 date-picker-custom">
            <date-picker
              :inline="true"
              @change="onChangeCalendar(true)"
              v-model="date_selected_site"
              value-type="timestamp"
            ></date-picker>
          </div>
          <div class="col-sm-8 text-center">
            <p>
              Available appointments on
              <span style="color: #020644; font-weight: 500;">
                {{ (date_selected_site / 1000) | convertTimeSecondToDate
                }}.
              </span>
            </p>
            <p>Please select as many available times as you wish.</p>
            <div class="row">
              <div class="col-sm-6 available-time-label">
                <label>Available Time</label>
              </div>
              <div class="col-sm-6 available-time-select">
                <div class="text-left" style="width: 150px; padding-left: 16px;">Local</div>
                <select
                  @change="onChangeTime(true)"
                  class="form-control"
                  style="width: 150px;"
                  v-model="time_selected_site"
                >
                  <option :key="time" :value="time" v-for="time in time_ranges">{{ time }}</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import utils from "../utils/utils";
import Const from "./../utils/const";
import DatePicker from "vue2-datepicker";
import AdminTimeSlot from "../components/AdminTimeSlot";
import Multiselect from "vue-multiselect";
import DatetimeMixin from '../components/DatetimeMixin'

export default {
  components: {
    DatePicker,
    AdminTimeSlot,
    Multiselect,
  },
  mixins:[DatetimeMixin],
  props: ["online_consulations", "site_visits"],
  data() {
    return {
      Const,
      toggle_edit: false,
      toggle_edit_site: false,
      date_selected: null,
      date_selected_site: null,
      time_selected: null,
      time_selected_site: null,
      item_selected: null,
      time_ranges: [],
      value: "",
      chinaAndLocalTimeRange: [],
    };
  },
  mounted() {
    let self = this;
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
  methods: {
    onAddOnlineConsulation() {
      let self = this;

      // Hide edit calendar
      self.toggle_edit = !self.toggle_edit;

      self.online_consulations.push({
        id: utils.randomStr(6),
        clinic_id: self.id,
        type: 1,
        date: new Date().getTime() / 1000,
      });
    },
    onAddSiteVisit() {
      let self = this;

      // Hide edit calendar
      self.toggle_edit_site = !self.toggle_edit_site;

      self.site_visits.push({
        id: utils.randomStr(6),
        clinic_id: self.id,
        type: 2,
        date: new Date().getTime() / 1000,
      });
    },
    onDelete(idStr) {
      let self = this;
      let id = parseInt(idStr);
      var r = confirm("Are you want to remove this clinic available?");
      if (r != true) {
        return;
      }

      for (var i = 0; i < self.online_consulations.length; i++) {
        if (self.online_consulations[i].id == idStr) {
          self.online_consulations.splice(i, 1);
        }
      }
      for (var j = 0; j < self.site_visits.length; j++) {
        if (self.site_visits[j].id == idStr) {
          self.site_visits.splice(j, 1);
        }
      }

      if (id > 0) {
        self.$emit("onDelete", id);
      }
    },
    onEditAvailable(param) {
      let { item, is_site } = param;
      let self = this;

      // Show calendar edit.
      if (!is_site) {
        self.toggle_edit = !self.toggle_edit;
      } else {
        self.toggle_edit_site = !self.toggle_edit_site;
      }

      let date = new Date(item.date * 1000);
      if (!is_site) {
        self.date_selected = date.getTime();
        // self.time_selected = date.getHours() + '_' + date.getMinutes()
        self.time_selected = this.getTimeSelectedObject(date);
        // self.time_selected =  { china: "08:00", local: "07:00" }
      } else {
        self.date_selected_site = date.getTime();
        let hour = date.getHours().toString().padStart(2, "0");
        let min = date.getMinutes().toString().padStart(2, "0");
        self.time_selected_site = hour + ":" + min;
      }
      self.item_selected = item;
    },
    onChangeTime(is_site = false) {
      let self = this;
      self.onChangeCalendar(is_site);
      if (self.item_selected) {
        let params = {
          clinic_available: self.item_selected,
        };

        self.$emit("onChangeTime", params);
      }
    },
    onEditAdminTimeSlot(param) {
      let self = this;
      let { item, is_site } = param;
      let body = { clinic_available: item };
      self.$emit("onEditAdminTimeSlot", body);
    },
    onChangeCalendar(is_site = false) {
      let self = this;
      const date_selected = !is_site
        ? self.date_selected
        : self.date_selected_site;
      const time_selected = !is_site
        ? self.time_selected
        : self.time_selected_site;
      let date = new Date(date_selected);
      if (time_selected) {
        let times;
        if (is_site) {
          times = time_selected.split(":");
        } else {
          times = time_selected.local.split(":");
        }
        date.setHours(times[0]);
        date.setMinutes(times[1]);
      }

      for (var i = 0; i < self.online_consulations.length; i++) {
        if (self.online_consulations[i].id == self.item_selected.id) {
          self.online_consulations[i].date = date.getTime() / 1000;
          self.item_selected = self.online_consulations[i];
        }
      }
      for (var j = 0; j < self.site_visits.length; j++) {
        if (self.site_visits[j].id == self.item_selected.id) {
          self.site_visits[j].date = date.getTime() / 1000;
          self.item_selected = self.site_visits[j];
        }
      }
    },
  },
};
</script>

<style scoped>
.available--wrapper {
  background-color: #020644;
  padding: 15px;
}

.available--item {
  display: inline-block;
  width: 138px;
  height: 75px;
  background-color: #fff;
  vertical-align: middle;
  text-align: center;
  margin: 10px;
}

.available--edit {
  padding: 15px;
  background-color: #fff;
  border: 1px solid #cbcbcb;
}

.consultation-date {
  color: #020644;
  font-size: 1rem;
  margin-top: 5px;
}

.available--item .fa-plus {
  font-size: 20px;
}

.add-icon {
  line-height: 75px;
  cursor: pointer;
}

.add-icon > i {
  color: #020644;
}

.step-title {
  color: #eb6271;
}

.collapse-icon-div {
  line-height: 95px;
  vertical-align: middle;
}

.fa-chevron-down {
  color: white;
  font-size: 40px;
}
</style>
