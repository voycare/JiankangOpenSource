import BaseRequest from "../BaseRequest";

export default class UserRequest extends BaseRequest {

  getAppointments(params) {
    return this.get('user/appointments', params)
  }

  getAppointmentDetail(id) {
    return this.get('user/appointments/' + parseInt(id))
  }

  postAppointmentStatus(id, params) {
    return this.post('user/appointments/' + parseInt(id) + '/status', params)
  }

  postAppointmentCancellation(id, params) {
    return this.post('user/appointments/' + parseInt(id) + '/cancel', params)
  }

  getReview(id) {
    return this.get('user/reviews/' + id)
  }

  getReviews(params) {
    return this.get('user/reviews', params)
  }

  postReview(params) {
    return this.post('user/create-review/', params)
  }

  getMessages(params) {
    return this.get('user/messages', params)
  }

  postMarkReads(params) {
    return this.post('user/messages/reads', params)
  }

  postMarkUnReads(params) {
    return this.post('user/messages/unreads', params)
  }

  postMessageDeletes(params) {
    return this.post('user/messages/deletes', params)
  }

  getPayments(params) {
    return this.get('user/payments', params)
  }

  getPaymentDetail(id) {
    return this.get('user/payments/' + parseInt(id))
  }

  postCheckCancelable(id) {
    return this.post('user/appointments/' + parseInt(id) + 'check_cancel')
  }

  getTopClinics(params) {
    return this.get('user/top-clinics', params)
  }

  getMyFavourites(params) {
    return this.get('user/my-favourites', params)
  }

  editProfile(params) {
    return this.post('user/edit-profile', params)
  }

  getSetting() {
    return this.get('user/setting')
  }

  getSettingLocalization() {
    return this.get('user/setting-localization')
  }

  updateSettingLocalization(params) {
    return this.post('user/setting-localization', params)
  }

  postForgetPassword(params) {
    return this.post('auth/forgot-pass', params)
  }
}
