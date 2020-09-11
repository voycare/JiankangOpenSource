<template>
  <div v-if="appt">
    <div class="title-15 mb-3">Rescheduled time:</div>
    <div class="row">
      <div class="col-sm-3"></div>
      <div class="col-sm-6">
        <div
          :key="schedule_item.id"
          class="mb-3"
          v-for="(schedule_item, idx) in appt.schedule_times"
        >
          <div class="row" v-if="schedule_item.accept == had_accept">
            <div class="col-sm-4">
              <input
                v-if="!hideRadio"
                :id="'rd__' + schedule_item.id"
                :value="schedule_item.id"
                v-model="schedule_selected"
                class="mr-2"
                type="radio"
                @click="onChangeSchedule(schedule_item.id)"
              />
              <label :for="'rd__' + schedule_item.id" class="title-15">Option {{ idx + 1
                }}</label>
            </div>
            <div class="col-sm-4">{{ schedule_item.reschedule_time | convertTimeSecondToDate }}
            </div>
            <div class="col-sm-4">{{ schedule_item.reschedule_time | convertTimeHHmmZ }}</div>
          </div>
        </div>
      </div>
      <div class="col-sm-3"></div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      appt: null,
      hideRadio: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        schedule_selected: false,
        had_accept: 0
      }
    },
    mounted(){
      let self = this

      if(self.appt && self.appt.schedule_times.length) {
        self.statement.schedule_times.forEach((item) => {
          if(item.accept) {
            self.had_accept = 1
          }
        })
      }
    },
    methods: {
      onChangeSchedule(id) {
        this.schedule_selected = id

        this.$emit('onChangeSchedule', this.schedule_selected)
      }
    }
  }
</script>
