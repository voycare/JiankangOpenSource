<script>
export default {
  methods: {
    getTimeSelectedObject(date) {
      let localFirst = date.getHours().toString().padStart(2, "0");
      let localSec = date.getMinutes().toString().padStart(2, "0");
      let local = `${localFirst}:${localSec}`;
      let chinaTime = this.convertTimeToChinaPlus8(date);
      let chinaFirst = chinaTime.getHours().toString().padStart(2, "0");
      let chinaSec = chinaTime.getMinutes().toString().padStart(2, "0");
      let china = `${chinaFirst}:${chinaSec}`;
      return { local, china };
    },
    convertTimeToChinaPlus8(date) {
      let localTime = date.getTime();
      let localOffset = date.getTimezoneOffset() * 60000;
      let utcTime = localTime + localOffset;
      let chinaPLus8Time = utcTime + 3600000 * 8;
      return new Date(chinaPLus8Time);
    },
  },
};
</script>