import BaseRequest from "../BaseRequest";

export default class CommonRequest extends BaseRequest {
  getCountries() {
    return this.get('list-country');
  }

  getAppointmentMetas() {
    return this.get('appointment/metas')
  }

  getSettingNotification() {
    return this.get('auth/setting-notification')
  }

  updateSettingNotifications(params) {
    return this.post('auth/setting-notification', params)
  }

  getSettings() {
    return this.get('settings')
  }

  getSettingBasic() {
    return this.get('auth/settings/basic')
  }

  updateSettingBasic(params) {
    return this.post('settings/basic', params)
  }
}
