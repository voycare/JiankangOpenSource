import ClientAppointmentAdd from "../views/ClientAppointmentAdd";
import ClientResetPassword from "../views/ClientResetPassword";
import EmptyLayout from "../layouts/EmptyLayout";
import Signed from "../views/clients/Signed";
import ClinicLogin from "../views/clinics/ClinicLogin"
import AppoinmentListing from "../views/clinics/AppoinmentListing"
import AppointmentDetail from "../views/clinics/AppointmentDetail"
import AppointmentReschedule from "../views/clinics/AppointmentReschedule"
import ReviewListing from "../views/clinics/ReviewListing"
import ReviewDetail from "../views/clinics/ReviewDetail"
import StatementListing from "../views/clinics/StatementListing"
import StatementDetail from "../views/clinics/StatementDetail"
import SettingNotification from "../views/clinics/SettingNotification"
import SettingPassword from "../views/SettingPassword"
import SettingBasic from "../views/SettingBasic"
import ProfileDetail from "../views/clinics/ProfileDetail"
import ProfileEdit from "../views/clinics/ProfileEdit"
import ProfileDoctorListing from "../views/clinics/ProfileDoctorListing"
import ProfileDoctorEdit from "../views/clinics/ProfileDoctorEdit"
import ProfileServiceListing from "../views/clinics/ProfileServiceListing"
import ProfileServicesEdit from "../views/clinics/ProfileServicesEdit"
import ProfileAvailables from "../views/clinics/ProfileAvailables"
import ProfileGallery from "../views/clinics/ProfileGallery"
import Dashboard from "../views/clinics/Dashboard"
import MessageListing from "../views/clinics/MessageListing"

const routes_clinic = [
  {
    path: '/',
    meta: {layout: "clinic"},
    name: 'AdminDashBoard',
    component: Dashboard
  },
  {
    path: '/login',
    meta: {layout: "login"},
    name: 'UserLogin',
    component: ClinicLogin
  },
  {
    path: '/signed',
    name: 'Signed',
    component: Signed
  },
  {
    path: '/forget-password',
    meta: {layout: "login"},
    name: 'ClientResetPassword',
    component: ClientResetPassword
  },
  {
    path: '/appointments',
    meta: {layout: "clinic"},
    name: 'AppoinmentListing',
    component: AppoinmentListing
  },
  {
    path: '/appointments/:id',
    meta: {layout: "clinic"},
    name: 'AppointmentDetail',
    component: AppointmentDetail
  },
  {
    path: '/appointments/:id/reschedule',
    meta: {layout: "clinic"},
    name: 'AppointmentReschedule',
    component: AppointmentReschedule
  },
  {
    path: '/appointment-add',
    meta: {layout: "clinic"},
    name: 'ClientAppointmentAdd',
    component: ClientAppointmentAdd
  },
  {
    path: '/reviews',
    meta: {layout: 'clinic'},
    name: 'ReviewListing',
    component: ReviewListing
  },
  {
    path: '/reviews/:id',
    meta: {layout: 'clinic'},
    name: 'ReviewDetail',
    component: ReviewDetail
  },
  {
    path: '/statements',
    meta: {layout: 'clinic'},
    name: 'StatementListing',
    component: StatementListing
  },
  {
    path: '/statements/:id',
    meta: {layout: 'clinic'},
    name: 'StatementDetail',
    component: StatementDetail
  },
  {
    path: '/settings/notification',
    name: 'SettingNotification',
    meta: {layout: "clinic"},
    component: SettingNotification
  },
  {
    path: '/settings/password',
    name: 'SettingPassword',
    meta: {layout: "clinic"},
    component: SettingPassword
  },
  {
    path: '/settings/basic',
    meta: {layout: 'clinic'},
    name: 'SettingBasic',
    component: SettingBasic
  },
  {
    path: '/profile',
    meta: {layout: 'clinic'},
    name: 'ProfileDetail',
    component: ProfileDetail
  },
  {
    path: '/profile/edit',
    meta: {layout: 'clinic'},
    name: 'ProfileEdit',
    component: ProfileEdit
  },
  {
    path: '/profile-doctors',
    meta: {layout: 'clinic'},
    name: 'ProfileDoctorListing',
    component: ProfileDoctorListing
  },
  {
    path: '/profile-doctors/edit',
    meta: {layout: 'clinic'},
    name: 'ProfileDoctorEdit',
    component: ProfileDoctorEdit
  },
  {
    path: '/profile-services',
    meta: {layout: 'clinic'},
    name: 'ProfileServiceListing',
    component: ProfileServiceListing
  },
  {
    path: '/profile-services/edit',
    meta: {layout: 'clinic'},
    name: 'ProfileServicesEdit',
    component: ProfileServicesEdit
  },
  {
    path: '/profile-availables',
    meta: {layout: 'clinic'},
    name: 'ProfileAvailables',
    component: ProfileAvailables
  },
  {
    path: '/profile-photos',
    meta: {layout: 'clinic'},
    name: 'ProfileGallery',
    component: ProfileGallery
  },
  {
    path: '/messages',
    meta: {layout: 'clinic'},
    name: 'MessageListing',
    component: MessageListing
  },
  {
    path: '*',
    name: 'Empty',
    component: EmptyLayout
  },
]

export default routes_clinic
