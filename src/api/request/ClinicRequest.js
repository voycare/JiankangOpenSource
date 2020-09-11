import BaseRequest from "../BaseRequest";

export default class ClinicRequest extends BaseRequest {

  getAppointments(params) {
    return this.get('clinic/appointments', params)
  }

  getAppointmentDetail(id) {
    return this.get('clinic/appointments/' + id)
  }

  postAppointmentStatus(id, params) {
    return this.post('clinic/appointments/' + id + '/status', params)
  }

  postAppointmentReschedule(id, params) {
    return this.post('clinic/appointments/' + id + '/reschedule', params);
  }

  getAppointmentTotal(params) {
    return this.get('clinic/appointment-totals')
  }

  getStatements(params) {
    return this.get('clinic/statements', params)
  }

  getStatementDetail(id) {
    return this.get('clinic/statements/' + id)
  }

  getReviews(params) {
    return this.get('clinic/reviews', params)
  }

  getReviewDetail(id) {
    return this.get('clinic/reviews/' + id)
  }

  getProfile() {
    return this.get('clinic/profile')
  }

  postUpdateProfile(params) {
    return this.post('clinic/profile', params)
  }

  postProfileLanguageUpdate(params) {
    return this.post('clinic/profile-languages', params)
  }

  postProfileLanguageRemove(id) {
    return this.post('clinic/profile-languages/' + id + '/remove')
  }

  getDoctors() {
    return this.get('clinic/profile-doctors')
  }

  postDoctors(params) {
    return this.post('clinic/profile-doctors', params)
  }

  postDoctorRemove(id, params) {
    return this.post('clinic/profile-doctors/' + id + '/remove', params)
  }

  getServices() {
    return this.get('clinic/profile-services')
  }

  postServices(params) {
    return this.post('clinic/profile-services', params)
  }

  getAvailables() {
    return this.get('clinic/profile-availables')
  }

  postAvailableAdd(params) {
    return this.post('clinic/profile-availables', params)
  }

  postAvailableRemove(params) {
    return this.post('clinic/profile-availables/remove', params)
  }

  getClinicPhotos() {
    return this.get('clinic/profile-photos')
  }

  postClinicPhotosUpload(params) {
    return this.post('clinic/profile-photos', params, {
      'Content-Type': 'multipart/form-data'
    })
  }

  postClinicPhotoRemove(body) {
    return this.post('clinic/profile-photos/remove', body)
  }

  getDashboardTotals() {
    return this.get('clinic/dashboard/totals')
  }

  getMessages(params) {
    return this.get('clinic/messages', params)
  }

  postMessageMarkRead() {
    return this.post('clinic/messages-read')
  }

  postMessageMarkUnread() {
    return this.post('clinic/messages-unread')
  }

}
