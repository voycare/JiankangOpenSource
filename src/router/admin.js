import AppointmentListing from "../views/admin/AppointmentListing";
import AdminAppointment24H from '../views/admin/Appointment24H'
import AdminAppointment7D from '../views/admin/Appointment7D'
import AdminAppointmentCR from '../views/admin/AppointmentCR'
import AppointmentDetail from '../views/admin/AppointmentDetail'
import AdminLogin from "../views/AdminLogin";
import AdminDashboard from "../views/admin/Dashboard";
import AdminDoctor from "../views/AdminDoctor";
import AdminDoctorAdd from "../views/AdminDoctorAdd";
import AdminClinic from "../views/AdminClinic";
import AdminClient from "../views/AdminClient";
import AdminTranslator from "../views/AdminTranslator";
import ClientResetPassword from "../views/ClientResetPassword";
import EmptyLayout from "../layouts/EmptyLayout";
import AdminClinicApproved from '../views/admin/ClinicApproved'
import AdminClinicApplicants from '../views/admin/ClinicApplicants'
import AdminClinicApplicantSummary from '../views/admin/ClinicApplicantSummary'
import ClientDetail from '../views/admin/ClientDetail'
import ClinicEdit from '../views/admin/ClinicEdit'
import ClinicServicesEdit from '../views/admin/ClinicServicesEdit'
import ClinicServicesDetail from "../views/admin/ClinicServicesDetail"
import ClinicAvailableDetail from '../views/admin/ClinicAvailableDetail'
import ClinicGallery from '../views/admin/ClinicGallery'
import DoctorListing from "../views/admin/DoctorListing"
import TranslatorListing from "../views/admin/TranslatorListing"
import TranslatorEdit from "../views/admin/TranslatorEdit"
import TranslatorAdd from "../views/admin/TranslatorAdd"
import DoctorsEdit from "../views/admin/DoctorsEdit"
import ClientListing from "../views/admin/ClientListing"
import ClinicDetail from "../views/admin/ClinicDetail"
import ClientEdit from "../views/admin/ClientEdit"
import MessageCompose from "../views/admin/MessageCompose"
import MessageTypeListing from "../views/admin/MessageTypeListing"
import ReviewListing from "../views/admin/ReviewListing"
import ReviewDetail from "../views/admin/ReviewDetail"
import NewsListing from "../views/admin/NewsListing"
import NewsEdit from "../views/admin/NewsEdit"
import NewsAdd from "../views/admin/NewsAdd"
import SettingBasic from "../views/SettingBasic"
import AdminSettingNotification from "../views/admin/AdminSettingNotification"
import SettingPassword from "../views/SettingPassword"
import AdminClientPayment from "../views/admin/AdminClientPayment"
import AdminClientPaymentEdit from "../views/admin/AdminClientPaymentEdit"
import AdminStatements from "../views/admin/AdminStatements"
import AdminStatementEdit from "../views/admin/AdminStatementEdit"
import AppointmentCRDetail from "../views/admin/AppointmentCRDetail"
import SubsciberListing from "../views/admin/SubsciberListing"
import FeedbackListing from "../views/admin/FeedbackListing"

