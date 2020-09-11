import moment from 'moment';

export default {
  getName: function (obj) {
    return obj.last_name + " " + obj.first_name;
  },
  formatDate: (value, format) => {
    return moment(value, 'yyyy-mm-dd hh:mm:ii').format(format)
  },
  formatHour: (value) => {
    return moment(value, 'yyyy-mm-dd hh:mm:ii').format('hh:mm')
  },
  intToDate: function (value, format) {
    return moment.unix(value).format(format);
  },
  intToAge: function (value) {
    return moment().diff(moment.unix(value), "year");
  },
  intToHour: function (value) {
    return moment(value.toString(), "LT").format("hh:mm A");
  },
}