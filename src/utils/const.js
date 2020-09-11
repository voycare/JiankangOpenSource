export default {
  STATUS: {
    intToString(value) {
      switch (value) {
        case  0: {
          return "Pending";
        }
        case  1: {
          return "Confirmed";
        }
        case  2: {
          return "Cancelled";
        }
        case  3: {
          return "Completed";
        }
        case  4: {
          return "Rescheduled";
        }
        case  5: {
          return "Refunded";
        }
        default: {
          return "Unknown";
        }
      }
    },
    paymentStatusString(value) {
      switch (value) {
        case  1: {
          return "Draft";
        }
        case  2: {
          return "Sent";
        }
        default: {
          return "Unknown";
        }
      }
    },
    verifyToString(value) {
      switch (value) {
        case  0: {
          return "Pending";
        }
        case  1: {
          return "Confirmed";
        }
        case  2: {
          return "Declined";
        }
        default: {
          return "Unknown";
        }
      }
    },
    isPending(value) {
      return value === 0
    },
    isConfirmed(value) {
      return value === 1
    },
    isCancelled(value) {
      return value === 2
    },
    isRescheduled(value) {
      return value === 4
    },
    isRefunded(value) {
      return value === 5
    },
    stringToInt(value) {
      switch (value.toLowerCase()) {
        case "pending": {
          return 0
        }
        case "confirmed": {
          return 1
        }
        case "cancelled": {
          return 2
        }
        case "completed": {
          return 3
        }
        case 'rescheduled': {
          return 4;
        }
        case 'refunded': {
          return 5;
        }
        default: {
          return -1
        }
      }
    },
    intToExtraString(value) {
      switch (value) {
        case 1: {
          return 'fa fa-check'
        }
        case 0:
        case 2:
        case 4: {
          return 'fa fa-clock-o'
        }
        case 3: {
          return 'fa fa-minus'
        }
      }
    },
    intToExtraClass(value) {
      switch (value) {
        case 1: {
          return 'text-success'
        }
        case 0:
        case 2:
        case 4: {
          return 'text-danger';
        }
        case 3: {
          return ''
        }
      }
    },
    intToVerifyClass(value, prefix = 'alert') {
      switch (value) {
        case  0: {
          return prefix + "-warning";
        }
        case  1: {
          return prefix + "-success";
        }
        case  2: {
          return prefix + "-dark";
        }
        default: {
          return "";
        }
      }
    },
    intToPaymentStatus(value, prefix = 'alert') {
      switch (value) {
        case  1: {
          return prefix + "-warning";
        }
        case  2: {
          return prefix + "-success";
        }
        default: {
          return "";
        }
      }
    },
    intToStatusClass(value, prefix = 'alert') {
      switch (value) {
        case  0: {
          return prefix + "-warning";
        }
        case  1: {
          return prefix + "-success";
        }
        case  2: {
          return prefix + "-danger-bold";
        }
        case  3: {
          return prefix + "-danger";
        }
        case  4: {
          return prefix + "-primary";
        }
        case  5: {
          return prefix + "-danger";
        }
        default: {
          return "";
        }
      }
    }
  },
  APPOINTMENT: {
    MODE: {
      intToString(value) {
        switch (value) {
          case 1:
            return "audio/video";
          case 2:
            return "site visit";
          case 3:
            return "so";
          default:
            return "unknown"
        }
      }
    }
  },
  PAGE_LIMIT_OPTIONS: [
    {value: 10, text: 10},
    {value: 20, text: 20},
    {value: 50, text: 50}
  ]
}
