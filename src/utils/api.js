module.exports = {
  getApi: function (path) {
    return this.BASE + path
  },
  CONST: {
    ROLE: {
      CLIENT: 0,
      CLINIC: 1,
      ADMIN: 2,
    },
    GENDER: {
      MALE: 1,
      FEMALE: 2,
      OTHER: 3,
    }
  },

  BASE: process.env.VUE_APP_BASE_URL,
  AUTH: {
    LOGIN: "api/auth/login",
    REGISTER: "api/auth/register",
    FORGET_PASSWORD: "api/auth/forgot-pass",
  },
  CLIENT: {
    APPOINTMENT: {
      LIST: "api/user/appointments"
    },
    LOGOUT: "api/logout",
  },
  ADMIN: {
    AUTH: {
      LOGIN: "api/auth/admin/login",
      REGISTER: "api/auth/register",
      FORGET_PASSWORD: "api/auth/forgot-pass",
    },
    APPOINTMENT: {
      LIST: "api/admin/appointments"
    },
    DOCTOR: {
      LIST: "api/admin/list-doctor"
    },
    CLINIC: {
      LIST: "api/admin/list-clinic"
    },
    CLIENT: {
      LIST: "api/admin/list-client"
    }
  }
}
