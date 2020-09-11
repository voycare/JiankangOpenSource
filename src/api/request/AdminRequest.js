import BaseRequest from "../BaseRequest";

export default class AdminRequest extends BaseRequest {

  getAppointments(params) {
    return this.get('admin/appointments', params)
  }

  getAppointmentDetail(id) {
    return this.get('admin/appointments/' + id)
  }

  postAppointmentNotify(id) {
    return this.post('admin/appointments/' + id + '/notify')
  }

  getAppointmentsCR(params) {
    return this.get('admin/appointments-cr', params)
  }

  getAppointmentsTop(params) {
    return this.get('admin/clinics-top', params)
  }

  getAppointmentsCRDetail(id) {
    return this.get('admin/appointments-cr/' + id)
  }

  postAppointmentsCRDetail(id, params) {
    return this.get('admin/appointments-cr/' + id, params)
  }

  postAppointmentsCRDetailRefund(id, params) {
    return this.post('admin/appointments-cr/' + id + '/refund', params)
  }

  postAppointmentNotifyAll(params) {
    return this.post('admin/appointment/notify-all', params)
  }

  postAppointmentNote(id, params) {
    return this.post('admin/appointments/' + id + '/note', params)
  }

  postAppointmentNoteAdmin(id, params) {
    return this.post('admin/appointments/' + id + '/note_admin', params)
  }

  getAppointmentDocuments(id) {
    return this.get('admin/appointments/' + id + '/documents')
  }

  postAppointmentStatus(id, params) {
    return this.post('admin/appointments/' + parseInt(id) + '/status', params)
  }

  postAppointmentCancellation(id, params) {
    return this.post('admin/appointments/' + parseInt(id) + '/cancel', params)
  }

  postAppointmentUploadDocument(id, params) {
    return this.post('admin/appointments/' + id + '/upload-document', params, {
      'Content-Type': 'multipart/form-data'
    })
  }

  postAppointmentRemoveDocument(id) {
    return this.post('admin/appointment-documents/' + id + '/remove')
  }

  postAppointmentInterpreter(id, params) {
    return this.post('admin/appointments/' + id + '/interpreter', params)
  }

  getAppointmentTotal(params) {
    return this.get('admin/appointment-totals')
  }

  getAppointmentInterpreters(id) {
    return this.get('admin/interpreters')
  }

  getClinicApplicants(params) {
    return this.get('admin/clinic-applicants', params)
  }

  getClinicApproved(params) {
    return this.get('admin/clinic-approved', params)
  }

  getDoctors(params) {
    return this.get('admin/doctors', params)
  }

  getClinicDoctors(id) {
    return this.get('admin/clinics/' + id + '/doctors')
  }

  postClinicDoctors(id, params) {
    return this.post('admin/clinics/' + id + '/doctors', params)
  }

  postClinicDoctorRemove(id, params) {
    return this.post('admin/clinics/' + id + '/doctor-remove', params)
  }

  postDoctorRemove(id, params) {
    return this.post('admin/doctors/' + id + '/remove', params)
  }

  getClinic(id) {
    return this.get('admin/clinics/' + id)
  }

  postClinicUpdate(id, params) {
    return this.post('admin/clinics/' + id, params)
  }

  postClinicLanguageUpdate(id, params) {
    return this.post('admin/clinic-languages/' + id, params)
  }

  postClinicLanguageRemove(id) {
    return this.post('admin/clinic-languages/' + id + '/remove')
  }

  getClinicServices(id) {
    return this.get('admin/clinics/' + id + '/services')
  }

  postClinicServices(id, params) {
    return this.post('admin/clinics/' + id + '/services', params)
  }

  getClinicAvailables(id) {
    return this.get('admin/clinics/' + id + '/availables')
  }

  postClinicAvailableAdd(id, params) {
    return this.post('admin/clinics/' + id + '/availables', params)
  }

  postClinicAvailableRemove(id, params) {
    return this.post('admin/clinics/' + id + '/availables-remove', params)
  }

  getClinicPhotos(id) {
    return this.get('admin/clinics/' + id + '/photos')
  }

  postClinicPhotosUpload(id, params) {
    return this.post('admin/clinics/' + id + '/photos', params, {
      'Content-Type': 'multipart/form-data'
    })
  }

  postClinicPhotoRemove(id, body) {
    return this.post('admin/clinics/' + id + '/photos-remove', body)
  }

  getClients(params) {
    return this.get('admin/clients', params)
  }

  getClientDetail(id) {
    return this.get('admin/clients/' + id)
  }

  postClientUpdate(id, params) {
    return this.post('admin/clients/' + id, params)
  }

  postClientRemove(id) {
    return this.post('admin/clients/' + id + '/remove')
  }

  getTranslators(params) {
    return this.get('admin/translators', params)
  }

  getTranslator(id) {
    return this.get('admin/translators/' + id)
  }

  getSubscribers(params) {
    return this.get('admin/subscribers', params)
  }

  getTranslatorLanguages(params) {
    return this.get('admin/translator-languages', params);
  }

  postTranslatorCreate(params) {
    return this.post('admin/translators', params)
  }

  postTranslatorRemove(id) {
    return this.post('admin/translators/' + id + '/remove')
  }

  // postRemoveClinicService(id) {
  //   return this.post('admin/clinics/' + id + '/service-remove')
  // }

  postClinicApprove(id) {
    return this.post('admin/' + id + '/approve')
  }

  postClinicDecline(id) {
    return this.post('admin/' + id + '/decline')
  }

  postClinicDelete(id) {
    return this.post('admin/clinic' + id + '/delete')
  }

  getMessages(params) {
    return this.get('admin/messages', params)
  }

  postSaveMessage(params) {
    return this.post('admin/messages', params)
  }

  postMessagesDeletes({ids}) {
    return this.post('admin/messages-deletes', {ids})
  }

  postMessagesDeleteAll() {
    return this.post('admin/messages-delete-all');
  }

  getReviews(params) {
    return this.get('admin/reviews', params)
  }

  getReviewDetail(id) {
    return this.get('admin/reviews/' + id)
  }

  postReviewApprove(id) {
    return this.post('admin/reviews/' + id + '/approve')
  }

  postReviewDecline(id) {
    return this.post('admin/reviews/' + id + '/decline')
  }

  getNews(params) {
    return this.get('admin/news', params)
  }

  getNewsDetail(id) {
    return this.get('admin/news/' + id)
  }

  postNewsStore(params) {
    return this.post('admin/news', params)
  }

  postNewsDelete(id) {
    return this.post('admin/news/' + id + '/delete')
  }

  getSettings() {
    return this.get('admin/settings')
  }

  getPayments(params) {
    return this.get('admin/payments', params)
  }

  postPayments(params) {
    return this.post('admin/payments', params)
  }

  getPaymentDetail(id) {
    return this.get('admin/payments/' + id)
  }

  postRemovePaymentItem(id, params) {
    return this.post('admin/payments/' + id + '/remove-item', params)
  }

  getStatements(params) {
    return this.get('admin/statements', params)
  }

  postStatements(params) {
    return this.post('admin/statements', params)
  }

  getStatementDetail(id) {
    return this.get('admin/statements/' + id)
  }

  postRemoveStatementItem(id, params) {
    return this.post('admin/statements/' + id + '/remove-item', params)
  }

  getDashboardTotals() {
    return this.get('admin/dashboard/totals')
  }

  getFeedbacks(params) {
    return this.get('admin/feedbacks', params)
  }

  postNewsCategoriesCreate(params){
    return this.post('admin/news-categories', params)
  }

  getNewsCategories(){
    return this.get('admin/news-categories')
  }

}
