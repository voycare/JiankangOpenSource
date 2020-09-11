import Vue from 'vue';
import moment from "moment";

Vue.filter('convertTimeSecondToDateTime', function (value) {
  return moment(value * 1000, 'x').format("YYYY-MM-DD H:mm:ss")

});
Vue.filter('convertTimeSecondToDate', function (value) {
  return moment(value * 1000, 'x').format("YYYY-MM-DD")
});
Vue.filter('formatMoney', (value) => {
  return '$' + value
})
Vue.filter('convertDateToTime', function (value) {
  return moment(value * 1000, 'x').format("hh:mm")
})
Vue.filter('convertDateToTime24h',function(value){
  return moment(value * 1000, 'x').format("HH:mm")
})
Vue.filter('convertTimeHHmmZ',function(value){
  return moment(value * 1000, 'x').format("HH:mm") + ' GMT+8'
})
Vue.filter('genderName',function(value){
  switch (value) {
    case  0: {
      return "Nothing";
    }
    case  1: {
      return "Male";
    }
    case  2: {
      return "Female";
    }
    case  3: {
      return "Other";
    }
    default:
      return value
  }
})

Vue.filter('convertAppointmentID', function (value) {
  if (value < 10) {
    return 'APP000' + value;
  }
  if (value < 100) {
    return 'APP00' + value;
  }
  if (value < 1000) {
    return 'APP0' + value;
  }
  return 'APP' + value;
});

Vue.filter('convertInvoiceID', function (value) {
  if (value < 10) {
    return '#INV-000' + value;
  }
  if (value < 100) {
    return '#INV-00' + value;
  }
  if (value < 1000) {
    return '#INV-0' + value;
  }
  return '#INV-' + value;
});

Vue.filter('convertHeraID', function (value) {
  if (value < 10) {
    return '#HERA-000' + value;
  }
  if (value < 100) {
    return '#HERA-00' + value;
  }
  if (value < 1000) {
    return '#HERA-0' + value;
  }
  return '#HERA-' + value;
});

Vue.filter('convertID', function (value) {
  if (value < 10) {
    return 'H000' + value;
  }
  if (value < 100) {
    return 'H00' + value;
  }
  if (value < 1000) {
    return 'H0' + value;
  }
  return 'H' + value;
});

Vue.filter('convertModeAppointment', function (value) {
  if (value === 1) {
    return 'Written';
  }
  if (value === 2) {
    return 'Video';
  }
  if (value === 3) {
    return 'SO';
  }
  if (value === 4) {
    return 'Site visit';
  }

})
Vue.filter('convertTime', function (value) {
  let hour = Math.floor(value / 60);
  let minute = value % 60;
  return hour + ':' + minute

})

Vue.filter('phoneNumber', function (value) {
  if (value) {
    return value.replace(/(\d{3})(\d{4})(\d{4})/, '$1.$2.$3');
  }
});