const routes_admin = [
  {
    path: '/login',
    meta: {layout: "login"},
    name: 'AdminLogin',
    component: AdminLogin
  },
  {
    path: '/forget-password',
    meta: {layout: "login"},
    name: 'ClientResetPassword',
    component: ClientResetPassword
  },
  {
    path: '/',
    meta: {layout: "admin"},
    name: 'AdminDashBoard',
    component: AdminDashboard
  },
  {
    path: '/admin/doctor',
    meta: {layout: "admin"},
    name: 'AdminDoctor',
    component: AdminDoctor
  },
  {
    path: '/admin/doctor/add',
    meta: {layout: "admin"},
    name: 'AdminDoctorAdd',
    component: AdminDoctorAdd
  },
  {
    path: '/appointments',
    meta: {layout: "admin"},
    name: 'AppointmentListing',
    component: AppointmentListing
  },
  {
    path: '/appointments/:id',
    meta: {layout: "admin"},
    name: 'AppointmentDetail',
    component: AppointmentDetail
  },
  {
    path: '/appointment-24h',
    meta: {layout: "admin"},
    name: 'AdminAppointment24H',
    component: AdminAppointment24H
  },
  {
    path: '/appointment-7d',
    meta: {layout: "admin"},
    name: 'AdminAppointment7D',
    component: AdminAppointment7D
  },
  {
    path: '/appointment-cr',
    meta: {layout: "admin"},
    name: 'AdminAppointmentCR',
    component: AdminAppointmentCR
  },
  {
    path: '/appointment-cr/:id',
    meta: {layout: "admin"},
    name: 'AppointmentCRDetail',
    component: AppointmentCRDetail
  },
  {
    path: '/clinic-approved',
    meta: {layout: 'admin'},
    name: 'AdminClinicApproved',
    component: AdminClinicApproved
  },
  {
    path: '/clinics/:id',
    meta: {layout: 'admin'},
    name: 'ClinicDetail',
    component: ClinicDetail
  },
  {
    path: '/clinics/:id/services',
    meta: {layout: 'admin'},
    name: 'ClinicServicesDetail',
    component: ClinicServicesDetail
  },
  {
    path: '/clinics/:id/edit-services',
    meta: {layout: 'admin'},
    name: 'ClinicServicesEdit',
    component: ClinicServicesEdit
  },
  {
    path: '/clinics/:id/edit',
    meta: {layout: 'admin'},
    name: 'ClinicEdit',
    component: ClinicEdit
  },
  {
    path: '/clinics/:id/available',
    meta: {layout: 'admin'},
    name: 'ClinicAvailableDetail',
    component: ClinicAvailableDetail
  },
  {
    path: '/clinics/:id/photos',
    meta: {layout: 'admin'},
    name: 'ClinicGallery',
    component: ClinicGallery
  },
  {
    path: '/clinics/:id/doctors',
    meta: {layout: 'admin'},
    name: 'DoctorsEdit',
    component: DoctorsEdit
  },
  {
    path: '/clinics/:id/applicant',
    meta: {layout: 'admin'},
    name: 'AdminClinicApplicantSummary',
    component: AdminClinicApplicantSummary
  },
  {
    path: '/clinic-applicants',
    meta: {layout: 'admin'},
    name: 'AdminClinicApplicants',
    component: AdminClinicApplicants
  },
  {
    path: '/clients',
    meta: {layout: 'admin'},
    name: 'ClientListing',
    component: ClientListing
  },
  {
    path: '/clients/:id',
    meta: {layout: 'admin'},
    name: 'ClientDetail',
    component: ClientDetail
  },
  {
    path: '/clients/:id/edit',
    meta: {layout: 'admin'},
    name: 'ClientEdit',
    component: ClientEdit
  },
  {
    path: '/doctors',
    meta: {layout: 'admin'},
    name: 'DoctorListing',
    component: DoctorListing
  },
  {
    path: '/translators',
    meta: {layout: 'admin'},
    name: 'TranslatorListing',
    component: TranslatorListing
  },
  {
    path: '/translator-add',
    meta: {layout: 'admin'},
    name: 'TranslatorAdd',
    component: TranslatorAdd
  },
  {
    path: '/subscribers',
    meta: {layout: 'admin'},
    name: 'SubscriberListing',
    component: SubsciberListing
  },
  {
    path: '/translators/:id',
    meta: {layout: 'admin'},
    name: 'TranslatorEdit',
    component: TranslatorEdit
  },
  {
    path: '/messages-compose',
    meta: {layout: 'admin'},
    name: 'MessageCompose',
    component: MessageCompose
  },
  {
    path: '/message/:type',
    meta: {layout: 'admin'},
    name: 'MessageSentListing',
    component: MessageTypeListing
  },
  {
    path: '/reviews',
    meta: {layout: 'admin'},
    name: 'ReviewListing',
    component: ReviewListing
  },
  {
    path: '/reviews/:id',
    meta: {layout: 'admin'},
    name: 'ReviewDetail',
    component: ReviewDetail
  },
  {
    path: '/news',
    meta: {layout: 'admin'},
    name: 'NewsListing',
    component: NewsListing
  },
  {
    path: '/news-add',
    meta: {layout: 'admin'},
    name: 'NewsAdd',
    component: NewsAdd
  },
  {
    path: '/news/:id/edit',
    meta: {layout: 'admin'},
    name: 'NewsEdit',
    component: NewsEdit
  },
  {
    path: '/payments',
    meta: {layout: 'admin'},
    name: 'AdminClientPayment',
    component: AdminClientPayment
  },
  {
    path: '/payments-add',
    meta: {layout: 'admin'},
    name: 'AdminClientPaymentEdit',
    component: AdminClientPaymentEdit
  },
  {
    path: '/payments/:id',
    meta: {layout: 'admin'},
    name: 'AdminClientPaymentEdit',
    component: AdminClientPaymentEdit
  },
  {
    path: '/statements',
    meta: {layout: 'admin'},
    name: 'AdminStatements',
    component: AdminStatements
  },
  {
    path: '/statements-add',
    meta: {layout: 'admin'},
    name: 'AdminStatementEdit',
    component: AdminStatementEdit
  },
  {
    path: '/statements/:id',
    meta: {layout: 'admin'},
    name: 'AdminStatementEdit',
    component: AdminStatementEdit
  },
  {
    path: '/admin/clinic',
    meta: {layout: "admin"},
    name: 'AdminClinic',
    component: AdminClinic
  },
  {
    path: '/admin/client',
    meta: {layout: "admin"},
    name: 'AdminClient',
    component: AdminClient
  },
  {
    path: '/admin/translator',
    meta: {layout: "admin"},
    name: 'AdminTranslator',
    component: AdminTranslator
  },
  {
    path: '/settings/basic',
    meta: {layout: 'admin'},
    name: 'SettingBasic',
    component: SettingBasic
  },
  {
    path: '/settings/notification',
    name: 'AdminSettingNotification',
    meta: {layout: "admin"},
    component: AdminSettingNotification
  },
  {
    path: '/settings/password',
    name: 'SettingPassword',
    meta: {layout: "admin"},
    component: SettingPassword
  },
  {
    path: '/feedbacks',
    name: 'FeedbackListing',
    meta: {layout: "admin"},
    component: FeedbackListing
  },
  {
    path: '*',
    name: 'Empty',
    component: EmptyLayout
  },
]

export default routes_admin
