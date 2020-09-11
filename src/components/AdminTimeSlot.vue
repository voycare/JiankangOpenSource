<template>
  <div>
    <div @click="onSelectAvailable" class="time-slot-item_header pointer">
      <div class="time-slot-date">
        {{ timeSlot.date | convertTimeSecondToDate }}
      </div>
      <b-dropdown
        id="moreButton"
        no-caret
        toggle-class="text-decoration-none action-icon dropdown-toggle"
        toggle-tag="a"
        variant="link"
      >
        <template v-slot:button-content>
          <i class="fa fa-ellipsis-v"></i>
        </template>
        <b-dropdown-item @click="onDelete" href="#"
          ><i class="fa fa-trash" /> Delete
        </b-dropdown-item>
      </b-dropdown>
    </div>
    <hr />
    <div class="time-slot-item_footer">
      <b-dropdown id="time-dropdown" offset="-1" class="" variant="link" menu-class="dropdown-menu-custom"
        toggle-class="text-decoration-none dropdown-toggle"
        >
        <template v-slot:button-content>
          {{ timeSlot.date | convertDateToTime24h }}
        </template>
        <b-dropdown-item v-for="time in timeOptions" :key="time" @click="chooseOption(time)">
          {{time}}
        </b-dropdown-item>
      </b-dropdown>
    </div>
  </div>
</template>
<script>
import { getTimeRange } from '../utils/utils'
export default {
  props: {
    timeSlotProp: {
      required: true,
      type: Object,
    },
    isSite: {
      required: false,
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      timeOptions: [],
      timeSlot: null
    }
  },
  created() {
    this.timeOptions = getTimeRange().map(timeObj => {
      return `${timeObj.hour}:${timeObj.min}`
    })
  },
  watch: {
    timeSlotProp:{
      deep: true,
      immediate: true,
      handler(){
        this.timeSlot = {...this.timeSlotProp}
      }
    }
  },
  methods: {
    
    onDelete(){
      this.$emit('delete', this.timeSlot.id)
    },
    // this.timeSlot.date in seconds number
    chooseOption(time){
      console.log(time);
      let timeArr = time.split(':')
      let hour
      let minute
      if(timeArr && timeArr.length >=2){
         hour = timeArr[0]
         minute = timeArr[1]
      }
      let timeinDate = new Date(this.timeSlot.date * 1000)
      timeinDate.setHours(hour, minute, 0, 0)
      this.timeSlot.date = Date.parse(timeinDate) / 1000
      this.onEditAvailable()
    },
    onEditAvailable() {
      this.$emit("edit", {item: this.timeSlot, is_site: this.isSite} );
    },
    onSelectAvailable(){
      this.$emit('select', {item: this.timeSlot, is_site: this.isSite})
    }
  },
};
</script>
<style>
.time-slot-item_header {
  position: relative;
  height: 1.5rem;
}
.time-slot-date {
  color: #020644;
  font-size: 1rem;
  margin-top: 5px;
}
#moreButton {
  position: absolute;
  top: -5px;
  right: 5px;
}
#moreButton .btn {
  padding: 0px 0px;
}
hr {
  border-top: 0.2px solid #979797;
  margin: 0.5rem 0;
}
#time-dropdown>button {
  width: 100%;
  padding: 0 !important;
  line-height: 1.5;
}
.pointer{
  cursor: pointer;
}
.dropdown-menu-custom{
  max-height: 300px;
    overflow: auto;
    width: 140px;
    min-width: 5rem!important;
}

</style>
