module.exports = {
  gg: function () {
    return 3;
  },

  padStart(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  },
  getLocalAdmin() {
    return localStorage.getItem("admin") ? JSON.parse(localStorage.getItem("admin")) : null;
  },
  setLocalAdmin(user) {
    localStorage.setItem("admin", JSON.stringify(user));
  },
  removeLocalAdmin() {
    localStorage.removeItem("admin");
  },
  getLocalUser() {
    return localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
  },
  setLocalUser(user) {
    localStorage.setItem("user", JSON.stringify(user));
  },
  removeLocalUser() {
    localStorage.removeItem("user");
  },
  getLocalClinic() {
    return localStorage.getItem('clinic') ? JSON.parse(localStorage.getItem('clinic')) : null
  },
  setLocalClinic(user) {
    localStorage.setItem('clinic', JSON.stringify(user))
  },
  removeLocalClinic() {
    localStorage.removeItem("clinic");
  },
  getMessageFromCode(code) {
    switch (code) {
      case 204: {
        return " the request was successful but there is no representation to return";
      }
      default : {
        return null;
      }
    }

  },
  getToken() {
    return localStorage.getItem("token");
  },
  randomStr(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  },
  /*  get time ranges: [{hour: 1, min: 30}, {hour: 2, min: 00}]  */
  getTimeRange(){
    let timeRange = []
    for(let i = 0; i<=23; i++){
      let min = '00'
      let hour = (i + '').padStart(2, '0')
      timeRange.push({hour, min})
      min = 30
      timeRange.push({hour, min})
    }
    return timeRange
  },
  // timezone: +8
  getLocalTimeZoneOffsetTo(timezone){
    let date = new Date()
    let localOffsetInHour = date.getTimezoneOffset() / 60
    return localOffsetInHour - (0 - timezone)
  }
}
